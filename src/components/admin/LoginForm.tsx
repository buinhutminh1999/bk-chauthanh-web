"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Mật khẩu không đúng");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-6">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-white border border-brand-100 shadow-lg">
        <div className="text-center mb-8">
          <div className="rounded-xl bg-black px-4 py-5 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-bach-khoa-banner.png?v=3"
              alt="Công ty Cổ phần Sản xuất Bách Khoa Châu Thành"
              width={1200}
              height={280}
              className="mx-auto w-full max-w-[320px] h-auto object-contain"
              decoding="async"
            />
          </div>
          <h1 className="mt-4 font-display text-xl text-brand-900">Đăng nhập Admin</h1>
          <p className="text-sm text-ink-muted mt-1">Quản lý nội dung website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Mật khẩu</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-11 py-2.5 rounded-lg bg-brand-700 text-white font-medium hover:bg-brand-800 disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
