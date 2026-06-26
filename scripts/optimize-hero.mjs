import sharp from "sharp";

import path from "path";

import { fileURLToPath } from "url";



const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, "..");

const input = path.join(root, "public/images/hero-nha-may.jpg");

const outDir = path.join(root, "public/images");



const variants = [

  { name: "hero-nha-may-640.webp", width: 640, quality: 72, format: "webp" },

  { name: "hero-nha-may-640.avif", width: 640, quality: 42, format: "avif" },

  { name: "hero-nha-may-1280.webp", width: 1280, quality: 78, format: "webp" },

  { name: "hero-nha-may-1280.avif", width: 1280, quality: 50, format: "avif" },

  { name: "hero-nha-may.webp", width: null, quality: 78, format: "webp" },

  { name: "hero-nha-may-fallback.jpg", width: 1280, quality: 72, format: "jpeg" },

];



for (const { name, width, quality, format } of variants) {

  let pipeline = sharp(input);

  if (width) {

    pipeline = pipeline.resize(width, null, { withoutEnlargement: true });

  }



  const out = path.join(outDir, name);

  const info =

    format === "avif"

      ? await pipeline.avif({ quality, effort: 4 }).toFile(out)

      : format === "jpeg"

        ? await pipeline.jpeg({ quality, mozjpeg: true }).toFile(out)

        : await pipeline.webp({ quality, effort: 6 }).toFile(out);



  console.log(

    `${name}: ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`,

  );

}

