import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { getPosts } from "@/lib/content";
import { Plus, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { AdminStatusBadge } from "@/components/admin/AdminFormActions";

export default async function AdminPostsPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const posts = await getPosts(false);

  return (
    <div className="p-4 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-brand-900">Bài viết</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-medium hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" /> Thêm
        </Link>
      </div>

      <div className="mt-6 space-y-3 md:hidden">
        {posts.map((p) => (
          <div key={p.id} className="rounded-xl border border-brand-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-brand-900 line-clamp-2">{p.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{formatDate(p.createdAt)}</p>
              </div>
              <AdminStatusBadge published={p.published} />
            </div>
            <Link
              href={`/admin/posts/${p.id}/edit`}
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              <Pencil className="h-4 w-4" />
              Chỉnh sửa
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 hidden md:block overflow-x-auto rounded-xl border border-brand-100 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-brand-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Tiêu đề</th>
              <th className="px-4 py-3 font-medium">Ngày</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-brand-50/50">
                <td className="px-4 py-3 font-medium line-clamp-1">{p.title}</td>
                <td className="px-4 py-3 text-ink-muted">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3">
                  <AdminStatusBadge published={p.published} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="inline-flex touch-target items-center justify-center rounded hover:bg-brand-100 text-brand-700"
                    aria-label={`Sửa ${p.title}`}
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
