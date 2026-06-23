import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { JsonLd } from "@/components/shared/JsonLd";
import { getPostBySlug, getPosts } from "@/lib/content";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} — Bách Khoa Châu Thành`,
    description: post.excerpt,
    path: `/tin-tuc/${post.slug}`,
    image: post.coverImage,
    type: "article",
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <article>
        {post.coverImage && (
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
          </div>
        )}

        <Container size="narrow" className="py-12 lg:py-16">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả tin tức
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-brand-50 text-brand-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl lg:text-4xl text-brand-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <Calendar className="h-4 w-4" />
            {formatDate(post.createdAt, "dd/MM/yyyy")}
          </div>

          <div className="mt-10">
            <MarkdownContent content={post.content} />
          </div>

          {post.images && post.images.length > 1 && (
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {post.images.slice(1).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-brand-100"
                >
                  <Image
                    src={src}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </article>
    </>
  );
}
