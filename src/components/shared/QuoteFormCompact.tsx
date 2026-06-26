"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useContactForm } from "@/lib/use-contact-form";
import { cn } from "@/lib/utils";

const PRODUCT_OPTIONS = [
  "Cống bê tông ly tâm",
  "Cọc bê tông dự ứng lực",
  "Gạch bê tông / Gạch vỉa hè",
  "Bê tông nhựa nóng",
  "Bê tông UHPC",
  "Khác",
];

export function QuoteFormCompact({
  phone,
  defaultProduct,
  formId = "quote_home",
  className,
}: {
  phone: string;
  defaultProduct?: string;
  formId?: string;
  className?: string;
}) {
  const { loading, sent, error, submit } = useContactForm();

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
        message: String(fd.get("message") ?? "") || "Yêu cầu báo giá từ form trang chủ",
      },
      { formId: formId },
    );
  }

  if (sent) {
    return (
      <Card
        className={cn(
          "flex h-full min-h-[320px] flex-col items-center justify-center text-center lg:min-h-0 bg-brand-50/50",
          className,
        )}
      >
        <div role="status" aria-live="polite">
          <p className="font-semibold text-brand-800">Cảm ơn bạn đã liên hệ!</p>
          <p className="mt-2 text-sm text-ink-muted">
            Chúng tôi sẽ phản hồi sớm. Hoặc gọi: {phone}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "card-base flex h-full min-h-[320px] flex-col space-y-4 p-5 sm:p-6 lg:min-h-0",
        className,
      )}
      noValidate
    >
      <div>
        <p className="section-eyebrow mb-2">Báo giá</p>
        <h3 className="font-display text-lg text-brand-900">Yêu cầu báo giá nhanh</h3>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {error && <p className="form-error">{error}</p>}
      </div>
      <label htmlFor="quote-name" className="block">
        <span className="form-label">Họ tên *</span>
        <input
          id="quote-name"
          required
          name="name"
          type="text"
          autoComplete="name"
          className="form-input"
        />
      </label>
      <label htmlFor="quote-phone" className="block">
        <span className="form-label">Điện thoại *</span>
        <input
          id="quote-phone"
          required
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          spellCheck={false}
          className="form-input"
        />
      </label>
      <label htmlFor="quote-email" className="block">
        <span className="form-label">Email</span>
        <input
          id="quote-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          className="form-input"
        />
      </label>
      <label htmlFor="quote-product" className="block">
        <span className="form-label">Sản phẩm quan tâm</span>
        <select
          id="quote-product"
          name="product"
          defaultValue={defaultProduct ?? PRODUCT_OPTIONS[0]}
          autoComplete="off"
          className="form-input"
        >
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <label htmlFor="quote-message" className="block">
        <span className="form-label">Nội dung</span>
        <textarea
          id="quote-message"
          name="message"
          rows={3}
          placeholder="Quy cách, số lượng, dự án…"
          autoComplete="off"
          className="form-input"
        />
      </label>
      <Button type="submit" className="mt-auto w-full" disabled={loading} aria-busy={loading}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {loading ? "Đang gửi…" : "Gửi yêu cầu"}
      </Button>
    </form>
  );
}
