import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { CTABanner } from "@/components/shared/CTABanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteConfig, getProducts } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Sản phẩm — ${site.shortName}`,
    description:
      "Cống bê tông ly tâm, cọc bê tông dự ứng lực, gạch bê tông, gạch vỉa hè, bê tông nhựa nóng, UHPC.",
    path: "/san-pham",
  });
}

export default async function ProductsPage() {
  const [site, products] = await Promise.all([getSiteConfig(), getProducts()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Sản phẩm", path: "/san-pham" },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm" },
        ]}
        title="Sản phẩm sản xuất"
        subtitle={`Vật liệu xây dựng chất lượng từ nhà máy ${site.shortName}`}
      />
      <section className="py-16 lg:py-20">
        <Container>
          {products.length > 0 ? (
            <Suspense
              fallback={
                <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-80 rounded-xl bg-brand-50 animate-pulse" />
                  ))}
                </div>
              }
            >
              <ProductCatalog products={products} />
            </Suspense>
          ) : (
            <EmptyState
              title="Chưa có sản phẩm"
              description="Quản trị viên có thể thêm sản phẩm tại trang Admin."
            />
          )}
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
