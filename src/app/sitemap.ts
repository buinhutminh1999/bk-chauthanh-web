import type { MetadataRoute } from "next";
import { getProducts, getPosts } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const products = await getProducts();
  const posts = await getPosts();

  const staticPages = [
    { url: base, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/gioi-thieu`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/san-pham`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/cong-trinh`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/tin-tuc`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/hoi-dap`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/lien-he`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const productPages = products.map((p) => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postPages = posts.map((p) => ({
    url: `${base}/tin-tuc/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...postPages];
}
