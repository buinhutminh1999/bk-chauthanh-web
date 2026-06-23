import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTABanner() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand-800 px-8 py-12 lg:px-16 lg:py-14 text-center grain-overlay">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="font-display text-2xl sm:text-3xl text-white relative">
            Cần tư vấn sản phẩm hoặc báo giá?
          </h2>
          <p className="mt-3 text-brand-100 max-w-xl mx-auto relative">
            Liên hệ bộ phận kinh doanh để được hỗ trợ kỹ thuật và báo giá nhanh
            cho dự án của bạn.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 relative">
            <Button href="/lien-he" variant="secondary" size="lg">
              Liên hệ ngay
            </Button>
            <Button
              href="/san-pham"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/20"
            >
              Xem sản phẩm
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
