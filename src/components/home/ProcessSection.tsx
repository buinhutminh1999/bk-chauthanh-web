import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-20 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-brand-100 shadow-xl">
            <Image
              src="/images/hero-nha-may.jpg"
              alt="Quy trình sản xuất tại nhà máy Bách Khoa Châu Thành"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-brand-900/20" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Nhà máy
            </p>
            <h2 className="mt-2 font-display text-3xl text-brand-900">
              Sản xuất công nghiệp — Kiểm soát chất lượng
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Nhà máy bê tông Châu Thành trang bị dây chuyền ly tâm, quy trình kiểm định định kỳ
              và đội ngũ kỹ thuật giàu kinh nghiệm. Sản phẩm đạt tiêu chuẩn TCVN, phục vụ các dự
              án hạ tầng và xây dựng tại khu vực.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-muted">
              {[
                "Kiểm soát nguyên liệu đầu vào",
                "Sản xuất theo quy cách dự án",
                "Chứng nhận và bản vẽ kỹ thuật minh bạch",
                "Giao hàng và hỗ trợ tại công trình",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/gioi-thieu">Về nhà máy</Button>
              <Button href="/lien-he" variant="secondary">Yêu cầu báo giá</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
