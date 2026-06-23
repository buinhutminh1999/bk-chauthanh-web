import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { getSiteConfig, getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Tin tức — ${site.shortName}`,
    description: "Tin tức công ty, dự án và sản phẩm từ Bách Khoa Châu Thành.",
    path: "/tin-tuc",
  });
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        breadcrumb="Tin tức"
        title="Tin tức công ty"
        subtitle="Cập nhật dự án, sản phẩm và hoạt động từ nhà máy Châu Thành"
      />
      <section className="py-16 lg:py-20">
        <Container>
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
        </Container>
      </section>
    </>
  );
}
