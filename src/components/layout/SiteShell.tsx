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
    <>
      <Header
        companyName={site.companyName}
        brand={site.brand}
        phone={site.phone}
        products={productLinks}
      />
      <main className="flex-1 pb-mobile-cta">{children}</main>
      <Footer site={site} />
      <StickyMobileCTA phone={site.phone} />
    </>
  );
}
