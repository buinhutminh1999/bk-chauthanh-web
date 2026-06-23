import Link from "next/link";
import { LayoutDashboard, Package, FileText, LogOut, ExternalLink, Building2, HelpCircle } from "lucide-react";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/projects", label: "Công trình", icon: Building2 },
  { href: "/admin/posts", label: "Bài viết", icon: FileText },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await verifySession();

  return (
    <div className="min-h-screen bg-surface flex">
      {authed && (
        <aside className="w-64 shrink-0 bg-brand-900 text-brand-100 flex flex-col">
          <div className="p-6 border-b border-brand-700">
            <p className="font-display text-lg text-white">Admin</p>
            <p className="text-xs text-brand-300 mt-1">Bách Khoa Châu Thành</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-800 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Xem website
            </a>
          </nav>
          <form action="/api/auth/logout" method="POST" className="p-4 border-t border-brand-700">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </form>
        </aside>
      )}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
