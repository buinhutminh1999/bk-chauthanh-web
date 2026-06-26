"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/BrandMark";
import { cn } from "@/lib/utils";
import { telLink, zaloLink } from "@/lib/site-constants";
import { trackContactClick } from "@/lib/analytics";
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
  "shrink-0 whitespace-nowrap px-2.5 lg:px-3 py-2 text-[13px] xl:text-sm font-medium text-brand-100/90 hover:text-white rounded-md hover:bg-white/8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";

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

  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [productsOpen]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 bg-brand-900 text-white overflow-x-hidden">
      <div className="h-0.5 bg-gradient-to-r from-brand-700 via-accent to-brand-700" />
      <div className="border-b border-brand-700/60 shadow-lg shadow-brand-900/25">
        <Container>
          <div className="grid min-w-0 grid-cols-[minmax(0,auto)_1fr_auto] items-center gap-x-3 sm:gap-x-4 h-16 lg:h-[4.75rem]">
            <BrandMark brand={brand} companyName={companyName} showTextFrom="lg" context="header" />

            <nav className="hidden lg:flex items-center justify-center gap-0.5 min-w-0" aria-label="Chính">
              {NAV_BEFORE_PRODUCTS.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              ))}

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setProductsOpen(!productsOpen)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  className={cn(navLinkClass, "flex items-center gap-1")}
                >
                  Sản phẩm
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 transition-transform duration-200", productsOpen && "rotate-180")}
                  />
                </button>
                {productsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProductsOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 z-50 w-80 max-h-[min(26rem,70vh)] overflow-y-auto rounded-lg bg-white text-ink shadow-elevated ring-1 ring-brand-100 py-2 animate-fade-up scrollbar-thin"
                    >
                      <Link
                        href="/san-pham"
                        role="menuitem"
                        className="block px-4 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50 border-b border-brand-50"
                        onClick={() => setProductsOpen(false)}
                      >
                        Tất cả sản phẩm
                      </Link>
                      {Array.from(byCategory.entries()).map(([cat, items]) => (
                        <div key={cat} className="px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-steel mb-2">
                            {cat}
                          </p>
                          {items.slice(0, 3).map((p) => (
                            <Link
                              key={p.slug}
                              href={`/san-pham/${p.slug}`}
                              role="menuitem"
                              className="block py-1.5 text-sm text-ink-muted hover:text-brand-700 line-clamp-1 transition-colors"
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

            <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
              {phone && (
                <a
                  href={telLink(phone)}
                  onClick={() => trackContactClick({ method: "phone", location: "header_desktop" })}
                  className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap min-h-10 px-3.5 py-2 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-600 rounded-md border border-brand-600/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
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
                  onClick={() => trackContactClick({ method: "zalo", location: "header_desktop" })}
                  className="hidden lg:flex items-center gap-1.5 shrink-0 whitespace-nowrap min-h-10 px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/8 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                  title="Chat Zalo"
                  aria-label="Chat Zalo"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-zalo-light" />
                  Zalo
                </a>
              )}
              <Button
                href="/bang-gia"
                size="sm"
                variant="accent"
                className="hidden sm:inline-flex shrink-0 whitespace-nowrap"
              >
                Báo giá
              </Button>
              <button
                type="button"
                className="lg:hidden touch-target flex items-center justify-center rounded-md text-white hover:bg-white/10 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Đóng menu" : "Mở menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-brand-700/60 bg-brand-900 overflow-hidden transition-[max-height,opacity] duration-300 blueprint-bg-dark modal-scroll mobile-nav-drawer",
          open ? "max-h-[min(32rem,85vh)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-4 flex flex-col gap-0.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 flex items-center px-4 py-3 text-sm font-medium text-brand-100 hover:text-white hover:bg-white/8 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className="flex min-h-11 items-center justify-between px-4 py-3 text-sm font-medium text-brand-100 hover:text-white hover:bg-white/8 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            aria-expanded={mobileProductsOpen}
          >
            Sản phẩm
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-200", mobileProductsOpen && "rotate-180")}
            />
          </button>
          {mobileProductsOpen && (
            <div className="pl-4 pb-2 space-y-0.5 border-l border-brand-700/60 ml-4">
              <Link
                href="/san-pham"
                className="flex min-h-10 items-center px-4 py-2 text-sm text-brand-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 rounded-md"
                onClick={() => setOpen(false)}
              >
                Tất cả sản phẩm
              </Link>
              {products.slice(0, 8).map((p) => (
                <Link
                  key={p.slug}
                  href={`/san-pham/${p.slug}`}
                  className="flex min-h-10 items-center px-4 py-2 text-sm text-brand-200 hover:text-white line-clamp-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 rounded-md"
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
              onClick={() => trackContactClick({ method: "phone", location: "header_mobile" })}
              className="mt-3 flex min-h-11 items-center justify-center gap-2 px-4 py-3 rounded-md bg-brand-700 text-white font-medium border border-brand-600/40"
            >
              <Phone className="h-4 w-4" />
              Gọi {phone}
            </a>
          )}
          <Button href="/bang-gia" variant="accent" className="mt-2 w-full">
            Yêu cầu báo giá
          </Button>
        </Container>
      </div>
    </header>
  );
}
