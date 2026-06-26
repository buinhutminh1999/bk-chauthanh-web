import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import Link from "next/link";
import { getProducts, getPosts } from "@/lib/content";
import { Package, FileText, Plus, Building2, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default async function AdminDashboard() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const [products, posts] = await Promise.all([getProducts(false), getPosts(false)]);

  const stats = [
    {
      icon: Package,
      label: "Sản phẩm",
      count: products.length,
      published: products.filter((p) => p.published).length,
      href: "/admin/products/new",
      linkLabel: "Thêm sản phẩm",
    },
    {
      icon: FileText,
      label: "Bài viết",
      count: posts.length,
      published: posts.filter((p) => p.published).length,
      href: "/admin/posts/new",
      linkLabel: "Thêm bài viết",
    },
  ];

  return (
    <div className="admin-page">
      <div className="max-w-4xl">
        <p className="section-eyebrow mb-2">Quản trị</p>
        <h1 className="font-display text-2xl sm:text-3xl text-brand-900">Tổng quan</h1>
        <p className="text-ink-muted mt-2">Quản lý nội dung website marketing</p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} padding="md" interactive>
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-700 text-accent ring-1 ring-brand-600/30">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="font-display text-3xl text-brand-900 tabular-nums">{stat.count}</span>
            </div>
            <p className="mt-5 font-semibold text-brand-900">{stat.label}</p>
            <p className="text-sm text-ink-muted mt-1">
              {stat.published} đang hiển thị
            </p>
            <Link
              href={stat.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              <Plus className="h-4 w-4" /> {stat.linkLabel}
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-8 admin-panel p-5 sm:p-6">
        <p className="font-semibold text-brand-900">Truy cập nhanh</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900">
            <Building2 className="h-4 w-4" /> Công trình
          </Link>
          <Link href="/admin/faq" className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900">
            <HelpCircle className="h-4 w-4" /> FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
