import { Phone, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { telLink, zaloLink } from "@/lib/site-constants";

type Props = {
  phone: string;
  productName?: string;
};

export function ProductQuoteBox({ phone, productName }: Props) {
  const quoteHref = productName
    ? `/lien-he?product=${encodeURIComponent(productName)}`
    : "/lien-he";

  return (
    <Card
      padding="md"
      className="border-brand-200 bg-gradient-to-b from-brand-50/80 to-white lg:sticky lg:top-24 ring-1 ring-brand-100"
    >
      <p className="section-eyebrow mb-3">Tư vấn & báo giá</p>
      <p className="text-sm text-ink-muted leading-relaxed">
        Liên hệ để nhận bảng giá, bản vẽ kỹ thuật và tư vấn phù hợp dự án.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Button href={quoteHref} size="lg" className="w-full">
          <FileText className="h-4 w-4" />
          Yêu cầu báo giá
        </Button>
        <a
          href={telLink(phone)}
          className="inline-flex min-h-11 items-center justify-center gap-2 w-full px-6 py-3 rounded-md font-semibold border border-brand-200 text-brand-800 hover:bg-brand-50 transition-colors"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
        <Button href={zaloLink(phone)} variant="zalo" size="lg" className="w-full">
          <MessageCircle className="h-4 w-4" />
          Chat Zalo
        </Button>
      </div>
    </Card>
  );
}
