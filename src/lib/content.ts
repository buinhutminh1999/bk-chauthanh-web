import { cache } from "react";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Post, Product, Project, SiteConfig, FaqItem } from "@/types/content";
import { sortProductsByPriority } from "@/lib/site-constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(CONTENT_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filename: string, data: unknown) {
  await mkdir(CONTENT_DIR, { recursive: true });
  await writeFile(
    path.join(CONTENT_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}

const defaultSiteConfig: SiteConfig = {
  companyName: "Công ty Cổ phần Sản xuất Bê tông Châu Thành",
  shortName: "Bê tông Châu Thành",
  tagline: "Chất lượng từ nguồn gốc — Uy tín từ sản xuất",
  description: "",
  phone: "",
  email: "",
  address: "",
  foundedYear: 2010,
  brand: {
    prefix: "CÔNG TY CỔ PHẦN SẢN XUẤT",
    name: "BÊ TÔNG",
    locality: "CHÂU THÀNH",
    slogan: "VẬT LIỆU XÂY DỰNG — UY TÍN TỪ SẢN XUẤT",
  },
  salesContacts: [],
  stats: [],
  social: {},
};

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  return readJson<SiteConfig>("site.json", defaultSiteConfig);
});

export const getProducts = cache(async (publishedOnly = true): Promise<Product[]> => {
  const products = await readJson<Product[]>("products.json", []);
  const sorted = sortProductsByPriority(products);
  if (!publishedOnly) return sorted;
  return sorted.filter((p) => p.published);
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts(false);
  return products.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts(false);
  return products.find((p) => p.id === id) ?? null;
}

export async function saveProducts(products: Product[]) {
  await writeJson("products.json", products);
}

export const getPosts = cache(async (publishedOnly = true): Promise<Post[]> => {
  const [posts, seoPosts] = await Promise.all([
    readJson<Post[]>("posts.json", []),
    readJson<Post[]>("posts-seo.json", []),
  ]);
  const merged = [...seoPosts, ...posts];
  const sorted = [...merged].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  if (!publishedOnly) return sorted;
  return sorted.filter((p) => p.published);
});

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts(false);
  return posts.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts(false);
  return posts.find((p) => p.id === id) ?? null;
}

export async function savePosts(posts: Post[]) {
  await writeJson("posts.json", posts);
}

export async function saveSiteConfig(config: SiteConfig) {
  await writeJson("site.json", config);
}

export const getProjects = cache(async (publishedOnly = true): Promise<Project[]> => {
  const projects = await readJson<Project[]>("projects.json", []);
  const sorted = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  if (!publishedOnly) return sorted;
  return sorted.filter((p) => p.published);
});

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects(false);
  return projects.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects(false);
  return projects.find((p) => p.id === id) ?? null;
}

export async function saveProjects(projects: Project[]) {
  await writeJson("projects.json", projects);
}

export const getFaqs = cache(async (): Promise<FaqItem[]> => {
  const items = await readJson<FaqItem[]>("faq.json", []);
  return [...items].sort((a, b) => a.order - b.order);
});

export async function saveFaqs(items: FaqItem[]) {
  await writeJson("faq.json", items);
}
