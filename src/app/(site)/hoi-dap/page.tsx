import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/Button";
import { getSiteConfig, getFaqs } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Hỏi đáp — ${site.shortName}`,
    description:
      "Câu hỏi thường gặp về sản phẩm, giao hàng, tiêu chuẩn TCVN và liên hệ Bách Khoa Châu Thành.",
    path: "/hoi-dap",
  });
}

export default async function FaqPage() {
  const site = await getSiteConfig();
  const faqs = await getFaqs();
  const faqData = faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      {faqData && <JsonLd data={faqData} />}

      <PageHeader
        breadcrumb="Hỏi đáp"
        title="Câu hỏi thường gặp"
        subtitle="Thông tin về sản phẩm, giao hàng và liên hệ nhà máy"
      />
      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion items={faqs} />
          <div className="mt-12 p-6 rounded-2xl bg-brand-50 border border-brand-100 text-center">
            <p className="font-medium text-brand-900">Chưa tìm thấy câu trả lời?</p>
            <p className="mt-2 text-sm text-ink-muted">
              Gọi {site.phone} hoặc gửi yêu cầu — chúng tôi sẽ phản hồi trong giờ làm việc.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button href="/lien-he">Liên hệ báo giá</Button>
              <Link
                href="/san-pham"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-brand-200 text-sm font-medium text-brand-800 hover:bg-white"
              >
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
