"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

type Tab = { id: string; label: string; sections: { title: string; body: string }[] };

export function ProductContentTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "intro");

  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const panelId = `product-tabpanel-${active}`;

  return (
    <div>
      <div className="scroll-hint-x">
        <div
          className="flex min-w-0 max-w-full gap-2 border-b border-brand-100 pb-1 mb-8 overflow-x-auto overscroll-x-contain scrollbar-thin snap-x sm:flex-wrap sm:overflow-visible sm:snap-none"
          role="tablist"
          aria-label="Nội dung sản phẩm"
        >
          {tabs.map((tab) => {
            const tabId = `product-tab-${tab.id}`;
            return (
              <button
                key={tab.id}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                aria-controls={panelId}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "shrink-0 snap-start min-h-11 px-3 sm:px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500",
                  active === tab.id
                    ? "border-brand-600 text-brand-800 bg-brand-50/80"
                    : "border-transparent text-ink-muted hover:text-brand-700 hover:bg-brand-50/50",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div
        id={panelId}
        className="prose-content max-w-none"
        role="tabpanel"
        aria-labelledby={`product-tab-${active}`}
      >
        {current?.sections.map((section) => (
          <div key={section.title} className="mb-8 last:mb-0">
            {section.title &&
              !section.title.toLowerCase().includes(current.label.toLowerCase()) && (
                <h2 className="!mt-0">{section.title}</h2>
              )}
            <MarkdownContent content={section.body} />
          </div>
        ))}
      </div>
    </div>
  );
}
