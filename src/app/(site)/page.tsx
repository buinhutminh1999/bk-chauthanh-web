import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { PostCard } from "@/components/blog/PostCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { FacebookSection } from "@/components/home/FacebookSection";
import { ContactDetails, ContactMap } from "@/components/home/MapContactSection";
import { QuoteFormCompact } from "@/components/shared/QuoteFormCompact";
import { getSiteConfig, getProducts, getPosts } from "@/lib/content";
import { telLink, zaloLink } from "@/lib/site-constants";

export default async function HomePage() {
  const site = await getSiteConfig();
  const products = await getProducts();
  const posts = await getPosts();
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden grain-overlay min-h-[520px] lg:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-nha-may.jpg"
            alt="Nhà máy sản xuất Bách Khoa Châu Thành"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/50" />
        </div>
        <Container className="relative py-20 lg:py-28">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">
              {site.shortName}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl lg:text-6xl text-white leading-[1.1]">
              {site.tagline}
            </h1>
            <p className="mt-6 text-lg text-brand-100 leading-relaxed max-w-xl">
              Sản xuất cống bê tông ly tâm, cọc bê tông dự ứng lực, gạch bê tông, gạch vỉa hè và
              bê tông siêu tính năng UHPC tại Châu Thành, An Giang.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/san-pham" size="lg" variant="accent">
                Khám phá sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="/lien-he"
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white border-white/25 hover:bg-white/20"
              >
                Yêu cầu báo giá
              </Button>
              {site.phone && (
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto pt-1 sm:pt-0">
                  <a
                    href={telLink(site.phone)}
                    className="inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium bg-brand-700 text-white hover:bg-brand-600 transition-colors sm:px-6"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="truncate">{site.phone}</span>
                  </a>
                  <a
                    href={zaloLink(site.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium bg-zalo text-white hover:bg-zalo-hover transition-colors sm:px-6"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Zalo
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />

      <section className="py-12 bg-white border-b border-brand-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {site.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-brand-800">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CategoryShowcase products={products} />
      <ProcessSection />
      <CertificationsSection />

      <section className="py-16 lg:py-20 bg-brand-50/50">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl text-brand-900">Sản phẩm nổi bật</h2>
              <p className="mt-2 text-ink-muted">Các dòng sản phẩm chủ lực từ nhà máy Châu Thành</p>
            </div>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {latestPosts.length > 0 && (
        <section className="py-16 lg:py-20">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="font-display text-3xl text-brand-900">Tin tức</h2>
                <p className="mt-2 text-ink-muted">Cập nhật từ Bách Khoa Châu Thành</p>
              </div>
              <Link
                href="/tin-tuc"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {site.social?.facebook && <FacebookSection facebookUrl={site.social.facebook} />}

      <section className="py-16 lg:py-20 bg-white border-t border-brand-100">
        <Container>
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Liên hệ
            </p>
            <h2 className="mt-2 font-display text-3xl text-brand-900">
              Đến nhà máy hoặc gửi yêu cầu báo giá
            </h2>
          </div>
          <div className="grid min-w-0 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch lg:min-h-[500px]">
            <div className="min-w-0 max-w-full lg:col-span-4">
              <ContactDetails
                address={site.address}
                phone={site.phone}
                email={site.email}
                companyName={site.companyName}
                salesContacts={site.salesContacts}
              />
            </div>
            <div className="min-w-0 max-w-full lg:col-span-5">
              <ContactMap address={site.address} className="h-full" />
            </div>
            <div className="min-w-0 max-w-full lg:col-span-3">
              <QuoteFormCompact phone={site.phone} className="h-full" />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
