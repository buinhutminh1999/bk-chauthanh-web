"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Mail, Phone, Send, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { telLink, zaloLink } from "@/lib/site-constants";
import { useContactForm } from "@/lib/use-contact-form";
import { SalesContactsList } from "@/components/shared/SalesContactsList";
import type { SalesContact } from "@/types/content";

type SiteInfo = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  facebook?: string;
  salesContacts?: SalesContact[];
};

const PRODUCT_OPTIONS = [
  "Cống bê tông ly tâm",
  "Cọc bê tông dự ứng lực",
  "Gạch bê tông / Gạch vỉa hè",
  "Bê tông nhựa nóng",
  "Bê tông UHPC",
  "Khác",
];

export function ContactPageClient({ site }: { site: SiteInfo }) {
  const { loading, sent, error, submit } = useContactForm();
  const searchParams = useSearchParams();
  const queryProduct = searchParams.get("product");
  const [productPreset, setProductPreset] = useState(
    queryProduct && queryProduct.length > 0 ? queryProduct : PRODUCT_OPTIONS[0],
  );

  const mapQuery = encodeURIComponent(site.address);
  const embedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    await submit(
      {
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        product: String(fd.get("product") ?? ""),
        message: String(fd.get("message") ?? ""),
      },
      { formId: "contact_page" },
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
        title="Liên hệ với chúng tôi"
        subtitle="Tư vấn sản phẩm, báo giá và hỗ trợ kỹ thuật cho dự án của bạn"
      />
      <section className="py-12 sm:py-16 lg:py-20 pb-8">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-2xl text-brand-900">Thông tin liên hệ</h2>

              {site.address && (
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-ink">{site.companyName}</p>
                    <p className="text-sm text-ink-muted mt-1">{site.address}</p>
                  </div>
                </div>
              )}

              {site.phone && (
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-brand-600 shrink-0" />
                  <a
                    href={telLink(site.phone)}
                    className="text-ink hover:text-brand-700 font-medium"
                  >
                    {site.phone}
                  </a>
                </div>
              )}

              {site.phone && (
                <div className="flex gap-4">
                  <MessageCircle className="h-5 w-5 text-zalo shrink-0" />
                  <a
                    href={zaloLink(site.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-brand-700"
                  >
                    Chat Zalo
                  </a>
                </div>
              )}

              {site.email && (
                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-brand-600 shrink-0" />
                  <a href={`mailto:${site.email}`} className="break-all text-ink hover:text-brand-700">
                    {site.email}
                  </a>
                </div>
              )}

              {site.facebook && (
                <div className="flex gap-4">
                  <span className="text-brand-600 font-semibold text-sm shrink-0">FB</span>
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-brand-700 text-sm"
                  >
                    Fanpage Nhà Máy Bê Tông Châu Thành
                  </a>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {site.phone && (
                  <>
                    <a
                      href={telLink(site.phone)}
                      className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800"
                    >
                      <Phone className="h-4 w-4" />
                      Gọi ngay
                    </a>
                    <a
                      href={zaloLink(site.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-lg bg-zalo text-white text-sm font-medium hover:bg-zalo-hover"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Zalo
                    </a>
                  </>
                )}
              </div>

              <div className="p-6 rounded-xl bg-brand-50 border border-brand-100 text-sm text-ink-muted">
                <p>
                  Giờ làm việc: Thứ 2 — Thứ 6, 7:30 — 17:00. Liên hệ qua điện thoại hoặc email
                  để được phản hồi nhanh nhất.
                </p>
              </div>

              {site.salesContacts && site.salesContacts.length > 0 && (
                <SalesContactsList contacts={site.salesContacts} />
              )}
            </div>

            <div className="lg:col-span-3">
              <div className="p-5 sm:p-8 rounded-2xl bg-white border border-brand-100 shadow-sm">
                <h2 className="font-display text-xl text-brand-900 mb-6">Gửi yêu cầu tư vấn</h2>

                {sent ? (
                  <div className="py-12 text-center" role="status" aria-live="polite">
                    <p className="text-brand-700 font-medium">Cảm ơn bạn đã liên hệ!</p>
                    <p className="mt-2 text-sm text-ink-muted">
                      Chúng tôi sẽ phản hồi trong thời gian sớm nhất. Hoặc gọi trực tiếp:{" "}
                      {site.phone}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div aria-live="polite" aria-atomic="true">
                      {error && <p className="form-error">{error}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label htmlFor="contact-name" className="block">
                        <span className="form-label">Họ và tên *</span>
                        <input
                          id="contact-name"
                          required
                          name="name"
                          type="text"
                          autoComplete="name"
                          className="form-input"
                        />
                      </label>
                      <label htmlFor="contact-phone" className="block">
                        <span className="form-label">Điện thoại *</span>
                        <input
                          id="contact-phone"
                          required
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          spellCheck={false}
                          className="form-input"
                        />
                      </label>
                    </div>
                    <label htmlFor="contact-email" className="block">
                      <span className="form-label">Email</span>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        className="form-input"
                      />
                    </label>
                    <label htmlFor="contact-product" className="block">
                      <span className="form-label">Sản phẩm quan tâm</span>
                      <select
                        id="contact-product"
                        name="product"
                        value={productPreset}
                        onChange={(e) => setProductPreset(e.target.value)}
                        autoComplete="off"
                        className="form-input bg-white"
                      >
                        {PRODUCT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                        {!PRODUCT_OPTIONS.includes(productPreset) && (
                          <option value={productPreset}>{productPreset}</option>
                        )}
                      </select>
                    </label>
                    <label htmlFor="contact-message" className="block">
                      <span className="form-label">Nội dung *</span>
                      <textarea
                        id="contact-message"
                        required
                        name="message"
                        rows={4}
                        autoComplete="off"
                        className="form-input resize-y"
                        placeholder="Mô tả dự án, quy cách cần tư vấn…"
                      />
                    </label>
                    <Button type="submit" size="lg" disabled={loading} aria-busy={loading}>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {loading ? "Đang gửi…" : "Gửi yêu cầu"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-full overflow-hidden rounded-2xl ring-1 ring-brand-100 shadow-lg">
            <iframe
              title="Bản đồ nhà máy Bê tông Châu Thành"
              src={embedSrc}
              className="w-full max-w-full h-[360px] sm:h-[400px] lg:h-[480px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  );
}
