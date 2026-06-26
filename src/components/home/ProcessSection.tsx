import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { HeroImage } from "@/components/ui/HeroImage";

const PROCESS_POINTS = [
  "Kiểm soát nguyên liệu đầu vào",
  "Sản xuất theo quy cách dự án",
  "Chứng nhận và bản vẽ kỹ thuật minh bạch",
  "Giao hàng và hỗ trợ tại công trình",
];

export function ProcessSection() {
  return (
    <Section className="overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-brand-200 shadow-elevated">
          <HeroImage
            alt="Quy trình sản xuất tại nhà máy Bê tông Châu Thành"
          />
          <div className="absolute inset-0 bg-brand-900/25" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-brand-900/90 to-transparent">
            <p className="text-accent text-xs font-bold uppercase tracking-widest">Nhà máy Châu Thành</p>
            <p className="mt-1 text-white text-sm font-medium">Dây chuyền ly tâm hiện đại</p>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="Nhà máy"
            title="Sản xuất công nghiệp — Kiểm soát chất lượng"
            description="Nhà máy bê tông Châu Thành trang bị dây chuyền ly tâm, quy trình kiểm định định kỳ và đội ngũ kỹ thuật giàu kinh nghiệm. Sản phẩm đạt tiêu chuẩn TCVN, phục vụ các dự án hạ tầng và xây dựng tại khu vực."
          />
          <ul className="mt-8 space-y-3">
            {PROCESS_POINTS.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-brand-700 text-accent text-xs font-bold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/gioi-thieu">Về nhà máy</Button>
            <Button href="/lien-he" variant="secondary">
              Yêu cầu báo giá
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
