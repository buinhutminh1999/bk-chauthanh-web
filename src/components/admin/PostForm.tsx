"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/types/content";
import { slugify } from "@/lib/utils";
import { AdminFormActions, AdminFormSection } from "@/components/admin/AdminFormActions";

type PostFormProps = {
  initial?: Post;
  mode: "create" | "edit";
};

export function PostForm({ initial, mode }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [tagsText, setTagsText] = useState(initial?.tags.join(", ") ?? "");
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
      excerpt,
      content,
      coverImage: coverImage || undefined,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      published,
    };

    const url = mode === "create" ? "/api/posts" : `/api/posts/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Lỗi khi lưu");
    }
    setLoading(false);
  }

  const inputClass = "form-input text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl pb-4">
      <AdminFormSection title="Thông tin bài viết">
        <label className="block">
          <span className="text-sm font-medium">Tiêu đề *</span>
          <input required value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Slug (URL) *</span>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Tóm tắt *</span>
          <textarea required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={inputClass} />
        </label>
      </AdminFormSection>
      <AdminFormSection title="Nội dung">
        <label className="block">
          <span className="text-sm font-medium">Nội dung (Markdown) *</span>
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={12} className={inputClass} />
        </label>
      </AdminFormSection>
      <AdminFormSection title="SEO & media">
        <label className="block">
          <span className="text-sm font-medium">URL ảnh bìa</span>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</span>
          <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className={inputClass} placeholder="Tin công ty, Sản phẩm" />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Hiển thị công khai
        </label>
      </AdminFormSection>
      {error && <p className="form-error">{error}</p>}
      <AdminFormActions
        loading={loading}
        submitLabel="Lưu bài viết"
        onCancel={() => router.back()}
      />
    </form>
  );
}
