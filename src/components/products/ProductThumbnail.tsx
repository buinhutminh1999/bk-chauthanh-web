import Image from "next/image";
import {
  ProductionProcess,
  type ProcessSize,
} from "@/components/products/ProductionProcess";
import { getProductProcess } from "@/lib/product-process";
import { cn } from "@/lib/utils";

export function ProductThumbnail({
  slug,
  image,
  alt,
  size,
  compact = false,
  className,
  imageClassName,
}: {
  slug: string;
  image?: string;
  alt: string;
  size?: ProcessSize;
  compact?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const process = getProductProcess(slug);
  const resolvedSize: ProcessSize | undefined =
    size ?? (compact ? "compact" : process ? "default" : undefined);

  if (process) {
    return (
      <ProductionProcess
        process={process}
        size={resolvedSize}
        className={className}
      />
    );
  }

  if (image) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full items-center justify-center bg-brand-100 text-sm text-steel",
        className,
      )}
    >
      Không có ảnh
    </div>
  );
}

export function hasProcessVisual(slug: string): boolean {
  return getProductProcess(slug) !== undefined;
}
