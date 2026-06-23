"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FaqItem } from "@/types/content";

export function FaqEditor({ initial }: { initial: FaqItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function addItem() {
    setItems([
      ...items,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
        order: items.length + 1,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems(items.filter((i) => i.id !== id));
  }

  function updateItem(id: string, field: "question" | "answer", value: string) {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    const normalized = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    const res = await fetch("/api/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: normalized }),
    });

    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Lỗi khi lưu");
    }
    setLoading(false);
  }

  const inputClass =
    "mt-1.5 w-full px-4 py-2.5 rounded-lg border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {items.map((item, index) => (
        <div key={item.id} className="p-5 rounded-xl border border-brand-100 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-700">Câu {index + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Xóa
            </button>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Câu hỏi</span>
            <input
              required
              value={item.question}
              onChange={(e) => updateItem(item.id, "question", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Trả lời</span>
            <textarea
              required
              value={item.answer}
              onChange={(e) => updateItem(item.id, "answer", e.target.value)}
              rows={3}
              className={inputClass}
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="text-sm font-medium text-brand-700 hover:text-brand-900"
      >
        + Thêm câu hỏi
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-700">Đã lưu FAQ.</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2.5 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 disabled:opacity-50"
      >
        {loading ? "Đang lưu..." : "Lưu FAQ"}
      </button>
    </form>
  );
}
