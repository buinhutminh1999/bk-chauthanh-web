/**
 * Apply scraped data + download images → content/*.json
 * Run: node scripts/apply-import.mjs
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const BASE = "https://bachkhoaangiang.com";
const ROOT = process.cwd();

const PRODUCT_SLUG_MAP = {
  "ong-cong-be-tong-ly-tam": "prod-001",
  "coc-be-tong-ly-tam-du-ung-luc": "prod-002",
  "coc-van-be-tong-du-ung-luc": "prod-003",
  "coc-vuong-be-tong-du-ung-luc": "prod-004",
  "gach-be-tong": "prod-005",
  "gach-via-he": "prod-006",
  "be-tong-nhua-nong": "prod-007",
  "be-tong-sieu-tinh-nang-uhpc": "prod-008",
};

function cleanContent(text) {
  let s = text.replace(/\t/g, "").replace(/\r\n/g, "\n");
  const cutMarkers = ["\n#### Ngày", "\n\t\t\n\t\t\t"];
  for (const m of cutMarkers) {
    const idx = s.indexOf(m);
    if (idx > 0) s = s.slice(0, idx);
  }
  // Remove duplicate h2 title at start if content repeats title
  s = s.replace(/^##[^\n]+\n\n##/m, "##");
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function encodeUrlPath(imgPath) {
  return imgPath
    .split("/")
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)))
    .join("/");
}

async function downloadImage(imgPath, localRelPath) {
  const outPath = path.join(ROOT, "public", localRelPath.replace(/^\//, ""));
  await mkdir(path.dirname(outPath), { recursive: true });
  const url = BASE + encodeUrlPath(imgPath);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "bk-import/1.0" } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    return localRelPath;
  } catch {
    return null;
  }
}

function safeLocalPath(prefix, imgPath, index) {
  const base = path.basename(imgPath);
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_");
  return `/images/imported/${prefix}/${index}-${safe}`;
}

async function downloadImages(imgPaths, prefix, max = 8) {
  const local = [];
  const slice = imgPaths.slice(0, max);
  for (let i = 0; i < slice.length; i++) {
    const rel = safeLocalPath(prefix, slice[i], i);
    const ok = await downloadImage(slice[i], rel);
    if (ok) local.push(ok);
    else console.warn("Skip image:", slice[i]);
  }
  return local;
}

function parseVietnameseDate(text) {
  const m = text.match(/(\d{1,2})\s+Tháng\s+(\d{1,2})\s+(\d{4})/i);
  if (!m) return new Date().toISOString();
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return d.toISOString();
}

function excerptFromContent(content, max = 220) {
  const plain = content
    .replace(/#+\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max - 1) + "…" : plain;
}

// --- Site config ---
const site = {
  companyName: "Công ty Cổ phần Sản xuất Bách Khoa Châu Thành",
  shortName: "Bách Khoa Châu Thành",
  tagline: "Vật liệu xây dựng chất lượng — Uy tín từ sản xuất",
  description:
    "Nhà máy bê tông Châu Thành — sản xuất cống bê tông ly tâm, cọc bê tông dự ứng lực, gạch bê tông, gạch vỉa hè, bê tông nhựa nóng và bê tông siêu tính năng UHPC tại Châu Thành, An Giang.",
  phone: "079 555 5777",
  email: "bachkhoachauthanh@gmail.com",
  address:
    "612 QL91, Bình Hòa, Huyện Châu Thành, An Giang, Việt Nam",
  foundedYear: 2010,
  parentCompany: "Công ty Cổ phần Xây dựng Bách Khoa",
  stats: [
    { label: "Năm kinh nghiệm", value: "15+" },
    { label: "Dòng sản phẩm", value: "9+" },
    { label: "Công trình phục vụ", value: "500+" },
    { label: "Nhân sự", value: "120+" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100090671474567",
  },
};

await writeFile(
  path.join(ROOT, "content/site.json"),
  JSON.stringify(site, null, 2),
  "utf-8",
);

// --- Products ---
const scrapedProducts = JSON.parse(
  await readFile(path.join(ROOT, "scripts/scraped-data/products.json"), "utf-8"),
);
const products = JSON.parse(
  await readFile(path.join(ROOT, "content/products.json"), "utf-8"),
);

for (const product of products) {
  const scrapedKey = Object.entries(PRODUCT_SLUG_MAP).find(
    ([, id]) => id === product.id,
  )?.[0];
  if (!scrapedKey || !scrapedProducts[scrapedKey]) continue;

  const scraped = scrapedProducts[scrapedKey];
  product.name = scraped.title || product.name;
  product.description = cleanContent(scraped.content);
  product.shortDescription = excerptFromContent(product.description, 160);

  console.log("Product images:", product.slug);
  const imgs = await downloadImages(scraped.images, product.slug, 6);
  if (imgs.length) product.images = imgs;
  product.updatedAt = new Date().toISOString();
}

await writeFile(
  path.join(ROOT, "content/products.json"),
  JSON.stringify(products, null, 2),
  "utf-8",
);

// --- Posts ---
const scrapedNews = JSON.parse(
  await readFile(path.join(ROOT, "scripts/scraped-data/news.json"), "utf-8"),
);

const posts = [];
for (const item of scrapedNews) {
  const content = cleanContent(item.content);
  const createdAt = parseVietnameseDate(content + item.excerpt);
  const tags = ["Tin công ty"];
  if (content.match(/nhà máy|sản xuất/i)) tags.push("Nhà máy Châu Thành");
  if (content.match(/PCCC|chữa cháy/i)) tags.push("An toàn");

  console.log("Post images:", item.slug);
  const imgs = await downloadImages(item.images, `post-${item.slug}`, 10);
  const coverImage = imgs[0] || undefined;

  posts.push({
    id: `post-${item.slug.slice(0, 40)}`,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || excerptFromContent(content, 200),
    content,
    coverImage,
    tags: [...new Set(tags)],
    published: true,
    createdAt,
    updatedAt: new Date().toISOString(),
  });
}

// Sort by date descending
posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

await writeFile(
  path.join(ROOT, "content/posts.json"),
  JSON.stringify(posts, null, 2),
  "utf-8",
);

console.log("Applied:", products.length, "products,", posts.length, "posts");
