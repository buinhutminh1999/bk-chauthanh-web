import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { getProducts } from "@/lib/content";
import { Plus, Pencil } from "lucide-react";
import { AdminStatusBadge } from "@/components/admin/AdminFormActions";

export default async function AdminProductsPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const products = await getProducts(false);

  return (
    <div className="admin-page">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-brand-900">Sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" /> Thêm
        </Link>
      </div>

      <div className="mt-6 space-y-3 md:hidden">
        {products.map((p) => (
          <div key={p.id} className="admin-panel p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-brand-900 line-clamp-2">{p.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{p.category}</p>
              </div>
              <AdminStatusBadge published={p.published} />
            </div>
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              <Pencil className="h-4 w-4" />
              Chỉnh sửa
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 hidden md:block admin-table-wrap admin-panel">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-brand-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Tên</th>
              <th className="px-4 py-3 font-medium">Danh mục</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-brand-50/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-ink-muted">{p.category}</td>
                <td className="px-4 py-3">
                  <AdminStatusBadge published={p.published} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="inline-flex touch-target items-center justify-center rounded hover:bg-brand-100 text-brand-700"
                    aria-label={`Sửa ${p.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
