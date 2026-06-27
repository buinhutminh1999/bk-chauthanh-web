import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProductThumbnail, hasProcessVisual } from "@/components/products/ProductThumbnail";
import type { Product } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const specEntries = product.specs ? Object.entries(product.specs).slice(0, 2) : [];
  const usesProcess = hasProcessVisual(product.slug);

  return (
    <article className="group relative flex flex-col overflow-hidden card-base card-interactive">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-brand-50",
            usesProcess ? "min-h-[22rem] sm:min-h-[24rem]" : "aspect-[5/4]",
          )}
        >
          <div className={cn("absolute inset-0", usesProcess ? "p-2 sm:p-3 overflow-y-auto" : "p-2 sm:p-3")}>
            <ProductThumbnail
              slug={product.slug}
              image={image}
              alt={product.name}
              size={usesProcess ? "compact" : undefined}
            />
          </div>
          {!usesProcess && (
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/10 to-transparent pointer-events-none" />
          )}
          <Badge className="absolute top-3 left-3 z-10 shadow-sm">{product.category}</Badge>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-lg text-brand-900 group-hover:text-brand-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
          {specEntries.length > 0 && (
            <ul className="mt-4 space-y-1.5 border-t border-brand-50 pt-4">
              {specEntries.map(([key, value]) => (
                <li key={key} className="flex items-start gap-2 text-xs text-ink-muted">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-ink">{key}:</span> {value}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-800">
            Chi tiết
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
