import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { getProducts } from "@/lib/content";
import { Plus, Pencil } from "lucide-react";

export default async function AdminProductsPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const products = await getProducts(false);

  return (
    <div className="p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-brand-900">Sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" /> Thêm
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-brand-100 bg-white">
        <table className="w-full text-sm">
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
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${p.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                  >
                    {p.published ? "Hiển thị" : "Ẩn"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="p-2 rounded hover:bg-brand-100 text-brand-700"
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
