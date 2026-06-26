import Image from "next/image";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeScrapedMarkdown } from "@/lib/normalize-scraped-content";

function TableWrapper({ children }: { children: ReactNode }) {
  return <div className="prose-table-wrap scrollbar-thin">{children}</div>;
}

export function MarkdownContent({ content }: { content: string }) {
  const normalized = normalizeScrapedMarkdown(content);

  return (
    <div className="prose-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            return (
              <span className="not-prose my-8 block overflow-hidden rounded-xl bg-brand-100">
                <span className="relative block aspect-[16/10] w-full">
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </span>
              </span>
            );
          },
          table: ({ children }) => (
            <TableWrapper>
              <table>{children}</table>
            </TableWrapper>
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
