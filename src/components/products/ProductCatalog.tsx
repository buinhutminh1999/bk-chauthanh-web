"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/content";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";

const VALID_FILTERS = new Set<string>(PRODUCT_LINE_FILTERS.map((item) => item.slug));

function parseFilter(raw: string | null): "all" | string {
  if (raw && VALID_FILTERS.has(raw)) return raw;
  return "all";
}

const chipClass = (active: boolean) =>
  cn(
    "shrink-0 snap-start min-h-11 px-4 py-2 rounded-md text-sm font-semibold transition-[background-color,color,border-color,box-shadow]",
    active
      ? "bg-brand-700 text-white shadow-md shadow-brand-900/15 ring-1 ring-brand-600/30"
      : "bg-white text-ink-muted border border-brand-200 hover:border-brand-400 hover:text-brand-800",
  );

export function ProductCatalog({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filter = parseFilter(searchParams.get("loai"));

  const sortedProducts = useMemo(() => sortProductsByPriority(products), [products]);

  const setFilter = useCallback(
    (next: "all" | string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "all") params.delete("loai");
      else params.set("loai", next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProducts;
    return sortedProducts.filter((p) => p.slug === filter);
  }, [filter, sortedProducts]);

  return (
    <>
      <div className="scroll-hint-x mb-10">
        <div
          className="flex min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-2 scrollbar-thin snap-x snap-mandatory sm:flex-wrap sm:overflow-visible sm:snap-none"
          role="tablist"
          aria-label="Lọc sản phẩm"
        >
          <button
            type="button"
            role="tab"
            id="tab-all"
            aria-selected={filter === "all"}
            aria-controls="product-grid"
            onClick={() => setFilter("all")}
            className={chipClass(filter === "all")}
          >
            Tất cả
          </button>
          {PRODUCT_LINE_FILTERS.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`tab-${item.slug}`}
              aria-selected={filter === item.slug}
              aria-controls="product-grid"
              onClick={() => setFilter(item.slug)}
              className={chipClass(filter === item.slug)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id="product-grid"
        role="tabpanel"
        aria-labelledby={filter === "all" ? "tab-all" : `tab-${filter}`}
        className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <EmptyState
          title="Không có sản phẩm trong nhóm này"
          description="Thử chọn danh mục khác hoặc xem toàn bộ sản phẩm."
        />
      )}
    </>
  );
}
