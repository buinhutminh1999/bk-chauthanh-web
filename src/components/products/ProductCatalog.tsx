"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/content";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";

export function ProductCatalog({ products }: { products: Product[] }) {
  const sortedProducts = useMemo(() => sortProductsByPriority(products), [products]);

  const [filter, setFilter] = useState<"all" | string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProducts;
    return sortedProducts.filter((p) => p.slug === filter);
  }, [filter, sortedProducts]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            filter === "all"
              ? "bg-brand-700 text-white shadow-md shadow-brand-900/15"
              : "bg-white text-ink-muted border border-brand-100 hover:border-brand-300 hover:text-brand-800",
          )}
        >
          Tất cả
        </button>
        {PRODUCT_LINE_FILTERS.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setFilter(item.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all text-left",
              filter === item.slug
                ? "bg-brand-700 text-white shadow-md shadow-brand-900/15"
                : "bg-white text-ink-muted border border-brand-100 hover:border-brand-300 hover:text-brand-800",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
