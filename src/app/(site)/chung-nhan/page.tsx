import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { Button } from "@/components/ui/Button";
import { getProducts, getSiteConfig } from "@/lib/content";
import { TCVN_STANDARDS, collectCertificationDocuments } from "@/lib/catalog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Chứng nhận & TCVN — ${site.shortName}`,
    description:
      `Hồ sơ chứng nhận, tiêu chuẩn TCVN và bản vẽ kỹ thuật sản phẩm bê tông từ nhà máy ${site.shortName}.`,
    path: "/chung-nhan",
    siteName: site.shortName,
  });
}

export default async function CertificationsPage() {
  const [site, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const certs = collectCertificationDocuments(products);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Chứng nhận", path: "/chung-nhan" },
        ])}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Chứng nhận" },
        ]}
        title="Chứng nhận & tiêu chuẩn TCVN"
        subtitle={`${site.shortName} sản xuất và nghiệm thu theo tiêu chuẩn Việt Nam — cung cấp hồ sơ theo yêu cầu dự án`}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <h2 className="font-display text-2xl text-brand-900">Tiêu chuẩn áp dụng</h2>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Các tiêu chuẩn kỹ thuật chính cho dòng sản phẩm sản xuất tại nhà máy Châu Thành.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {TCVN_STANDARDS.map((std) => (
              <article
                key={std.code}
                className="p-5 rounded-xl bg-brand-50 border border-brand-100"
              >
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-900">{std.code}</p>
                    <p className="mt-1 text-sm text-ink-muted">{std.name}</p>
                    <p className="mt-2 text-xs text-steel">
                      Sản phẩm: {std.products.join(", ")}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {certs.length > 0 && (
        <section className="py-16 lg:py-20 bg-brand-50/60 border-y border-brand-100">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-2xl text-brand-900">Hồ sơ chứng nhận</h2>
                <p className="mt-2 text-ink-muted">
                  Một số giấy chứng nhận và catalog theo từng dòng sản phẩm.
                </p>
              </div>
              <Link
                href="/tai-lieu"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                Xem tất cả tài liệu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((doc) => (
                <article
                  key={`${doc.productSlug}-${doc.url}`}
                  className="overflow-hidden card-base"
                >
                  <div className="relative aspect-[4/3] bg-brand-100">
                    <Image
                      src={doc.url}
                      alt={doc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-brand-600 uppercase tracking-wide">
                      {doc.productName}
                    </p>
                    <h3 className="mt-1 font-medium text-brand-900">{doc.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
                      >
                        Xem file
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <Link
                        href={`/san-pham/${doc.productSlug}`}
                        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-brand-800"
                      >
                        Chi tiết SP
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-12 lg:py-16">
        <Container className="text-center max-w-xl">
          <p className="text-ink-muted">
            Cần bản vẽ, bảng thông số hoặc hồ sơ nghiệm thu cho dự án cụ thể?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/bang-gia">Yêu cầu báo giá</Button>
            <Button href="/lien-he" variant="secondary">
              Liên hệ kỹ thuật
            </Button>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
