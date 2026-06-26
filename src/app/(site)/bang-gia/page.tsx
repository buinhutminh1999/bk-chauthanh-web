import { Phone, MessageCircle, Clock, FileText, Truck, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuoteFormCompact } from "@/components/shared/QuoteFormCompact";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { getSiteConfig } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { telLink, zaloLink } from "@/lib/site-constants";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Báo giá vật liệu xây dựng — ${site.shortName}`,
    description:
      `Yêu cầu báo giá cống bê tông ly tâm, cọc dự ứng lực, gạch bê tông, bê tông nhựa và UHPC từ nhà máy ${site.shortName}, An Giang. Phản hồi nhanh trong giờ làm việc.`,
    path: "/bang-gia",
    siteName: site.shortName,
  });
}

const STEPS = [
  {
    icon: FileText,
    title: "Gửi yêu cầu",
    desc: "Cho biết sản phẩm, quy cách, số lượng và địa điểm công trình.",
  },
  {
    icon: Clock,
    title: "Tư vấn & báo giá",
    desc: "Bộ phận kinh doanh liên hệ trong giờ làm việc (thường trong ngày).",
  },
  {
    icon: Truck,
    title: "Giao hàng",
    desc: "Lên kế hoạch sản xuất và giao tại công trình theo tiến độ dự án.",
  },
];

export default async function QuoteLandingPage() {
  const site = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Báo giá", path: "/bang-gia" },
        ])}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Báo giá" },
        ]}
        title="Yêu cầu báo giá"
        subtitle="Giá phụ thuộc quy cách, số lượng và địa điểm giao — gửi thông tin để nhận báo giá chính xác"
      />

      <section className="py-12 lg:py-16 bg-brand-50/40 border-b border-brand-100">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-8">
              <div>
                <p className="section-eyebrow mb-3">Quy trình</p>
                <h2 className="font-display text-2xl text-brand-900">Báo giá trong 3 bước</h2>
                <ol className="mt-6 space-y-5">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-900">{step.title}</p>
                        <p className="mt-1 text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-6 rounded-xl bg-white border border-brand-100">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-900">Cam kết minh bạch</p>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                      Báo giá theo quy cách thực tế, có hồ sơ kỹ thuật và tiêu chuẩn TCVN khi cần.
                      Không áp dụng giá cố định trên web — mỗi dự án được tư vấn riêng.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {site.phone && (
                  <>
                    <Button href={telLink(site.phone)} variant="secondary">
                      <Phone className="h-4 w-4" />
                      {site.phone}
                    </Button>
                    <Button href={zaloLink(site.phone)} variant="secondary">
                      <MessageCircle className="h-4 w-4" />
                      Chat Zalo
                    </Button>
                  </>
                )}
                <Button href="/san-pham" variant="ghost">
                  Xem bảng sản phẩm
                </Button>
              </div>
            </div>

            <QuoteFormCompact phone={site.phone} formId="quote_bang_gia" className="lg:sticky lg:top-24" />
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
