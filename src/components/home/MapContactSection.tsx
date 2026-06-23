import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <ul className="space-y-4">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
          <div className="min-w-0">
            <p className="font-medium text-ink">{companyName}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{address}</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <Phone className="h-5 w-5 shrink-0 text-brand-600" />
          <a href={telLink(phone)} className="font-medium text-ink hover:text-brand-700">
            {phone}
          </a>
        </li>
        <li className="flex items-center gap-3 min-w-0">
          <Mail className="h-5 w-5 shrink-0 text-brand-600" />
          <a href={`mailto:${email}`} className="truncate text-ink hover:text-brand-700">
            {email}
          </a>
        </li>
      </ul>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex text-sm font-medium text-brand-700 hover:text-brand-900"
      >
        Mở Google Maps →
      </a>

      {salesContacts.length > 0 && (
        <div className="mt-6 flex-1 border-t border-brand-100 pt-5">
          <SalesContactsList contacts={salesContacts} embedded />
        </div>
      )}
    </div>
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
        "h-full min-h-[280px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-100 aspect-video sm:aspect-auto sm:min-h-[320px] lg:min-h-0",
        className,
      )}
    >
      <iframe
        title="Bản đồ nhà máy Bách Khoa Châu Thành"
        src={mapEmbedSrc(address)}
        className="h-full min-h-[320px] w-full border-0 lg:min-h-full"
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
    <section className="border-t border-brand-100 bg-white py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Liên hệ
          </p>
          <h2 className="mt-2 font-display text-3xl text-brand-900">Đến nhà máy & liên hệ</h2>
        </div>
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
      </Container>
    </section>
  );
}
