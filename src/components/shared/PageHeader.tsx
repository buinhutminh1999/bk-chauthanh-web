import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  const items: BreadcrumbItem[] =
    breadcrumbs ??
    (breadcrumb ? [{ label: breadcrumb }] : []);

  return (
    <section className="relative grain-overlay blueprint-bg-dark text-white overflow-hidden border-b border-brand-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700/90" />
      <div className="absolute top-0 right-0 w-[min(480px,60vw)] h-[min(480px,60vw)] bg-accent/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent" />
      <Container className="relative py-14 lg:py-20">
        {items.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-100/90">
              {items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-brand-300/70" aria-hidden="true">
                      /
                    </span>
                  )}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-white max-w-3xl leading-[1.12] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-brand-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="slab-divider mt-6" />
      </Container>
    </section>
  );
}
