import { Header } from "./Header";
import { Footer } from "./Footer";
import { SkipLink } from "./SkipLink";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { getSiteConfig, getProducts } from "@/lib/content";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [site, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const productLinks = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col w-full min-w-0 overflow-x-hidden">
      <SkipLink />
      <Header
        companyName={site.companyName}
        brand={site.brand}
        phone={site.phone}
        products={productLinks}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 min-w-0 w-full overflow-x-hidden pb-mobile-cta outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {children}
      </main>
      <Footer site={site} />
      <StickyMobileCTA phone={site.phone} />
    </div>
  );
}
