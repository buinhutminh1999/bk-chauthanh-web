import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { buildMetadata, organizationJsonLd, webSiteJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `${site.shortName} — Vật liệu xây dựng chất lượng`,
    description: site.description,
    path: "/",
    siteName: site.shortName,
  });
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteConfig();

  return (
    <>
      <JsonLd data={organizationJsonLd(site)} />
      <JsonLd data={webSiteJsonLd(site)} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
