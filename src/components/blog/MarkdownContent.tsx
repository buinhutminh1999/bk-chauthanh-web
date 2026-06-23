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
