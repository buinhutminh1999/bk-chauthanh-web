import type { MetadataRoute } from "next";

import { getProducts, getPosts, getProjects } from "@/lib/content";

import { getSiteUrl } from "@/lib/seo";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const base = getSiteUrl();

  const [products, posts, projects] = await Promise.all([

    getProducts(),

    getPosts(),

    getProjects(),

  ]);



  const staticPages = [

    { url: base, changeFrequency: "weekly" as const, priority: 1 },

    { url: `${base}/gioi-thieu`, changeFrequency: "monthly" as const, priority: 0.8 },

    { url: `${base}/san-pham`, changeFrequency: "weekly" as const, priority: 0.9 },

    { url: `${base}/cong-trinh`, changeFrequency: "weekly" as const, priority: 0.8 },

    { url: `${base}/tin-tuc`, changeFrequency: "weekly" as const, priority: 0.8 },

    { url: `${base}/hoi-dap`, changeFrequency: "monthly" as const, priority: 0.7 },

    { url: `${base}/lien-he`, changeFrequency: "monthly" as const, priority: 0.7 },

    { url: `${base}/bang-gia`, changeFrequency: "monthly" as const, priority: 0.85 },

    { url: `${base}/chung-nhan`, changeFrequency: "monthly" as const, priority: 0.75 },

    { url: `${base}/tai-lieu`, changeFrequency: "monthly" as const, priority: 0.7 },

    { url: `${base}/chinh-sach-bao-mat`, changeFrequency: "yearly" as const, priority: 0.3 },

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



  const projectPages = projects.map((p) => ({

    url: `${base}/cong-trinh/${p.slug}`,

    lastModified: new Date(p.updatedAt),

    changeFrequency: "monthly" as const,

    priority: 0.75,

  }));



  return [...staticPages, ...productPages, ...postPages, ...projectPages];

}

