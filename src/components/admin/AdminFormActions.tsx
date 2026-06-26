"use client";

import { cn } from "@/lib/utils";

type AdminFormActionsProps = {
  loading?: boolean;
  submitLabel?: string;
  loadingLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
};

export function AdminFormActions({
  loading = false,
  submitLabel = "Lưu",
  loadingLabel = "Đang lưu…",
  onCancel,
  cancelLabel = "Hủy",
  className,
}: AdminFormActionsProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 -mx-4 mt-8 flex flex-wrap gap-3 border-t border-brand-100 bg-surface/95 px-4 py-4 backdrop-blur-sm sm:-mx-0 sm:px-0 lg:static lg:border-0 lg:bg-transparent lg:py-0 lg:backdrop-blur-none",
        className,
      )}
    >
      <button
        type="submit"
        disabled={loading}
        className="min-h-11 flex-1 sm:flex-none px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 shadow-sm"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 flex-1 sm:flex-none px-5 py-2.5 rounded-md border border-brand-200 bg-white text-sm font-medium hover:bg-brand-50"
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
}

export function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="admin-panel space-y-4 p-5 sm:p-6">
      <legend className="px-1 font-semibold text-brand-900">{title}</legend>
      {description && (
        <p className="text-sm text-ink-muted -mt-2">{description}</p>
      )}
      {children}
    </fieldset>
  );
}

export function AdminStatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        published
          ? "bg-success-muted text-success ring-success/20"
          : "bg-brand-50 text-steel ring-brand-200",
      )}
    >
      {published ? "Hiển thị" : "Ẩn"}
    </span>
  );
}
