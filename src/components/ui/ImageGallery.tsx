"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, go]);

  if (!images.length) {
    return (
      <div className={cn("aspect-[4/3] rounded-2xl bg-brand-100 flex items-center justify-center text-brand-400", className)}>
        Không có ảnh
      </div>
    );
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-100 group ring-1 ring-brand-100"
        >
          <Image
            src={images[active]}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-3.5 w-3.5" />
            Phóng to
          </span>
        </button>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative shrink-0 w-20 h-16 rounded-lg overflow-hidden ring-2 transition-all",
                  i === active ? "ring-brand-600 scale-105" : "ring-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
            aria-label="Đóng"
          >
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Trước"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Sau"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-4 text-white/70 text-sm">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
