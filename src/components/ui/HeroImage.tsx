import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export const HERO_IMAGE = {
  width: 1276,
  height: 956,
  fallback: "/images/hero-nha-may-fallback.jpg",
  mobileAvif: "/images/hero-nha-may-640.avif",
  mobileWebp: "/images/hero-nha-may-640.webp",
  desktopAvif: "/images/hero-nha-may-1280.avif",
  desktopWebp: "/images/hero-nha-may-1280.webp",
} as const;

const PRIORITY_PICTURE_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "block",
  width: "100%",
  height: "100%",
};

const PRIORITY_IMG_STYLE: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export function HeroImage({
  alt,
  priority = false,
  className,
}: {
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  if (priority) {
    return (
      <picture className={className} style={PRIORITY_PICTURE_STYLE}>
        <source
          media="(max-width: 768px)"
          srcSet={HERO_IMAGE.mobileAvif}
          type="image/avif"
        />
        <source
          media="(max-width: 768px)"
          srcSet={HERO_IMAGE.mobileWebp}
          type="image/webp"
        />
        <source srcSet={HERO_IMAGE.desktopAvif} type="image/avif" />
        <source srcSet={HERO_IMAGE.desktopWebp} type="image/webp" />
        <img
          src={HERO_IMAGE.fallback}
          alt={alt}
          width={HERO_IMAGE.width}
          height={HERO_IMAGE.height}
          sizes="100vw"
          style={PRIORITY_IMG_STYLE}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
    );
  }

  return (
    <picture
      className={cn("absolute inset-0 block h-full w-full", className)}
    >
      <source
        media="(max-width: 768px)"
        srcSet={HERO_IMAGE.mobileAvif}
        type="image/avif"
      />
      <source
        media="(max-width: 768px)"
        srcSet={HERO_IMAGE.mobileWebp}
        type="image/webp"
      />
      <source srcSet={HERO_IMAGE.desktopAvif} type="image/avif" />
      <source srcSet={HERO_IMAGE.desktopWebp} type="image/webp" />
      <img
        src={HERO_IMAGE.fallback}
        alt={alt}
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        sizes="100vw"
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
