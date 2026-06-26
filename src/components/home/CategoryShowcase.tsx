import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types/content";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";

const LINE_DESC: Record<string, string> = {
  "coc-van-be-tong-du-ung-luc": "Cọc ván tiết diện hình chữ I dự ứng lực",
  "coc-be-tong-ly-tam-du-ung-luc": "Cọc tròn ly tâm theo TCVN 7888:2014",
  "ong-cong-be-tong-ly-tam": "Ống cống ly tâm đường kính 300–3600mm",
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

      <div className="mt-12 grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((product) => {
          const image = product.images[0];
          const line = PRODUCT_LINE_FILTERS.find((item) => item.slug === product.slug);
          const title = line?.label ?? product.name;
          const desc = LINE_DESC[product.slug] ?? product.shortDescription;
          return (
            <Link
              key={product.slug}
              href={`/san-pham/${product.slug}`}
              className="group relative overflow-hidden rounded-lg bg-brand-900 aspect-[16/10] ring-1 ring-brand-700/30 shadow-elevated card-interactive"
            >
              {image && (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-[1.03] transition-[transform,opacity] duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/45 to-brand-900/10" />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-accent/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-accent text-[11px] font-bold uppercase tracking-widest line-clamp-2">
                  {title}
                </p>
                <p className="mt-1.5 text-white/90 text-sm line-clamp-2 leading-relaxed">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-[gap] duration-200 group-hover:gap-2.5">
                  Xem chi tiết <ArrowRight className="h-4 w-4" />
                </span>
              </div>
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
