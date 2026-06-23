import { Container } from "@/components/ui/Container";
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
    <section className="py-16 lg:py-20 bg-brand-900 text-white grain-overlay relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <Container className="relative">
        <div className="max-w-xl">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest">Cam kết</p>
          <h2 className="mt-2 font-display text-3xl text-white">Chất lượng & uy tín sản xuất</h2>
          <p className="mt-3 text-brand-100 leading-relaxed">
            Bách Khoa Châu Thành đặt chất lượng sản phẩm và an toàn lao động làm nền tảng phát
            triển dài hạn.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <c.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-brand-100 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
