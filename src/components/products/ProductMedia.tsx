"use client";

import { ImageGallery } from "@/components/ui/ImageGallery";
import { ProductionProcess } from "@/components/products/ProductionProcess";
import { getProductProcess } from "@/lib/product-process";
import { cn } from "@/lib/utils";

export function ProductMedia({
  slug,
  images,
  alt,
  className,
}: {
  slug: string;
  images: string[];
  alt: string;
  className?: string;
}) {
  const process = getProductProcess(slug);

  if (!process) {
    return <ImageGallery images={images} alt={alt} className={className} />;
  }

  return (
    <div className={cn("min-w-0 space-y-4", className)}>
      <ProductionProcess process={process} />
      {images.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-600">
            Chứng nhận &amp; tài liệu
          </p>
          <ImageGallery images={images} alt={alt} />
        </div>
      )}
    </div>
  );
}
