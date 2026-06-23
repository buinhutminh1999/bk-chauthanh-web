"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { telLink, zaloLink } from "@/lib/site-constants";

export function StickyMobileCTA({ phone }: { phone: string }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-brand-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)] safe-area-pb"
      role="navigation"
      aria-label="Liên hệ nhanh"
    >
      <div className="grid grid-cols-3 divide-x divide-brand-100">
        <a
          href={telLink(phone)}
          aria-label={`Gọi điện ${phone}`}
          className="flex min-h-[52px] flex-col items-center justify-center gap-1 py-2.5 text-brand-800 hover:bg-brand-50 transition-colors"
        >
          <Phone className="h-5 w-5 text-brand-600" />
          <span className="text-xs font-medium">Gọi ngay</span>
        </a>
        <a
          href={zaloLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="flex min-h-[52px] flex-col items-center justify-center gap-1 py-2.5 text-brand-800 hover:bg-brand-50 transition-colors"
        >
          <MessageCircle className="h-5 w-5 text-zalo" />
          <span className="text-xs font-medium">Zalo</span>
        </a>
        <a
          href="/lien-he"
          aria-label="Yêu cầu báo giá"
          className="flex min-h-[52px] flex-col items-center justify-center gap-1 py-2.5 bg-brand-700 text-white hover:bg-brand-800 transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs font-medium">Báo giá</span>
        </a>
      </div>
    </div>
  );
}
