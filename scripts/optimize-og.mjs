import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/hero-nha-may.jpg");
const output = path.join(root, "public/og-default.jpg");

const info = await sharp(input)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

console.log(
  `og-default.jpg: ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`,
);
