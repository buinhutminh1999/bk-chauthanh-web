import { cn } from "@/lib/utils";

const variants = {
  default: "bg-brand-50 text-brand-800 ring-brand-100",
  accent: "bg-accent/15 text-brand-900 ring-accent/25",
  dark: "bg-white/10 text-white ring-white/15",
  outline: "bg-transparent text-brand-700 ring-brand-200",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
