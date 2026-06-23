import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
        <PackageOpen className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="mt-4 font-medium text-brand-900">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
