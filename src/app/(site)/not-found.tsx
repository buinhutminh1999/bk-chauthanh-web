import Link from "next/link";
import { ArrowRight, Home, Package, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/lib/content";
import { sortProductsByPriority } from "@/lib/site-constants";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false, follow: true },
};

export default async function SiteNotFound() {
  const products = sortProductsByPriority(await getProducts()).slice(0, 4);

  return (
    <>
      <section className="py-20 lg:py-28">
        <Container className="max-w-2xl text-center">
          <p className="section-eyebrow justify-center mb-4">404</p>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-900">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Đường dẫn có thể đã thay đổi hoặc không còn tồn tại. Bạn có thể quay về
            trang chủ hoặc xem sản phẩm bên dưới.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg">
              <Home className="h-4 w-4" />
              Trang chủ
            </Button>
            <Button href="/lien-he" variant="secondary" size="lg">
              <Phone className="h-4 w-4" />
              Liên hệ báo giá
            </Button>
          </div>
        </Container>
      </section>

      {products.length > 0 && (
        <section className="pb-20 lg:pb-28 border-t border-brand-100 bg-brand-50/50">
          <Container>
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="font-display text-xl text-brand-900">Sản phẩm phổ biến</h2>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/san-pham/${product.slug}`}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-brand-100 hover:border-brand-300 hover:shadow-sm transition-all"
                  >
                    <Package className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" />
                    <span>
                      <span className="font-medium text-brand-900 block">{product.name}</span>
                      <span className="text-sm text-ink-muted line-clamp-2">
                        {product.shortDescription}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
