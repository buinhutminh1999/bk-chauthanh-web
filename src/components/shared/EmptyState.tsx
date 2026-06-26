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
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-200 bg-brand-50/40 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-700 text-accent ring-1 ring-brand-600/30">
        <PackageOpen className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="mt-4 font-semibold text-brand-900">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
