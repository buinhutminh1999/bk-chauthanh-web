import { getSiteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContactPageClient } from "./ContactPageClient";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Liên hệ — ${site.shortName}`,
    description: `Liên hệ ${site.companyName} — tư vấn và báo giá vật liệu xây dựng.`,
    path: "/lien-he",
  });
}

export default async function ContactPage() {
  const site = await getSiteConfig();
  return (
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
  );
}
