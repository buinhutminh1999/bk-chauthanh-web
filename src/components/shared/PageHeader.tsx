import { Container } from "@/components/ui/Container";

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative grain-overlay bg-brand-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-600)_0%,_transparent_50%)] opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
      <Container className="relative py-14 lg:py-20">
        {breadcrumb && (
          <p className="text-sm text-brand-200 mb-3 uppercase tracking-wider">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-brand-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
