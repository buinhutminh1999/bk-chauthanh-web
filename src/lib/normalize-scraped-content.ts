/**
 * Chuyển nội dung scrape (text thô từ site Joomla cũ) sang markdown dễ đọc:
 * bảng GFM, danh sách Ưu/Nhược điểm, v.v.
 */

function buildMarkdownTable(headers: string[], rows: string[][]): string {
  const escape = (c: string) => c.replace(/\|/g, "\\|");
  const headerLine = `| ${headers.map(escape).join(" | ")} |`;
  const sepLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const bodyLines = rows.map((row) => `| ${row.map(escape).join(" | ")} |`);
  return [headerLine, sepLine, ...bodyLines].join("\n");
}

/** Bảng cống tròn: 01 / D200 / 200 / 300 / 50 / 4000 / 0.20 / 0.500 */
function convertPipeConcreteTable(content: string): string {
  const rowPattern =
    /(\d{2})\n(D\d+)\n(\d+)\n(\d+)\n(\d+)\n(\d+)\n([\d.]+)\n([\d.]+)/g;
  const matches = [...content.matchAll(rowPattern)];
  if (matches.length < 3) return content;

  const firstStart = matches[0].index!;
  const lastMatch = matches[matches.length - 1];
  const lastEnd = lastMatch.index! + lastMatch[0].length;

  const before = content.slice(0, firstStart);
  const markers = [
    "**BẢNG CHỈ TIÊU",
    "PROPERTIES OF REINFORCED",
    "(Bảng thông số",
    "STT\nNo.",
  ];
  let start = firstStart;
  for (const marker of markers) {
    const idx = before.lastIndexOf(marker);
    if (idx !== -1) start = Math.min(start, idx);
  }

  const headers = [
    "STT",
    "Chủng loại",
    "d trong (mm)",
    "D ngoài (mm)",
    "t (mm)",
    "L (mm)",
    "Thể tích (m³)",
    "Trọng lượng (T/đoạn)",
  ];
  const rows = matches.map((m) => m.slice(1) as string[]);
  const table = buildMarkdownTable(headers, rows);

  const replacement = `**Bảng chỉ tiêu kỹ thuật cống tròn**\n\n${table}\n`;
  return content.slice(0, start) + replacement + content.slice(lastEnd);
}

/** Bảng cọc ly tâm tròn dự ứng lực */
function convertPileRoundTable(content: string): string {
  const fullRowPattern =
    /(\d{3})\n(\d+)\n([A-Z])\n(\d+)\n(\d+)\n(\d+)\n([\d,]+)\n([\d,]+)/g;
  const fullMatches = [...content.matchAll(fullRowPattern)];
  if (fullMatches.length < 2) return content;

  const partialPattern = /(?:^|\n)(\d{2,3})\n(\d+)\n(\d+)(?=\n)/g;
  const partialMatches = [...content.matchAll(partialPattern)].filter((m) => {
    const val = Number(m[1]);
    return val >= 10 && val <= 999;
  });

  const headers = [
    "Đường kính (mm)",
    "Chiều dày (mm)",
    "Loại",
    "Mác (MPa)",
    "PC dài hạn (T)",
    "PC ngắn hạn (T)",
    "Moment uốn nứt (kN·m)",
    "Moment phá hủy (kN·m)",
  ];

  const rows: string[][] = fullMatches.map((m) => m.slice(1) as string[]);
  for (const m of partialMatches) {
    const alreadyFull = rows.some(
      (r) => r[4] === m[1] && r[5] === m[2] && r[6] === m[3],
    );
    if (!alreadyFull) {
      rows.push(["", "", "", "", m[1], m[2], m[3], ""]);
    }
  }

  const firstStart = fullMatches[0].index!;
  const lastMatch = fullMatches[fullMatches.length - 1];
  let lastEnd = lastMatch.index! + lastMatch[0].length;

  for (const m of partialMatches) {
    const end = m.index! + m[0].length;
    if (end > lastEnd && m.index! >= firstStart) lastEnd = end;
  }

  const before = content.slice(0, firstStart);
  const markers = ["**Cọc Bê tông ly tâm**", "**Đường Kính**", "**Khả năng chịu tải"];
  let start = firstStart;
  for (const marker of markers) {
    const idx = before.lastIndexOf(marker);
    if (idx !== -1) start = Math.min(start, idx);
  }

  const table = buildMarkdownTable(headers, rows);
  const replacement = `**Bảng thông số cọc ly tâm dự ứng lực**\n\n${table}\n`;

  return content.slice(0, start) + replacement + content.slice(lastEnd);
}

/** Tách Ưu / Nhược điểm khi scrape gộp một list */
function formatProsConsBlocks(content: string): string {
  const marker = "**ƯU ĐIỂM**\n**NHƯỢC ĐIỂM**";
  const idx = content.indexOf(marker);
  if (idx === -1) return content;

  const after = content.slice(idx + marker.length);
  const nextSection = after.search(/\n\n\*\*[A-ZÀ-Ỵ]/);
  const block = nextSection === -1 ? after : after.slice(0, nextSection);
  const rest = nextSection === -1 ? "" : after.slice(nextSection);

  const items = block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim());

  const disadvantageStarts = [
    "Kỹ thuật chế tạo",
    "Phải sử dụng",
    "Chi phí đầu",
    "Dễ phai",
    "Cường độ bê tông thấp",
    "Mặt đường màu",
    "Hệ số bám",
    "Nhu cầu khai thác",
  ];

  let splitAt = items.length;
  for (let i = 0; i < items.length; i++) {
    if (disadvantageStarts.some((s) => items[i].startsWith(s))) {
      splitAt = i;
      break;
    }
  }

  const pros = items.slice(0, splitAt);
  const cons = items.slice(splitAt);

  const formatted = [
    "**Ưu điểm**",
    ...pros.map((p) => `- ${p}`),
    "",
    "**Nhược điểm**",
    ...cons.map((c) => `- ${c}`),
  ].join("\n");

  return content.slice(0, idx) + formatted + rest;
}

function formatBoldSectionLists(content: string): string {
  const sectionTitles =
    /^\*\*(ƯU ĐIỂM|NHƯỢC ĐIỂM|TIÊU CHUẨN ÁP DỤNG|KIỂM SOÁT TRONG SẢN XUẤT|NGUYÊN TẮC THIẾT KẾ|SẢN PHẨM UHPC)\*\*$/im;

  const lines = content.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (sectionTitles.test(trimmed)) {
      out.push(trimmed);
      i++;
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t || t === " ") {
          i++;
          continue;
        }
        if (t.startsWith("**") || t.startsWith("##") || t.startsWith("- ")) break;
        if (t.length > 200) break;
        items.push(t.replace(/\.$/, ""));
        i++;
      }
      if (items.length >= 2) {
        for (const item of items) {
          out.push(`- ${item}`);
        }
        out.push("");
      } else {
        for (const item of items) out.push(item);
      }
      continue;
    }
    out.push(lines[i]);
    i++;
  }

  return out.join("\n");
}

/** Gộp nhiều dòng trống, bỏ dòng chỉ có khoảng trắng */
function cleanupWhitespace(content: string): string {
  return content
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^ \n/gm, "\n")
    .trim();
}

/** Thêm ghi chú khi chỉ có tiêu đề bảng mà không có dữ liệu text */
function annotateMissingTablePlaceholders(content: string): string {
  if (content.includes("Bảng chi tiết xem trong hình")) return content;
  return content.replace(
    /\*\*BẢNG THÔNG SỐ KỸ THUẬT\*\*(?!\n\n\|)/g,
    "**Bảng thông số kỹ thuật**\n\n*Bảng chi tiết xem trong hình ảnh sản phẩm (tab Thông số / Chứng nhận).*",
  );
}

export function normalizeScrapedMarkdown(content: string): string {
  if (!content?.trim()) return content;

  let result = content;
  result = convertPipeConcreteTable(result);
  result = convertPileRoundTable(result);
  result = formatProsConsBlocks(result);
  result = formatBoldSectionLists(result);
  result = annotateMissingTablePlaceholders(result);
  result = cleanupWhitespace(result);
  return result;
}
