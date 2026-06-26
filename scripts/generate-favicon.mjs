import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/logo-bach-khoa-icon.png");

const variants = [
  { out: "public/favicon.png", size: 32 },
  { out: "public/apple-touch-icon.png", size: 180 },
  { out: "src/app/icon.png", size: 32 },
  { out: "src/app/apple-icon.png", size: 180 },
];

for (const { out, size } of variants) {
  const target = path.join(root, out);
  const info = await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 245, g: 242, b: 236, alpha: 1 },
    })
    .png()
    .toFile(target);

  console.log(`${out}: ${info.width}x${info.height} (${Math.round(info.size / 1024)} KB)`);
}
