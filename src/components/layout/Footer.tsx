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
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/cong-trinh", label: "Công trình" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/bang-gia", label: "Báo giá" },
  { href: "/chung-nhan", label: "Chứng nhận" },
  { href: "/tai-lieu", label: "Tài liệu" },
  { href: "/hoi-dap", label: "Hỏi đáp" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
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
    <h3 className="section-eyebrow section-eyebrow-light text-[11px]">
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
    <footer className="w-full min-w-0 border-t border-brand-700/60 bg-brand-900 text-brand-100 overflow-x-hidden blueprint-bg-dark">
      <div className="h-0.5 bg-gradient-to-r from-brand-600 via-accent to-brand-600" />
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

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <FooterHeading>Liên hệ</FooterHeading>
            <div className="mt-4 space-y-8">
              <ul className="space-y-3 text-sm text-brand-200">
                {site.address && (
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="min-w-0 leading-relaxed">{site.address}</span>
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
                  <li className="flex gap-2.5 items-center">
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:text-white transition-colors"
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

              {site.salesContacts && site.salesContacts.length > 0 && (
                <div className="min-w-0">
                  <SalesContactsList
                    contacts={site.salesContacts}
                    variant="dark"
                    layout="footer"
                    title="Kinh doanh"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-brand-700/80 pt-6 text-xs leading-relaxed text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.companyName}.{" "}
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
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
