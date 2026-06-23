"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/content";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";

const chipClass = (active: boolean) =>
  cn(
    "shrink-0 snap-start min-h-11 px-4 py-2 rounded-full text-sm font-medium transition-all",
    active
      ? "bg-brand-700 text-white shadow-md shadow-brand-900/15"
      : "bg-white text-ink-muted border border-brand-100 hover:border-brand-300 hover:text-brand-800",
  );

export function ProductCatalog({ products }: { products: Product[] }) {
  const sortedProducts = useMemo(() => sortProductsByPriority(products), [products]);

  const [filter, setFilter] = useState<"all" | string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProducts;
    return sortedProducts.filter((p) => p.slug === filter);
  }, [filter, sortedProducts]);

  return (
    <>
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory sm:flex-wrap sm:overflow-visible sm:snap-none"
          role="tablist"
          aria-label="Lọc sản phẩm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
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
              aria-selected={filter === item.slug}
              onClick={() => setFilter(item.slug)}
              className={chipClass(filter === item.slug)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-ink-muted py-12">Không có sản phẩm trong nhóm này.</p>
      )}
    </>
  );
}
