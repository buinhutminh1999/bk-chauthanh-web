export interface SalesContact {
  role: string;
  name: string;
  phone: string;
}

export interface SiteBrand {
  prefix: string;
  name: string;
  locality: string;
  slogan: string;
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  foundedYear: number;
  parentCompany?: string;
  brand?: SiteBrand;
  salesContacts?: SalesContact[];
  stats: { label: string; value: string }[];
  social: {
    facebook?: string;
    zalo?: string;
    youtube?: string;
  };
}

export type ProductDocumentType = "pdf" | "drawing" | "catalog";

export interface ProductDocument {
  title: string;
  url: string;
  type: ProductDocumentType;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  images: string[];
  documents?: ProductDocument[];
  featured: boolean;
  specs?: Record<string, string>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  images?: string[];
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  productTypes: string[];
  description: string;
  images: string[];
  year?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}
