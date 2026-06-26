import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { CTABanner } from "@/components/shared/CTABanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteConfig, getPosts } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Tin tức — ${site.shortName}`,
    description: `Tin tức công ty, dự án và sản phẩm từ ${site.shortName}.`,
    path: "/tin-tuc",
    siteName: site.shortName,
  });
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Tin tức", path: "/tin-tuc" },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức" },
        ]}
        title="Tin tức công ty"
        subtitle="Cập nhật dự án, sản phẩm và hoạt động từ nhà máy Châu Thành"
      />
      <Section>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Chưa có bài viết"
              description="Tin tức công ty sẽ được cập nhật tại đây."
            />
          )}
      </Section>
      <CTABanner />
    </>
  );
}
