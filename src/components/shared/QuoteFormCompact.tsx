"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
  className,
}: {
  phone: string;
  defaultProduct?: string;
  className?: string;
}) {
  const { loading, sent, error, submit } = useContactForm();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    await submit({
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      product: String(fd.get("product") ?? ""),
      message: String(fd.get("message") ?? "") || "Yêu cầu báo giá từ form trang chủ",
    });
  }

  if (sent) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center lg:min-h-0",
          className,
        )}
      >
        <p className="font-medium text-brand-800">Cảm ơn bạn đã liên hệ!</p>
        <p className="mt-2 text-sm text-ink-muted">
          Chúng tôi sẽ phản hồi sớm. Hoặc gọi: {phone}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-full min-h-[320px] flex-col space-y-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm lg:min-h-0",
        className,
      )}
    >
      <h3 className="font-display text-lg text-brand-900">Yêu cầu báo giá nhanh</h3>
      {error && <p className="form-error">{error}</p>}
      <label className="block">
        <span className="text-sm font-medium text-ink">Họ tên *</span>
        <input required name="name" type="text" className="form-input" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Điện thoại *</span>
        <input required name="phone" type="tel" className="form-input" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Email</span>
        <input name="email" type="email" className="form-input" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Sản phẩm quan tâm</span>
        <select
          name="product"
          defaultValue={defaultProduct ?? PRODUCT_OPTIONS[0]}
          className="form-input"
        >
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Nội dung</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Quy cách, số lượng, dự án..."
          className="form-input"
        />
      </label>
      <Button type="submit" className="mt-auto w-full" disabled={loading}>
        <Send className="h-4 w-4" />
        {loading ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
    </form>
  );
}
