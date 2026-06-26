import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CTABanner() {
  return (
    <Section size="sm" className="blueprint-bg">
      <div className="relative overflow-hidden rounded-xl bg-brand-900 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 text-center grain-overlay blueprint-bg-dark border border-brand-700/40 shadow-elevated">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-accent to-brand-600" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <p className="section-eyebrow section-eyebrow-light justify-center mb-4 relative">
          Hỗ trợ dự án
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white relative max-w-2xl mx-auto leading-tight">
          Cần tư vấn sản phẩm hoặc báo giá?
        </h2>
        <p className="mt-4 text-brand-100 max-w-xl mx-auto relative leading-relaxed">
          Liên hệ bộ phận kinh doanh để được hỗ trợ kỹ thuật và báo giá nhanh
          cho dự án của bạn.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4 relative">
          <Button href="/bang-gia" variant="accent" size="lg">
            Liên hệ ngay
          </Button>
          <Button href="/san-pham" variant="outline-light" size="lg">
            Xem sản phẩm
          </Button>
        </div>
      </div>
    </Section>
  );
}
