import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/content";

export function RelatedProducts({
  products,
  currentSlug,
  category,
}: {
  products: Product[];
  currentSlug: string;
  category?: string;
}) {
  const sameCategory = products.filter(
    (p) => p.slug !== currentSlug && p.category === category,
  );
  const others = products.filter(
    (p) => p.slug !== currentSlug && p.category !== category,
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="mt-16 pt-16 border-t border-brand-100">
      <h2 className="font-display text-2xl text-brand-900">Sản phẩm liên quan</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((p) => (
          <Link
            key={p.id}
            href={`/san-pham/${p.slug}`}
            className="group flex gap-4 p-4 rounded-xl border border-brand-100 bg-white hover:border-brand-200 hover:shadow-md transition-all"
          >
            <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-brand-50">
              {p.images[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-brand-600 font-medium">{p.category}</p>
              <p className="font-medium text-brand-900 line-clamp-2 group-hover:text-brand-700 text-sm mt-0.5">
                {p.name}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-brand-600">
                Chi tiết <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
