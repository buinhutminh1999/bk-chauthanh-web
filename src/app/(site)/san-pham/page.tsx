import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { CTABanner } from "@/components/shared/CTABanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { getSiteConfig, getProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

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
  const products = await getProducts();

  return (
    <>
      <PageHeader
        breadcrumb="Sản phẩm"
        title="Sản phẩm sản xuất"
        subtitle="Vật liệu xây dựng chất lượng từ nhà máy Bách Khoa Châu Thành"
      />
      <section className="py-16 lg:py-20">
        <Container>
          {products.length > 0 ? (
            <ProductCatalog products={products} />
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
