import { Suspense } from "react";
import { getSiteConfig } from "@/lib/content";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { ContactPageClient } from "./ContactPageClient";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Liên hệ — ${site.shortName}`,
    description: `Liên hệ ${site.companyName} — tư vấn và báo giá vật liệu xây dựng.`,
    path: "/lien-he",
    siteName: site.shortName,
  });
}

export default async function ContactPage() {
  const site = await getSiteConfig();
  return (
    <>
      <JsonLd data={contactPageJsonLd(site)} />
      <Suspense>
      <ContactPageClient
        site={{
          companyName: site.companyName,
          phone: site.phone,
          email: site.email,
          address: site.address,
          facebook: site.social.facebook,
          salesContacts: site.salesContacts,
        }}
      />
    </Suspense>
    </>
  );
}
