import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/layout/BrandMark";
import type { SiteConfig } from "@/types/content";
import {
  PRODUCT_LINE_FILTERS,
  PRODUCT_SLUG_PRIORITY,
  telLink,
  zaloLink,
} from "@/lib/site-constants";
import { SalesContactsList } from "@/components/shared/SalesContactsList";

const FOOTER_LINKS = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/cong-trinh", label: "Công trình" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/hoi-dap", label: "Hỏi đáp" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

const FOOTER_PRODUCT_LABELS: Record<string, string> = {
  "be-tong-sieu-tinh-nang-uhpc": "Bê tông siêu tính năng UHPC",
};

function footerProductLinks() {
  return PRODUCT_SLUG_PRIORITY.slice(0, 5).map((slug) => {
    const filter = PRODUCT_LINE_FILTERS.find((item) => item.slug === slug);
    return {
      slug,
      label: filter?.label ?? FOOTER_PRODUCT_LABELS[slug] ?? slug,
    };
  });
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
      {children}
    </h3>
  );
}

function FooterColumn({
  heading,
  children,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <FooterHeading>{heading}</FooterHeading>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-brand-200 hover:text-white transition-colors leading-relaxed"
    >
      {children}
    </Link>
  );
}

export function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();
  const products = footerProductLinks();

  return (
    <footer className="w-full min-w-0 border-t border-brand-700 bg-brand-900 text-brand-100 overflow-x-hidden">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 items-start">
          <div className="sm:col-span-2 lg:col-span-4">
            <BrandMark
              brand={site.brand}
              companyName={site.companyName}
              href={undefined}
              layout="stacked"
              showTextFrom="always"
            />
            <p className="mt-4 max-w-md text-sm text-brand-200 leading-relaxed">
              {site.description}
            </p>
          </div>

          <FooterColumn heading="Liên kết" className="lg:col-span-2">
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn heading="Sản phẩm" className="lg:col-span-2">
            <ul className="space-y-2.5 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <FooterLink href={`/san-pham/${product.slug}`}>
                    {product.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn heading="Liên hệ" className="lg:col-span-2">
            <ul className="space-y-3 text-sm text-brand-200">
              {site.address && (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="leading-relaxed">{site.address}</span>
                </li>
              )}
              {site.phone && (
                <li className="flex gap-2.5 items-center">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={telLink(site.phone)}
                    className="hover:text-white transition-colors"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              {site.phone && (
                <li className="flex gap-2.5 items-center">
                  <MessageCircle className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={zaloLink(site.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Chat Zalo
                  </a>
                </li>
              )}
              {site.email && (
                <li className="flex gap-2.5 items-start min-w-0">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${site.email}`}
                    className="break-words hover:text-white transition-colors"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              {site.social?.facebook && (
                <li className="flex gap-2.5 items-center">
                    <Share2 className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Fanpage Facebook
                  </a>
                </li>
              )}
            </ul>
          </FooterColumn>

          {site.salesContacts && site.salesContacts.length > 0 && (
            <FooterColumn heading="Mọi chi tiết xin liên hệ" className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
              <SalesContactsList
                contacts={site.salesContacts}
                variant="dark"
                embedded
                hideTitle
                title="Mọi chi tiết xin liên hệ"
              />
            </FooterColumn>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-brand-700/80 pt-6 text-xs leading-relaxed text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.companyName}. Bảo lưu mọi quyền.
          </p>
          {site.parentCompany && (
            <p className="sm:text-right">
              Thuộc{" "}
              <a
                href="https://bachkhoaangiang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-200 hover:text-white transition-colors"
              >
                {site.parentCompany}
              </a>
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
