import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/content";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const specEntries = product.specs ? Object.entries(product.specs).slice(0, 2) : [];

  return (
    <article className="group relative flex flex-col overflow-hidden card-base card-interactive">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-brand-100">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-steel text-sm">
              Không có ảnh
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/10 to-transparent" />
          <Badge className="absolute top-3 left-3 shadow-sm">{product.category}</Badge>
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
