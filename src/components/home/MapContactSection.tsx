import { MapPin, Phone, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { telLink } from "@/lib/site-constants";
import { SalesContactsList } from "@/components/shared/SalesContactsList";
import type { SalesContact } from "@/types/content";
import { cn } from "@/lib/utils";

type ContactFields = {
  address: string;
  phone: string;
  email: string;
  companyName: string;
  salesContacts?: SalesContact[];
};

function mapEmbedSrc(address: string) {
  const mapQuery = encodeURIComponent(address);
  return `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}

export function ContactDetails({
  address,
  phone,
  email,
  companyName,
  salesContacts = [],
  className,
}: ContactFields & { className?: string }) {
  const mapQuery = encodeURIComponent(address);

  return (
    <Card padding="md" className={cn("flex h-full flex-col", className)}>
      <ul className="space-y-5">
        <li className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 ring-1 ring-brand-100">
            <MapPin className="h-5 w-5 text-brand-600" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{companyName}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{address}</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 ring-1 ring-brand-100">
            <Phone className="h-5 w-5 text-brand-600" />
          </div>
          <a href={telLink(phone)} className="font-semibold text-ink hover:text-brand-700">
            {phone}
          </a>
        </li>
        <li className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 ring-1 ring-brand-100">
            <Mail className="h-5 w-5 text-brand-600" />
          </div>
          <a href={`mailto:${email}`} className="break-all text-ink hover:text-brand-700">
            {email}
          </a>
        </li>
      </ul>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        Mở Google Maps →
      </a>

      {salesContacts.length > 0 && (
        <div className="mt-6 flex-1 border-t border-brand-100 pt-5">
          <SalesContactsList contacts={salesContacts} embedded />
        </div>
      )}
    </Card>
  );
}

export function ContactMap({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full min-h-[280px] max-w-full overflow-hidden rounded-lg shadow-elevated ring-1 ring-brand-200 aspect-video sm:aspect-auto sm:min-h-[320px] lg:min-h-0",
        className,
      )}
    >
      <iframe
        title="Bản đồ nhà máy Bê tông Châu Thành"
        src={mapEmbedSrc(address)}
        className="h-full min-h-[280px] sm:min-h-[320px] w-full max-w-full border-0 lg:min-h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

export function MapContactSection({
  address,
  phone,
  email,
  companyName,
  salesContacts = [],
}: ContactFields) {
  return (
    <Section className="bg-white border-t border-brand-100">
      <SectionHeader
        eyebrow="Liên hệ"
        title="Đến nhà máy & liên hệ"
        className="mb-10"
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8 lg:min-h-[480px]">
        <div className="lg:col-span-5">
          <ContactDetails
            address={address}
            phone={phone}
            email={email}
            companyName={companyName}
            salesContacts={salesContacts}
          />
        </div>
        <div className="lg:col-span-7">
          <ContactMap address={address} className="h-full" />
        </div>
      </div>
    </Section>
  );
}
