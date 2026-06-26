import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { getProducts, getSiteConfig } from "@/lib/content";
import { collectProductDocuments } from "@/lib/catalog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const TYPE_LABELS = {
  pdf: "PDF",
  drawing: "Bản vẽ",
  catalog: "Catalog",
} as const;

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Tài liệu kỹ thuật — ${site.shortName}`,
    description:
      `Tải bản vẽ, catalog và tài liệu kỹ thuật sản phẩm bê tông — cống ly tâm, cọc dự ứng lực, gạch, bê tông nhựa, UHPC.`,
    path: "/tai-lieu",
    siteName: site.shortName,
  });
}

export default async function DocumentsPage() {
  const [site, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const documents = collectProductDocuments(products);

  const byCategory = new Map<string, typeof documents>();
  for (const doc of documents) {
    const list = byCategory.get(doc.category) ?? [];
    list.push(doc);
    byCategory.set(doc.category, list);
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Tài liệu", path: "/tai-lieu" },
        ])}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tài liệu" },
        ]}
        title="Thư viện tài liệu kỹ thuật"
        subtitle={`Bản vẽ điển hình, catalog và hồ sơ sản phẩm từ ${site.shortName}`}
      />

      <section className="py-16 lg:py-20">
        <Container>
          {documents.length === 0 ? (
            <p className="text-center text-ink-muted">
              Tài liệu đang được cập nhật. Vui lòng{" "}
              <Link href="/lien-he" className="text-brand-700 hover:text-brand-900 font-medium">
                liên hệ
              </Link>{" "}
              để nhận hồ sơ kỹ thuật.
            </p>
          ) : (
            <div className="space-y-12">
              {[...byCategory.entries()].map(([category, docs]) => (
                <div key={category}>
                  <h2 className="font-display text-xl text-brand-900 mb-4">{category}</h2>
                  <ul className="divide-y divide-brand-100 rounded-xl border border-brand-100 bg-white overflow-hidden">
                    {docs.map((doc) => (
                      <li key={`${doc.productSlug}-${doc.url}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5 hover:bg-brand-50/50 transition-colors">
                          <FileText className="h-5 w-5 shrink-0 text-brand-600 hidden sm:block" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-brand-900">{doc.title}</p>
                            <p className="mt-0.5 text-sm text-ink-muted">
                              <Link
                                href={`/san-pham/${doc.productSlug}`}
                                className="hover:text-brand-800"
                              >
                                {doc.productName}
                              </Link>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge>{TYPE_LABELS[doc.type]}</Badge>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-10 items-center gap-1.5 px-3.5 rounded-lg text-sm font-medium text-brand-700 border border-brand-200 hover:bg-brand-50"
                            >
                              Mở
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-ink-muted text-center">
            Cần hồ sơ đầy đủ cho thầu hoặc nghiệm thu?{" "}
            <Link href="/chung-nhan" className="text-brand-700 font-medium hover:text-brand-900">
              Xem chứng nhận TCVN
            </Link>{" "}
            hoặc{" "}
            <Link href="/bang-gia" className="text-brand-700 font-medium hover:text-brand-900">
              gửi yêu cầu báo giá
            </Link>
            .
          </p>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
