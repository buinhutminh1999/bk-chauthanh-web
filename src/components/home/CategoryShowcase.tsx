import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types/content";
import { PRODUCT_LINE_FILTERS, sortProductsByPriority } from "@/lib/site-constants";

const LINE_DESC: Record<string, string> = {
  "coc-van-be-tong-du-ung-luc": "Cọc ván tiết diện hình chữ I dự ứng lực",
  "coc-be-tong-ly-tam-du-ung-luc": "Cọc tròn ly tâm theo TCVN 7888:2014",
  "ong-cong-be-tong-ly-tam": "Ống cống ly tâm đường kính 200–3600mm",
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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-brand-50/80 to-surface">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Danh mục
          </p>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl text-brand-900">
            Sản phẩm sản xuất tại Châu Thành
          </h2>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Vật liệu xây dựng phục vụ hạ tầng, giao thông và công trình dân dụng tại An Giang và
            Miền Tây.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((product) => {
            const image = product.images[0];
            const line = PRODUCT_LINE_FILTERS.find((item) => item.slug === product.slug);
            const title = line?.label ?? product.name;
            const desc = LINE_DESC[product.slug] ?? product.shortDescription;
            return (
              <Link
                key={product.slug}
                href={`/san-pham/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-brand-900 aspect-[16/10] ring-1 ring-brand-800/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider line-clamp-2">
                    {title}
                  </p>
                  <p className="mt-1 text-white/90 text-sm line-clamp-2">{desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-700 text-white font-medium hover:bg-brand-800 transition-colors shadow-md"
          >
            Xem toàn bộ danh mục
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
