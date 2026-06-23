import { FileText, Download, Image as ImageIcon } from "lucide-react";
import type { ProductDocument } from "@/types/content";

const TYPE_LABELS: Record<ProductDocument["type"], string> = {
  pdf: "PDF",
  drawing: "Bản vẽ",
  catalog: "Catalog",
};

function DocIcon({ type }: { type: ProductDocument["type"] }) {
  if (type === "drawing") return <ImageIcon className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}

export function ProductDocuments({ documents }: { documents: ProductDocument[] }) {
  if (!documents.length) return null;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg text-brand-900">Tài liệu & bản vẽ</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Tải bản vẽ kỹ thuật, catalog hoặc xem chứng nhận sản phẩm.
      </p>
      <ul className="mt-5 space-y-3">
        {documents.map((doc) => (
          <li key={`${doc.url}-${doc.title}`}>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 p-3 rounded-xl border border-brand-100 hover:border-brand-300 hover:bg-brand-50/50 transition-colors group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100">
                <DocIcon type={doc.type} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="font-medium text-brand-900 group-hover:text-brand-700 block truncate">
                  {doc.title}
                </span>
                <span className="text-xs text-ink-muted">{TYPE_LABELS[doc.type]}</span>
              </span>
              <Download className="h-4 w-4 text-brand-500 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
