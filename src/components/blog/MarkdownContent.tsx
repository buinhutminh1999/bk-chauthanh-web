import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeScrapedMarkdown } from "@/lib/normalize-scraped-content";

export function MarkdownContent({ content }: { content: string }) {
  const normalized = normalizeScrapedMarkdown(content);

  return (
    <div className="prose-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{normalized}</ReactMarkdown>
    </div>
  );
}
