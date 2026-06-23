import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import Link from "next/link";
import { getProducts, getPosts } from "@/lib/content";
import { Package, FileText, Plus } from "lucide-react";

export default async function AdminDashboard() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const products = await getProducts(false);
  const posts = await getPosts(false);

  return (
    <div className="p-4 sm:p-8 lg:p-10">
      <h1 className="font-display text-2xl text-brand-900">Tổng quan</h1>
      <p className="text-ink-muted mt-1">Quản lý nội dung website marketing</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-brand-100">
          <div className="flex items-center justify-between">
            <Package className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-display text-brand-900">{products.length}</span>
          </div>
          <p className="mt-4 font-medium">Sản phẩm</p>
          <p className="text-sm text-ink-muted">
            {products.filter((p) => p.published).length} đang hiển thị
          </p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-900"
          >
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Link>
        </div>

        <div className="p-6 rounded-xl bg-white border border-brand-100">
          <div className="flex items-center justify-between">
            <FileText className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-display text-brand-900">{posts.length}</span>
          </div>
          <p className="mt-4 font-medium">Bài viết</p>
          <p className="text-sm text-ink-muted">
            {posts.filter((p) => p.published).length} đang hiển thị
          </p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-900"
          >
            <Plus className="h-4 w-4" /> Thêm bài viết
          </Link>
        </div>
      </div>
    </div>
  );
}
