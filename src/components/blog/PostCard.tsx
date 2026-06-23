import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Post } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/tin-tuc/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-brand-50 text-brand-400 text-sm">
              Tin tức
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-brand-50 text-brand-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-lg text-brand-900 group-hover:text-brand-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.createdAt)}
          </div>
        </div>
      </Link>
    </article>
  );
}
