import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { FacebookSection } from "@/components/home/FacebookSection";
import { ContactDetails, ContactMap } from "@/components/home/MapContactSection";
import { QuoteFormCompact } from "@/components/shared/QuoteFormCompact";
import { getProducts, getPosts, getProjects } from "@/lib/content";
import type { SiteConfig } from "@/types/content";

export async function HomeBelowFold({ site }: { site: SiteConfig }) {
  const [products, posts, projects] = await Promise.all([
    getProducts(),
    getPosts(),
    getProjects(),
  ]);
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="py-12 bg-white border-b border-brand-100 blueprint-bg">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {site.stats.map((stat) => (
              <div key={stat.label} className="text-center px-2">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-brand-800 tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CategoryShowcase products={products} />
      <ProcessSection />
      <CertificationsSection />

      <Section className="bg-brand-50/60 border-y border-brand-100/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="Sản phẩm"
            title="Sản phẩm nổi bật"
            description="Các dòng sản phẩm chủ lực từ nhà máy Châu Thành"
          />
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 shrink-0"
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
      </Section>

      {featuredProjects.length > 0 && (
        <Section className="bg-white border-y border-brand-100/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow="Công trình"
              title="Dự án tiêu biểu"
              description="Một số công trình đã cung cấp vật liệu từ nhà máy Châu Thành"
            />
            <Link
              href="/cong-trinh"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 shrink-0"
            >
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      )}

      {latestPosts.length > 0 && (
        <Section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow="Tin tức"
              title="Cập nhật mới nhất"
              description={`Tin tức và hoạt động từ ${site.shortName}`}
            />
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 shrink-0"
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
        </Section>
      )}

      {site.social?.facebook && <FacebookSection facebookUrl={site.social.facebook} />}

      <Section className="bg-white border-t border-brand-100">
        <SectionHeader
          eyebrow="Liên hệ"
          title="Đến nhà máy hoặc gửi yêu cầu báo giá"
          className="mb-10"
        />
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
      </Section>

      <CTABanner />
    </>
  );
}
