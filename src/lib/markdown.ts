/** Split markdown content into sections by ## headings */
export function splitMarkdownSections(content: string): { title: string; body: string }[] {
  const lines = content.split("\n");
  const sections: { title: string; body: string }[] = [];
  let currentTitle = "Giới thiệu";
  let currentLines: string[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (currentLines.length > 0) {
        sections.push({ title: cleanTitle(currentTitle), body: currentLines.join("\n").trim() });
      }
      currentTitle = h2[1];
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sections.push({ title: cleanTitle(currentTitle), body: currentLines.join("\n").trim() });
  }

  return sections.filter((s) => s.body.length > 20);
}

function cleanTitle(title: string) {
  return title.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}

export function categorizeSection(title: string): "intro" | "specs" | "application" | "cert" | "other" {
  const t = title.toLowerCase();
  if (t.includes("thông số") || t.includes("bảng") || t.includes("properties") || t.includes("chỉ tiêu"))
    return "specs";
  if (t.includes("ứng dụng") || t.includes("ưu điểm") || t.includes("nhược"))
    return "application";
  if (t.includes("chứng nhận") || t.includes("giấy chứng") || t.includes("bản vẽ"))
    return "cert";
  if (t.includes("giới thiệu") || sectionsMatchIntro(t)) return "intro";
  return "other";
}

function sectionsMatchIntro(t: string) {
  return (
    t.includes("cống") ||
    t.includes("cọc") ||
    t.includes("gạch") ||
    t.includes("bê tông") ||
    t.includes("ống")
  );
}

export function groupSectionsForTabs(sections: { title: string; body: string }[]) {
  const tabs: { id: string; label: string; sections: typeof sections }[] = [
    { id: "intro", label: "Giới thiệu", sections: [] },
    { id: "specs", label: "Thông số kỹ thuật", sections: [] },
    { id: "application", label: "Ứng dụng", sections: [] },
    { id: "cert", label: "Chứng nhận & bản vẽ", sections: [] },
  ];

  for (const section of sections) {
    const cat = categorizeSection(section.title);
    const tab = tabs.find((t) => t.id === cat) ?? tabs.find((t) => t.id === "intro")!;
    tab.sections.push(section);
  }

  return tabs.filter((t) => t.sections.length > 0);
}
