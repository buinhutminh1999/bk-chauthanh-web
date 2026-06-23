import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { getSiteConfig, getProducts } from "@/lib/content";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();
  const products = await getProducts();
  const productLinks = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
  }));

  return (
    <div className="flex min-h-full flex-1 flex-col w-full min-w-0 overflow-x-hidden">
      <Header
        companyName={site.companyName}
        brand={site.brand}
        phone={site.phone}
        products={productLinks}
      />
      <main className="flex-1 min-w-0 w-full overflow-x-hidden pb-mobile-cta">{children}</main>
      <Footer site={site} />
      <StickyMobileCTA phone={site.phone} />
    </div>
  );
}
