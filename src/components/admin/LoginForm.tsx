"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
    <div className="min-h-screen flex items-center justify-center blueprint-bg p-6">
      <Card padding="lg" className="w-full max-w-sm shadow-elevated">
        <div className="text-center mb-8">
          <div className="rounded-lg bg-brand-900 px-4 py-5 ring-1 ring-brand-700/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-bach-khoa-banner.png?v=3"
              alt="Công ty Cổ phần Sản xuất Bê tông Châu Thành"
              width={1200}
              height={280}
              className="mx-auto w-full max-w-[320px] h-auto object-contain"
              decoding="async"
            />
          </div>
          <p className="section-eyebrow justify-center mt-6 mb-2">Quản trị</p>
          <h1 className="font-display text-xl text-brand-900">Đăng nhập Admin</h1>
          <p className="text-sm text-ink-muted mt-1">Quản lý nội dung website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="admin-password" className="block">
            <span className="form-label">Mật khẩu</span>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="form-input"
            />
          </label>
          <div aria-live="polite" aria-atomic="true">
            {error && <p className="form-error">{error}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full" aria-busy={loading}>
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
