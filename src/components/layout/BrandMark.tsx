import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SiteBrand } from "@/types/content";

const DEFAULT_BRAND: SiteBrand = {
  prefix: "CÔNG TY CỔ PHẦN SẢN XUẤT",
  name: "BÁCH KHOA",
  locality: "CHÂU THÀNH",
  slogan: "VẬT LIỆU XÂY DỰNG — UY TÍN TỪ SẢN XUẤT",
};

export function BrandMark({
  brand = DEFAULT_BRAND,
  companyName,
  href = "/",
  className,
  showTextFrom = "md",
  layout = "horizontal",
}: {
  brand?: SiteBrand;
  companyName: string;
  href?: string;
  className?: string;
  showTextFrom?: "sm" | "md" | "lg" | "always";
  layout?: "horizontal" | "stacked";
}) {
  const textVisibility = {
    always: "flex",
    sm: "hidden sm:flex",
    md: "hidden md:flex",
    lg: "hidden lg:flex",
  }[showTextFrom];

  const content = (
    <>
      <span className="flex h-11 w-11 lg:h-[3.5rem] lg:w-[3.5rem] shrink-0 items-center justify-center rounded-full bg-white overflow-hidden shadow-sm ring-1 ring-white/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-bach-khoa-icon.png?v=6"
          alt={companyName}
          width={810}
          height={810}
          className="h-[90%] w-[90%] object-contain"
          decoding="async"
        />
      </span>
      <div
        className={cn(
          "flex-col justify-center min-w-0",
          textVisibility,
          layout === "stacked" && "footer-brand",
        )}
      >
        <p className="brand-line-1">{brand.prefix}</p>
        <p className="brand-line-2">
          <span>{brand.name}</span>
          <span className="brand-line-2-locality">{brand.locality}</span>
        </p>
        <p className="brand-line-3">{brand.slogan}</p>
      </div>
    </>
  );

  const layoutClass =
    layout === "stacked"
      ? "brand-mark-stacked flex flex-col items-start gap-3"
      : "flex items-center gap-2.5 lg:gap-3";

  if (href) {
    return (
      <Link
        href={href}
        className={cn(layoutClass, "group shrink-0 min-w-0", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn(layoutClass, "shrink-0 min-w-0", className)}>
      {content}
    </div>
  );
}
