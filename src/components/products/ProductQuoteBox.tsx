import { Phone, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    <div className="rounded-2xl border-2 border-brand-200 bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-md lg:sticky lg:top-24 lg:border lg:border-brand-100 lg:shadow-sm lg:bg-white lg:from-white lg:to-white">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
        Tư vấn & báo giá
      </p>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
        Liên hệ để nhận bảng giá, bản vẽ kỹ thuật và tư vấn phù hợp dự án.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Button href={quoteHref} size="lg" className="w-full">
          <FileText className="h-4 w-4" />
          Yêu cầu báo giá
        </Button>
        <a
          href={telLink(phone)}
          className="inline-flex min-h-11 items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium border border-brand-200 text-brand-800 hover:bg-brand-50 transition-colors"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
        <a
          href={zaloLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium bg-zalo text-white hover:bg-zalo-hover active:scale-[0.98] transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          Chat Zalo
        </a>
      </div>
    </div>
  );
}
