import { readFile, writeFile } from "fs/promises";
import path from "path";
import { normalizeScrapedMarkdown } from "../src/lib/normalize-scraped-content.ts";

const productsPath = path.join(process.cwd(), "content", "products.json");

const raw = await readFile(productsPath, "utf-8");
const products = JSON.parse(raw);

for (const product of products) {
  product.description = normalizeScrapedMarkdown(product.description);
  product.updatedAt = new Date().toISOString();
}

await writeFile(productsPath, JSON.stringify(products, null, 2) + "\n", "utf-8");
console.log(`Normalized ${products.length} products in content/products.json`);
