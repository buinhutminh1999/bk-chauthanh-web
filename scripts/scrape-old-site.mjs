/**
 * Scrape product and news content from bachkhoaangiang.com
 * Run: node scripts/scrape-old-site.mjs
 */
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const BASE = "https://bachkhoaangiang.com";

const PRODUCT_PAGES = [
  { slug: "ong-cong-be-tong-ly-tam-du-ung-luc-an-giang", url: "/san-xuat/38-ong-cong-be-tong-ly-tam-du-ung-luc-an-giang", mapTo: "ong-cong-be-tong-ly-tam" },
  { slug: "coc-be-tong-ly-tam-du-ung-luc", url: "/san-xuat/10-coc-be-tong-ly-tam-du-ung-luc", mapTo: "coc-be-tong-ly-tam-du-ung-luc" },
  { slug: "coc-van-be-tong-du-ung-luc", url: "/san-xuat/19-coc-van-be-tong-du-ung-luc", mapTo: "coc-van-be-tong-du-ung-luc" },
  { slug: "coc-vuong-be-tong-du-ung-luc", url: "/san-xuat/20-coc-vuong-be-tong-du-ung-luc", mapTo: "coc-vuong-be-tong-du-ung-luc" },
  { slug: "ong-cong-be-tong-ly-tam", url: "/san-xuat/11-ong-cong-be-tong-ly-tam", mapTo: null }, // separate product or merge
  { slug: "gach-be-tong", url: "/san-xuat/12-gach-be-tong", mapTo: "gach-be-tong" },
  { slug: "gach-via-he", url: "/san-xuat/13-gach-via-he", mapTo: "gach-via-he" },
  { slug: "be-tong-nhua-nong", url: "/san-xuat/14-be-tong-nhua-nong", mapTo: "be-tong-nhua-nong" },
  { slug: "be-tong-sieu-tinh-nang-uhpc", url: "/san-xuat/22-be-tong-sieu-tinh-nang-uhpc", mapTo: "be-tong-sieu-tinh-nang-uhpc" },
];

const NEWS_PAGES = [
  "/tin-tuc-cong-ty/34-thuc-tap-phong-chay-chua-chay-va-cuu-nan-cuu-ho-tai-nha-may-be-tong-chau-thanh",
  "/tin-tuc-cong-ty/31-trao-qua-tiep-buoc-den-truong-2023",
  "/tin-tuc-cong-ty/30-to-chuc-kham-suc-khoe-cho-toan-the-cb-cnv-cong-ty",
  "/tin-tuc-cong-ty/28-nha-may-be-tong-chau-thanh-dam-bao-an-toan-ve-sinh-lao",
  "/tin-tuc-cong-ty/27-cong-ty-cpxd-bach-khoa-tham-gia-sang-kien-thiet-thuc-tr",
  "/tin-tuc-cong-ty/23-le-tong-ket-hoat-dong-san-xuat-kinh-doanh-nam-2022-phuo",
  "/tin-tuc-cong-ty/32-ho-tro-130-trieu-dong-cho-cac-ho-gia-dinh-ban-ve-so",
  "/tin-tuc-cong-ty/17-du-lich-nam-du-lai-son-2018",
  "/tin-tuc-cong-ty/16-cup-bong-da-mini-huong-ung-thang-cong-nhan-nam-2018",
];

function decodeHtml(html) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function htmlToMarkdown(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n\n");
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n");
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n");
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/p>/gi, "\n\n");
  s = s.replace(/<p[^>]*>/gi, "");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeHtml(s);
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

function extractMainContent(html) {
  // Joomla article body
  const patterns = [
    /<div[^>]*class="[^"]*item-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*sp-simpleportfolio-details[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*custom[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m && m[1].length > 100) return m[1];
  }
  // Fallback: content between title h2 and footer/sidebar
  const m = html.match(/<h2[^>]*class="[^"]*title[^"]*"[^>]*>[\s\S]*?<\/h2>([\s\S]*?)<div[^>]*class="[^"]*sp-simpleportfolio-related/i);
  if (m) return m[1];
  const m2 = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (m2) return m2[1];
  return "";
}

function extractTitle(html) {
  const m = html.match(/<h2[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  if (m) return htmlToMarkdown(m[1]).replace(/\n/g, " ").trim();
  const t = html.match(/<title>([^<]+)<\/title>/i);
  return t ? decodeHtml(t[1]).trim() : "";
}

function extractImages(html, basePath) {
  const imgs = [];
  const re = /src="(\/images\/[^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const src = m[1];
    if (!src.includes("logo") && !src.includes("600x350") && !src.includes("spsimpleportfolio")) {
      imgs.push(src);
    }
  }
  // Also from main content area only - get unique
  const content = extractMainContent(html);
  const contentImgs = [];
  const re2 = /src="(\/images\/[^"]+)"/gi;
  while ((m = re2.exec(content)) !== null) {
    const src = m[1];
    if (!src.includes("logo")) contentImgs.push(src);
  }
  return [...new Set(contentImgs.length ? contentImgs : imgs)].slice(0, 12);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function fetchPage(urlPath) {
  const res = await fetch(BASE + urlPath, {
    headers: { "User-Agent": "bk-chauthanh-web-scraper/1.0" },
  });
  if (!res.ok) throw new Error(`Failed ${urlPath}: ${res.status}`);
  return await res.text();
}

async function downloadImage(imgPath, localName) {
  const outDir = path.join(process.cwd(), "public/images/scraped");
  await mkdir(outDir, { recursive: true });
  const ext = path.extname(imgPath) || ".jpg";
  const safeName = localName.replace(/[^a-z0-9-]/gi, "-") + ext;
  const outPath = path.join(outDir, safeName);
  try {
    const res = await fetch(BASE + imgPath);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    return `/images/scraped/${safeName}`;
  } catch {
    return null;
  }
}

async function scrapeProducts() {
  const results = {};
  for (const page of PRODUCT_PAGES) {
    console.log("Product:", page.url);
    const html = await fetchPage(page.url);
    const title = extractTitle(html);
    const content = htmlToMarkdown(extractMainContent(html));
    const images = extractImages(html, page.url);
    const key = page.mapTo || page.slug;
    if (!results[key]) {
      results[key] = { title, content, images: [], sources: [] };
    }
    results[key].sources.push(page.url);
    if (title && !results[key].title) results[key].title = title;
    if (content.length > results[key].content.length) results[key].content = content;
    results[key].images.push(...images);
    results[key].images = [...new Set(results[key].images)];
  }
  return results;
}

async function scrapeNews() {
  const posts = [];
  for (const urlPath of NEWS_PAGES) {
    console.log("News:", urlPath);
    const html = await fetchPage(urlPath);
    const title = extractTitle(html);
    const meta = html.match(/meta name="description" content="([^"]*)"/i);
    const excerpt = meta ? decodeHtml(meta[1]).trim() : title;
    const content = htmlToMarkdown(extractMainContent(html));
    const images = extractImages(html, urlPath);
    const slug = slugify(urlPath.split("/").pop().replace(/^\d+-/, ""));
    posts.push({
      urlPath,
      slug,
      title,
      excerpt: excerpt.slice(0, 300),
      content: content || excerpt,
      images,
    });
  }
  return posts;
}

const products = await scrapeProducts();
const news = await scrapeNews();

const outDir = path.join(process.cwd(), "scripts/scraped-data");
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "products.json"), JSON.stringify(products, null, 2), "utf-8");
await writeFile(path.join(outDir, "news.json"), JSON.stringify(news, null, 2), "utf-8");
console.log("Done. Products:", Object.keys(products).length, "News:", news.length);
