import { readFileSync, existsSync } from "fs";
import path from "path";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bachkhoachauthanh.vn"
).replace(/\/$/, "");

const paths = ["/", "/sitemap.xml", "/robots.txt", "/bang-gia", "/chinh-sach-bao-mat"];

console.log(`\n🔍 Kiểm tra go-live: ${siteUrl}\n`);

let ok = 0;
let fail = 0;

for (const path of paths) {
  const url = `${siteUrl}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const status = res.status;
    if (status >= 200 && status < 400) {
      console.log(`  ✓ ${path} → ${status}`);
      ok++;
    } else {
      console.log(`  ✗ ${path} → ${status}`);
      fail++;
    }
  } catch (err) {
    console.log(`  ✗ ${path} → ${err.message ?? "lỗi mạng"}`);
    fail++;
  }
}

console.log(`\nKết quả: ${ok}/${paths.length} OK\n`);

if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
  console.log(`  GA4: ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`);
} else {
  console.log("  ⚠ Chưa set NEXT_PUBLIC_GA_MEASUREMENT_ID");
}

if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
  console.log("  ✓ Google Site Verification đã cấu hình");
} else {
  console.log("  ⚠ Chưa set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
}

console.log("\n📋 Submit sitemap GSC:");
console.log(`   ${siteUrl}/sitemap.xml`);
console.log("   https://search.google.com/search-console\n");

process.exit(fail > 0 ? 1 : 0);
