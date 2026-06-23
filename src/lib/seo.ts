import type { Metadata } from "next";
import type { SiteConfig } from "@/types/content";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bachkhoachauthanh.vn";

export function getSiteUrl() {
  return DEFAULT_SITE_URL.replace(/\/$/, "");
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const ogImage = image ?? `${getSiteUrl()}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Bách Khoa Châu Thành",
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
    "@type": "Organization",
    name: site.companyName,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/images/logo-bach-khoa.png`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "VN",
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    url: `${getSiteUrl()}/san-pham/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Bách Khoa Châu Thành",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    url: `${getSiteUrl()}/tin-tuc/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "Bách Khoa Châu Thành",
    },
    publisher: {
      "@type": "Organization",
      name: "Bách Khoa Châu Thành",
      logo: { "@type": "ImageObject", url: `${getSiteUrl()}/images/logo-bach-khoa.png` },
    },
  };
}
