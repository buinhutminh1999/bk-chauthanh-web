import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "section-eyebrow",
            light && "section-eyebrow-light",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={cn("section-title mt-3", light && "section-title-light")}>
        {title}
      </h2>
      {description && (
        <p className={cn("section-desc", light && "text-brand-100")}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
