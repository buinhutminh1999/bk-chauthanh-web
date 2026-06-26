import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden card-base card-interactive">
      <Link href={`/tin-tuc/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-brand-50 text-steel text-sm font-medium">
              Tin tức
            </div>
          )}
        </div>
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-display text-lg text-brand-900 group-hover:text-brand-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 flex-1 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-5 pt-4 border-t border-brand-50 flex items-center gap-2 text-xs font-medium text-ink-muted">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(post.createdAt)}
          </div>
        </div>
      </Link>
    </article>
  );
}
