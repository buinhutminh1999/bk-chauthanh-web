"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function facebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

function zaloShareUrl(url: string) {
  return `https://button-share.zalo.me/share.html?url=${encodeURIComponent(url)}`;
}

export function ShareButtons({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted mr-1">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Chia sẻ
      </span>
      <a
        href={facebookShareUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-200 bg-white px-3.5 text-sm font-medium text-brand-800 hover:border-brand-400 hover:bg-brand-50 transition-colors"
        aria-label={`Chia sẻ "${title}" lên Facebook`}
      >
        Facebook
      </a>
      <a
        href={zaloShareUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zalo/30 bg-zalo/10 px-3.5 text-sm font-medium text-zalo hover:bg-zalo/15 transition-colors"
        aria-label={`Chia sẻ "${title}" qua Zalo`}
      >
        Zalo
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-brand-200 bg-white px-3.5 text-sm font-medium text-brand-800 hover:border-brand-400 hover:bg-brand-50 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Đã copy
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" aria-hidden="true" />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
