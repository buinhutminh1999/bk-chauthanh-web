"use client";

import { useEffect, useState } from "react";
import { Award, Factory, Truck, Headphones, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SalesContactsList } from "@/components/shared/SalesContactsList";
import { TRUST_ITEMS } from "@/lib/site-constants";
import { cn } from "@/lib/utils";

const ICONS = [Award, Factory, Truck, Headphones];

type TrustItem = (typeof TRUST_ITEMS)[number];

export function TrustStrip() {
  const [active, setActive] = useState<TrustItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <section className="border-y border-brand-100 bg-white">
        <Container className="py-8 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {TRUST_ITEMS.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item)}
                  className={cn(
                    "flex gap-4 items-start text-left rounded-xl p-3 -m-3",
                    "transition-colors hover:bg-brand-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                  )}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">{item.desc}</p>
                    <p className="mt-2 text-xs font-medium text-brand-600">Xem chi tiết →</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trust-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            aria-label="Đóng"
            onClick={() => setActive(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-brand-100 animate-fade-up max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-brand-100 bg-white px-6 py-5 rounded-t-2xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  Thông tin
                </p>
                <h2 id="trust-dialog-title" className="mt-1 font-display text-2xl text-brand-900">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="touch-target shrink-0 flex items-center justify-center rounded-lg text-ink-muted hover:bg-brand-50 hover:text-brand-800"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-ink-muted leading-relaxed">{active.details.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {active.details.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm text-ink leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {"contacts" in active.details && active.details.contacts && (
                <SalesContactsList
                  contacts={[...active.details.contacts]}
                  title="Liên hệ tư vấn kỹ thuật"
                  compact
                  embedded
                  className="mt-6 border-t border-brand-100 pt-5"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
