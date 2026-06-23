"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/content";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (!items.length) {
    return <p className="text-ink-muted">Chưa có câu hỏi.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-brand-100 bg-white overflow-hidden"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-brand-50/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500"
            >
              <span className="font-medium text-brand-900">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-sm text-ink-muted leading-relaxed border-t border-brand-50 pt-3">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
