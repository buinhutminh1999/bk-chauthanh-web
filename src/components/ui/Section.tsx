import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  size = "default",
  containerSize = "default",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "sm" | "none";
  containerSize?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      className={cn(
        size === "default" && "section-pad",
        size === "sm" && "section-pad-sm",
        className,
      )}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
