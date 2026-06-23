import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { ProductContentTabs } from "@/components/products/ProductContentTabs";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductQuoteBox } from "@/components/products/ProductQuoteBox";
import { ProductDocuments } from "@/components/products/ProductDocuments";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { getProductBySlug, getProducts, getSiteConfig } from "@/lib/content";
import {
  splitMarkdownSections,
  groupSectionsForTabs,
} from "@/lib/markdown";
import { buildMetadata, productJsonLd, faqJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — Bách Khoa Châu Thành`,
    description: product.shortDescription,
    path: `/san-pham/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const site = await getSiteConfig();
  const allProducts = await getProducts();
  const sections = splitMarkdownSections(product.description);
  const tabs = groupSectionsForTabs(sections);
  const hasTabs = tabs.length > 0;

  const faqItems = product.specs
    ? Object.entries(product.specs).map(([question, answer]) => ({
        question: `${product.name} — ${question}?`,
        answer: `${answer}`,
      }))
    : [];

  const faqData = faqJsonLd(faqItems);

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: product.shortDescription,
          slug: product.slug,
          images: product.images,
        })}
      />
      {faqData && <JsonLd data={faqData} />}

      <section className="py-8 lg:py-12">
        <Container>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả sản phẩm
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <ImageGallery images={product.images} alt={product.name} />

            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl text-brand-900">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-ink-muted leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="p-6 rounded-xl bg-brand-50 border border-brand-100">
                  <h2 className="font-semibold text-brand-900 mb-4">Thông số nổi bật</h2>
                  <ul className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key} className="flex gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-ink">{key}:</strong>{" "}
                          <span className="text-ink-muted">{value}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.documents && product.documents.length > 0 && (
                <ProductDocuments documents={product.documents} />
              )}

              <ProductQuoteBox phone={site.phone} productName={product.name} />
            </div>
          </div>

          <div className="mt-16">
            {hasTabs ? (
              <ProductContentTabs tabs={tabs} />
            ) : (
              <div className="prose-content max-w-none">
                <MarkdownContent content={product.description} />
              </div>
            )}
          </div>

          <RelatedProducts
            products={allProducts}
            currentSlug={product.slug}
            category={product.category}
          />
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
