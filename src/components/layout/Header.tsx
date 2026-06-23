"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/BrandMark";
import { cn } from "@/lib/utils";
import { telLink, zaloLink } from "@/lib/site-constants";
import type { SiteBrand } from "@/types/content";

const NAV_BEFORE_PRODUCTS = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

const NAV_AFTER_PRODUCTS = [
  { href: "/cong-trinh", label: "Công trình" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/hoi-dap", label: "Hỏi đáp" },
  { href: "/lien-he", label: "Liên hệ" },
];

const NAV = [...NAV_BEFORE_PRODUCTS, ...NAV_AFTER_PRODUCTS];

const navLinkClass =
  "shrink-0 whitespace-nowrap px-2.5 xl:px-3 py-2 text-sm font-medium text-brand-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors";

type ProductLink = { slug: string; name: string; category: string };

export function Header({
  companyName,
  brand,
  phone,
  products = [],
}: {
  companyName: string;
  brand?: SiteBrand;
  phone: string;
  products?: ProductLink[];
}) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const byCategory = new Map<string, ProductLink[]>();
  for (const p of products) {
    const list = byCategory.get(p.category) ?? [];
    list.push(p);
    byCategory.set(p.category, list);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-800/40 bg-brand-900 text-white shadow-lg shadow-brand-900/20">
      <Container>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 sm:gap-x-4 h-16 lg:h-[4.75rem]">
          <BrandMark brand={brand} companyName={companyName} showTextFrom="md" />

          <nav className="hidden lg:flex items-center justify-center gap-0.5 min-w-0">
            {NAV_BEFORE_PRODUCTS.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                className={cn(navLinkClass, "flex items-center gap-1")}
              >
                Sản phẩm
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 transition-transform", productsOpen && "rotate-180")}
                />
              </button>
              {productsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProductsOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 z-50 w-72 rounded-xl bg-white text-ink shadow-xl ring-1 ring-brand-100 py-2 animate-fade-up">
                    <Link
                      href="/san-pham"
                      className="block px-4 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-50"
                      onClick={() => setProductsOpen(false)}
                    >
                      Tất cả sản phẩm
                    </Link>
                    <div className="border-t border-brand-100 my-1" />
                    {Array.from(byCategory.entries()).map(([cat, items]) => (
                      <div key={cat} className="px-4 py-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
                          {cat}
                        </p>
                        {items.slice(0, 3).map((p) => (
                          <Link
                            key={p.slug}
                            href={`/san-pham/${p.slug}`}
                            className="block py-1 text-sm text-ink-muted hover:text-brand-700 line-clamp-1"
                            onClick={() => setProductsOpen(false)}
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {NAV_AFTER_PRODUCTS.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
            {phone && (
              <a
                href={telLink(phone)}
                className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap px-3 py-2 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-600 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {phone}
              </a>
            )}
            {phone && (
              <a
                href={zaloLink(phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Chat Zalo"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#4FC3F7]" />
                Zalo
              </a>
            )}
            <Button
              href="/lien-he"
              size="sm"
              className="hidden sm:inline-flex shrink-0 whitespace-nowrap bg-accent text-brand-900 hover:bg-accent-light border-0"
            >
              Báo giá
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 shrink-0"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "lg:hidden border-t border-white/10 bg-brand-900 overflow-hidden transition-all duration-300",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 text-sm font-medium text-brand-100 hover:text-white hover:bg-white/10 rounded-lg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-brand-100 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Sản phẩm
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", mobileProductsOpen && "rotate-180")}
            />
          </button>
          {mobileProductsOpen && (
            <div className="pl-4 pb-2 space-y-1">
              <Link
                href="/san-pham"
                className="block px-4 py-2 text-sm text-brand-200 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Tất cả sản phẩm
              </Link>
              {products.slice(0, 8).map((p) => (
                <Link
                  key={p.slug}
                  href={`/san-pham/${p.slug}`}
                  className="block px-4 py-2 text-sm text-brand-200 hover:text-white line-clamp-1"
                  onClick={() => setOpen(false)}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
          {phone && (
            <a
              href={telLink(phone)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-700 text-white font-medium whitespace-nowrap"
            >
              <Phone className="h-4 w-4" />
              Gọi {phone}
            </a>
          )}
          <Button href="/lien-he" className="mt-2 w-full bg-accent text-brand-900 hover:bg-accent-light">
            Yêu cầu báo giá
          </Button>
        </Container>
      </div>
    </header>
  );
}
