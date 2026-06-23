"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/content";
import { slugify } from "@/lib/utils";

type ProjectFormProps = {
  initial?: Project;
  mode: "create" | "edit";
};

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [location, setLocation] = useState(initial?.location ?? "An Giang");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [productTypesText, setProductTypesText] = useState(
    initial?.productTypes.join(", ") ?? "",
  );
  const [imagesText, setImagesText] = useState(initial?.images.join("\n") ?? "");
  const [year, setYear] = useState(initial?.year ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === "create") setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      title,
      slug,
      location,
      description,
      productTypes: productTypesText.split(",").map((t) => t.trim()).filter(Boolean),
      images: imagesText.split("\n").map((u) => u.trim()).filter(Boolean),
      year: year || undefined,
      featured,
      published,
    };

    const url =
      mode === "create" ? "/api/projects" : `/api/projects/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/projects");
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
        <span className="text-sm font-medium">Tên công trình *</span>
        <input
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Slug (URL) *</span>
        <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Địa điểm *</span>
        <input required value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Mô tả *</span>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Loại sản phẩm (phân cách dấu phẩy)</span>
        <input
          value={productTypesText}
          onChange={(e) => setProductTypesText(e.target.value)}
          className={inputClass}
          placeholder="Cống bê tông, Cọc bê tông"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">URL ảnh (mỗi dòng một ảnh)</span>
        <textarea
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="/images/..."
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Năm thực hiện</span>
        <input value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} placeholder="2024" />
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Nổi bật
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Hiển thị công khai
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu công trình"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-lg border border-brand-200 text-sm">
          Hủy
        </button>
      </div>
    </form>
  );
}
