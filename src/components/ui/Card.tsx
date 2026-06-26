import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive = false,
  padding = "md",
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}) {
  const paddingClass = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  return (
    <div
      className={cn(
        "card-base",
        interactive && "card-interactive",
        paddingClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
