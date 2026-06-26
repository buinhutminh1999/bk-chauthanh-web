import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Award, FileCheck, Shield } from "lucide-react";

const CERTS = [
  {
    icon: Award,
    title: "Tiêu chuẩn TCVN",
    desc: "Sản phẩm sản xuất và nghiệm thu theo các tiêu chuẩn Việt Nam về cống, cọc, gạch và bê tông.",
  },
  {
    icon: FileCheck,
    title: "Bản vẽ & thông số",
    desc: "Cung cấp bản vẽ điển hình, bảng thông số kỹ thuật và hồ sơ theo yêu cầu dự án.",
  },
  {
    icon: Shield,
    title: "An toàn lao động",
    desc: "Cam kết môi trường làm việc an toàn, đào tạo PCCC và quy trình sản xuất minh bạch.",
  },
];

export function CertificationsSection() {
  return (
    <Section className="grain-overlay blueprint-bg-dark text-white relative overflow-hidden border-y border-brand-700/40">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="relative">
        <SectionHeader
          eyebrow="Cam kết"
          title="Chất lượng & uy tín sản xuất"
          description="Bê tông Châu Thành đặt chất lượng sản phẩm và an toàn lao động làm nền tảng phát triển dài hạn."
          light
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 hover:border-accent/20 transition-colors"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/25 mb-5">
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-brand-100 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/chung-nhan" variant="outline-light">
            Xem chứng nhận TCVN
          </Button>
          <Button href="/tai-lieu" variant="ghost" className="text-brand-100 border border-white/20 hover:bg-white/10">
            Tài liệu kỹ thuật
          </Button>
        </div>
      </div>
    </Section>
  );
}
