"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { telLink, zaloLink } from "@/lib/site-constants";
import { trackContactClick } from "@/lib/analytics";

export function StickyMobileCTA({ phone }: { phone: string }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-brand-200 bg-white/96 backdrop-blur-lg shadow-[0_-8px_32px_rgb(12_36_32_/_0.12)] safe-area-pb"
      role="navigation"
      aria-label="Liên hệ nhanh"
    >
      <div className="h-0.5 bg-gradient-to-r from-brand-600 via-accent to-brand-600" />
      <div className="grid grid-cols-3">
        <a
          href={telLink(phone)}
          onClick={() => trackContactClick({ method: "phone", location: "sticky_mobile" })}
          className="flex min-h-[54px] flex-col items-center justify-center gap-1 py-2.5 text-brand-800 hover:bg-brand-50 transition-colors border-r border-brand-100"
        >
          <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">Gọi ngay</span>
          <span className="sr-only">{phone}</span>
        </a>
        <a
          href={zaloLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick({ method: "zalo", location: "sticky_mobile" })}
          className="flex min-h-[54px] flex-col items-center justify-center gap-1 py-2.5 text-brand-800 hover:bg-brand-50 transition-colors border-r border-brand-100"
        >
          <MessageCircle className="h-5 w-5 text-zalo" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">Zalo</span>
        </a>
        <a
          href="/bang-gia"
          className="flex min-h-[54px] flex-col items-center justify-center gap-1 py-2.5 bg-brand-700 text-white hover:bg-brand-600 transition-colors"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-wide">Báo giá</span>
        </a>
      </div>
    </div>
  );
}
