"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductDocumentType } from "@/types/content";
import { slugify } from "@/lib/utils";

type ProductFormProps = {
  initial?: Product;
  mode: "create" | "edit";
};

function docsToText(docs: Product["documents"]) {
  if (!docs?.length) return "";
  return docs.map((d) => `${d.title}|${d.url}|${d.type}`).join("\n");
}

export function ProductForm({ initial, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Sản xuất");
  const [imagesText, setImagesText] = useState(initial?.images.join("\n") ?? "");
  const [documentsText, setDocumentsText] = useState(docsToText(initial?.documents));
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [specsText, setSpecsText] = useState(
    initial?.specs
      ? Object.entries(initial.specs).map(([k, v]) => `${k}: ${v}`).join("\n")
      : "",
  );

  function handleNameChange(v: string) {
    setName(v);
    if (mode === "create") setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const specs: Record<string, string> = {};
    specsText.split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (key?.trim() && rest.length) specs[key.trim()] = rest.join(":").trim();
    });

    const documents: Product["documents"] = [];
    documentsText.split("\n").forEach((line) => {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 2) {
        const type = (parts[2] ?? "pdf") as ProductDocumentType;
        documents.push({
          title: parts[0],
          url: parts[1],
          type: type === "drawing" || type === "catalog" ? type : "pdf",
        });
      }
    });

    const body = {
      name,
      slug,
      shortDescription,
      description,
      category,
      images: imagesText.split("\n").map((u) => u.trim()).filter(Boolean),
      documents,
      featured,
      published,
      specs,
    };

    const url =
      mode === "create" ? "/api/products" : `/api/products/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/products");
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <label className="block">
        <span className="text-sm font-medium">Tên sản phẩm *</span>
        <input required value={name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Slug (URL) *</span>
        <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Mô tả ngắn *</span>
        <textarea required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={2} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Nội dung (Markdown)</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={8} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Danh mục</span>
        <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">URL ảnh (mỗi dòng một ảnh)</span>
        <textarea value={imagesText} onChange={(e) => setImagesText(e.target.value)} rows={3} className={inputClass} placeholder="/images/..." />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Tài liệu (mỗi dòng: Tiêu đề|URL|loại)</span>
        <textarea
          value={documentsText}
          onChange={(e) => setDocumentsText(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Bản vẽ điển hình|/files/ban-ve.pdf|drawing"
        />
        <span className="text-xs text-ink-muted mt-1 block">Loại: pdf, drawing, catalog</span>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Thông số (mỗi dòng: Tên: Giá trị)</span>
        <textarea value={specsText} onChange={(e) => setSpecsText(e.target.value)} rows={4} className={inputClass} />
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Sản phẩm nổi bật
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Hiển thị công khai
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 disabled:opacity-50">
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-lg border border-brand-200 text-sm">
          Hủy
        </button>
      </div>
    </form>
  );
}
