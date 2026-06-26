"use client";

import { useEffect, useState } from "react";
import { Award, Factory, Truck, Headphones, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
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
      <Section size="none" className="border-y border-brand-100 bg-white py-8 lg:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                className={cn(
                  "flex gap-4 items-start text-left rounded-lg p-4 w-full",
                  "transition-[background-color,border-color] hover:bg-brand-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
                  "border border-transparent hover:border-brand-100",
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-accent ring-1 ring-brand-600/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">{item.desc}</p>
                  <p className="mt-2 text-xs font-medium text-brand-600">
                    Xem chi tiết →
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trust-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-900/65 backdrop-blur-sm"
            aria-label="Đóng"
            onClick={() => setActive(null)}
          />
          <Card padding="none" className="relative w-full max-w-lg shadow-elevated animate-fade-up max-h-[85vh] overflow-y-auto modal-scroll">
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-brand-100 bg-white px-6 py-5">
              <div>
                <p className="section-eyebrow mb-2">Thông tin</p>
                <h2 id="trust-dialog-title" className="font-display text-2xl text-brand-900">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="touch-target shrink-0 flex items-center justify-center rounded-md text-ink-muted hover:bg-brand-50 hover:text-brand-800"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-ink-muted leading-relaxed">{active.details.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {active.details.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink leading-relaxed">
                    <span className="mt-2 h-1 w-4 shrink-0 bg-accent rounded-sm" />
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
          </Card>
        </div>
      )}
    </>
  );
}
