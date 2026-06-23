import Image from "next/image";
import Link from "next/link";
import { Factory, Shield, Users, MapPin, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/shared/CTABanner";
import { getSiteConfig, getProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { telLink } from "@/lib/site-constants";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Giới thiệu — ${site.shortName}`,
    description: `Giới thiệu ${site.companyName} — nhà máy sản xuất vật liệu xây dựng tại Châu Thành, An Giang.`,
    path: "/gioi-thieu",
  });
}

export default async function AboutPage() {
  const site = await getSiteConfig();
  const products = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <PageHeader
        breadcrumb="Giới thiệu"
        title={site.companyName}
        subtitle={site.tagline}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-nha-may.jpg"
            alt="Nhà máy Bách Khoa Châu Thành"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-brand-900/75" />
        </div>
        <Container className="relative py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest">
              Nhà máy Châu Thành
            </p>
            <p className="mt-4 text-lg text-brand-100 leading-relaxed">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/san-pham">Xem sản phẩm</Button>
              <Button
                href="/lien-he"
                variant="secondary"
                className="bg-white/10 text-white border-white/25 hover:bg-white/20"
              >
                Liên hệ báo giá
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white border-b border-brand-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {site.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-brand-800">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl text-brand-900">Về nhà máy</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">
                {site.companyName} chuyên sản xuất vật liệu xây dựng phục vụ hạ tầng
                giao thông, thoát nước, công nghiệp và xây dựng dân dụng tại An Giang
                và khu vực Miền Tây.
              </p>
              <p className="mt-4 text-ink-muted leading-relaxed">
                Nhà máy trang bị dây chuyền ly tâm, quy trình kiểm soát chất lượng và
                đội ngũ kỹ thuật giàu kinh nghiệm — đảm bảo sản phẩm đạt tiêu chuẩn
                TCVN và yêu cầu kỹ thuật của từng dự án.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Factory, title: "Sản xuất công nghiệp", desc: "Dây chuyền hiện đại, quy trình chuẩn" },
                { icon: Shield, title: "Chất lượng TCVN", desc: "Kiểm định và hồ sơ minh bạch" },
                { icon: Users, title: "Tư vấn kỹ thuật", desc: "Hỗ trợ chọn quy cách và giải đáp kỹ thuật" },
                { icon: MapPin, title: "Giao tại công trình", desc: "Phục vụ An Giang & Miền Tây" },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-2xl bg-brand-50 border border-brand-100">
                  <item.icon className="h-6 w-6 text-brand-600 mb-3" />
                  <p className="font-semibold text-brand-900">{item.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-brand-50/60">
        <Container>
          <h2 className="font-display text-3xl text-brand-900">Dòng sản phẩm</h2>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Các nhóm sản phẩm chủ lực sản xuất tại nhà máy Châu Thành.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const sample = products.find((p) => p.category === cat);
              return sample ? (
                <Link
                  key={cat}
                  href={`/san-pham/${sample.slug}`}
                  className="px-4 py-2 rounded-full bg-white border border-brand-200 text-sm font-medium text-brand-800 hover:border-brand-400 hover:bg-brand-50 transition-colors"
                >
                  {cat}
                </Link>
              ) : (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full bg-white border border-brand-200 text-sm text-brand-800"
                >
                  {cat}
                </span>
              );
            })}
          </div>
          <Link
            href="/san-pham"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
          >
            Xem tất cả sản phẩm <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {site.parentCompany && (
        <section className="py-16 lg:py-20">
          <Container size="narrow">
            <h2 className="font-display text-2xl text-brand-900">Thuộc hệ thống Bách Khoa</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Công ty là thành viên trong hệ sinh thái{" "}
              <strong className="text-ink">{site.parentCompany}</strong> — tập đoàn có
              kinh nghiệm lâu năm trong xây dựng, đầu tư và sản xuất vật liệu xây dựng
              tại An Giang và Miền Tây.
            </p>
            <a
              href="https://bachkhoaangiang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Tìm hiểu Công ty CP Xây dựng Bách Khoa →
            </a>
          </Container>
        </section>
      )}

      <section className="py-16 lg:py-20 bg-brand-900 text-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl">Liên hệ nhà máy</h2>
              <ul className="mt-6 space-y-4 text-brand-100">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  {site.address}
                </li>
                <li>
                  <a href={telLink(site.phone)} className="hover:text-white font-medium">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl">Cam kết</h2>
              <ul className="mt-6 space-y-2 text-brand-100">
                <li>✓ Chất lượng ổn định, đạt tiêu chuẩn kỹ thuật</li>
                <li>✓ Đáp ứng tiến độ cung ứng cho dự án</li>
                <li>✓ Tư vấn kỹ thuật và hỗ trợ đối tác xây dựng</li>
                <li>✓ Đầu tư máy móc, nâng cao năng lực sản xuất</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Button href="/cong-trinh" variant="secondary" className="bg-white/10 text-white border-white/25">
                  Công trình tiêu biểu
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
