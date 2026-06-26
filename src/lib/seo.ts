import type { Metadata } from "next";
import type { SiteConfig } from "@/types/content";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bachkhoachauthanh.vn";
const DEFAULT_OG_IMAGE = "/og-default.jpg";

export function getSiteUrl() {
  return DEFAULT_SITE_URL.replace(/\/$/, "");
}

export function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  siteName = "Bê tông Châu Thành",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  siteName?: string;
}): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const ogImage = toAbsoluteUrl(image ?? DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "vi_VN",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function organizationJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.companyName,
    url: getSiteUrl(),
    logo: toAbsoluteUrl("/images/logo-bach-khoa.png"),
    image: toAbsoluteUrl(DEFAULT_OG_IMAGE),
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Châu Thành",
      addressRegion: "An Giang",
      addressCountry: "VN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "An Giang, Việt Nam",
    },
  };
}

export function webSiteJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.shortName,
    alternateName: site.companyName,
    url: getSiteUrl(),
    description: site.description,
    inLanguage: "vi-VN",
    publisher: {
      "@type": "Organization",
      name: site.companyName,
      logo: toAbsoluteUrl("/images/logo-bach-khoa.png"),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path}`,
    })),
  };
}

export function projectJsonLd(project: {
  title: string;
  description: string;
  slug: string;
  images: string[];
  location: string;
  year?: string;
  siteName?: string;
}) {
  const orgName = project.siteName ?? "Bê tông Châu Thành";
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.images.map(toAbsoluteUrl),
    url: `${getSiteUrl()}/cong-trinh/${project.slug}`,
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    ...(project.year ? { dateCreated: project.year } : {}),
    creator: {
      "@type": "Organization",
      name: orgName,
    },
  };
}

export function contactPageJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Liên hệ — ${site.shortName}`,
    description: `Liên hệ ${site.companyName} — tư vấn và báo giá vật liệu xây dựng.`,
    url: `${getSiteUrl()}/lien-he`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: site.companyName,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressLocality: "Châu Thành",
        addressRegion: "An Giang",
        addressCountry: "VN",
      },
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  images: string[];
  siteName?: string;
}) {
  const brandName = product.siteName ?? "Bê tông Châu Thành";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map(toAbsoluteUrl),
    url: `${getSiteUrl()}/san-pham/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  siteName?: string;
}) {
  const orgName = post.siteName ?? "Bê tông Châu Thành";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    ...(post.coverImage ? { image: toAbsoluteUrl(post.coverImage) } : {}),
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    url: `${getSiteUrl()}/tin-tuc/${post.slug}`,
    author: {
      "@type": "Organization",
      name: orgName,
    },
    publisher: {
      "@type": "Organization",
      name: orgName,
      logo: { "@type": "ImageObject", url: toAbsoluteUrl("/images/logo-bach-khoa.png") },
    },
  };
}
