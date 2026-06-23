import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-10",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-7xl 2xl:max-w-[90rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
