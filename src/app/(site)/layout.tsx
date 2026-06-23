import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `${site.shortName} — Vật liệu xây dựng chất lượng`,
    description: site.description,
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
      <SiteShell>{children}</SiteShell>
    </>
  );
}
