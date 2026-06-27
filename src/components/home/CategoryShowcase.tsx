import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProductThumbnail, hasProcessVisual } from "@/components/products/ProductThumbnail";
import type { Product } from "@/types/content";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";
import { cn } from "@/lib/utils";

const LINE_DESC: Record<string, string> = {
  "coc-van-be-tong-du-ung-luc": "Cọc ván tiết diện hình chữ I dự ứng lực",
  "coc-be-tong-ly-tam-du-ung-luc": "Cọc tròn ly tâm theo TCVN 7888:2014",
  "ong-cong-be-tong-ly-tam": "Ống cống ly tâm đường kính 300–1500mm",
  "coc-vuong-be-tong-du-ung-luc": "Cọc vuông BTCT theo yêu cầu dự án",
  "gach-via-he": "Gạch vỉa hè terrazzo đa màu",
  "gach-be-tong": "Gạch block bê tông không nung",
  "be-tong-nhua-nong": "Bê tông nhựa nóng cấp phối theo dự án",
};

export function CategoryShowcase({ products }: { products: Product[] }) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const items = sortProductsByPriority(
    PRODUCT_LINE_FILTERS.map((line) => bySlug.get(line.slug)).filter(Boolean) as Product[],
  );

  return (
    <Section className="blueprint-bg border-y border-brand-100/80">
      <SectionHeader
        eyebrow="Danh mục"
        title="Sản phẩm sản xuất tại Châu Thành"
        description="Vật liệu xây dựng phục vụ hạ tầng, giao thông và công trình dân dụng tại An Giang và Miền Tây."
      />

      <div className="mt-12 grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
        {items.map((product) => {
          const image = product.images[0];
          const usesProcess = hasProcessVisual(product.slug);
          const line = PRODUCT_LINE_FILTERS.find((item) => item.slug === product.slug);
          const title = line?.label ?? product.name;
          const desc = LINE_DESC[product.slug] ?? product.shortDescription;

          return (
            <Link
              key={product.slug}
              href={`/san-pham/${product.slug}`}
              className={cn(
                "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-lg",
                "ring-1 ring-brand-700/30 shadow-elevated card-interactive",
                usesProcess ? "bg-white" : "aspect-[16/10] bg-brand-900",
              )}
            >
              <div
                className={cn(
                  usesProcess
                    ? "flex min-h-[13.5rem] flex-1 flex-col p-2 sm:min-h-[14.5rem] sm:p-2.5"
                    : "relative min-h-0 flex-1",
                )}
              >
                {usesProcess ? (
                  <ProductThumbnail
                    slug={product.slug}
                    image={image}
                    alt={title}
                    size="card"
                    className="h-full"
                  />
                ) : (
                  image && (
                    <ProductThumbnail
                      slug={product.slug}
                      image={image}
                      alt={title}
                      imageClassName="opacity-70 group-hover:opacity-85 group-hover:scale-[1.03] transition-[transform,opacity] duration-500"
                      className="absolute inset-0"
                    />
                  )
                )}
                {!usesProcess && (
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/45 to-brand-900/10" />
                )}
              </div>

              <div
                className={cn(
                  "mt-auto flex min-h-[8.25rem] shrink-0 flex-col p-4 sm:p-5",
                  usesProcess
                    ? "bg-brand-900 border-t border-brand-800"
                    : "absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900 via-brand-900/95 to-brand-900/40",
                )}
              >
                <div className="flex-1">
                  <p className="text-accent text-[11px] font-bold uppercase tracking-widest line-clamp-2 min-h-[2.5rem]">
                    {title}
                  </p>
                  <p className="mt-1.5 min-h-[2.75rem] text-sm leading-relaxed text-white/90 line-clamp-2">
                    {desc}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-[gap] duration-200 group-hover:gap-2.5">
                  Xem chi tiết <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              <div className="absolute top-0 left-0 w-full h-0.5 bg-accent/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Button href="/san-pham" size="lg">
          Xem toàn bộ danh mục
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
