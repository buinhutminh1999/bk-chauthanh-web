"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  LogOut,
  ExternalLink,
  Building2,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/projects", label: "Công trình", icon: Building2 },
  { href: "/admin/posts", label: "Bài viết", icon: FileText },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
];

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-1", className)} aria-label="Admin">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
              active
                ? "bg-brand-800 text-white"
                : "text-brand-100 hover:bg-brand-800 hover:text-white",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-brand-100 hover:bg-brand-800 hover:text-white transition-colors"
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        Xem website
      </a>
    </nav>
  );
}

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-brand-200 bg-brand-900 px-4 py-3 text-white">
        <div>
          <p className="font-display text-base text-white">Admin</p>
          <p className="text-xs text-brand-300">Bách Khoa Châu Thành</p>
        </div>
        <button
          type="button"
          className="touch-target flex items-center justify-center rounded-lg hover:bg-brand-800"
          onClick={() => setMobileOpen(true)}
          aria-label="Mở menu quản trị"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            aria-label="Đóng menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute right-0 top-0 bottom-0 w-[min(18rem,85vw)] bg-brand-900 text-brand-100 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-700 p-4">
              <p className="font-display text-lg text-white">Menu</p>
              <button
                type="button"
                className="touch-target flex items-center justify-center rounded-lg hover:bg-brand-800"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
            <form action="/api/auth/logout" method="POST" className="border-t border-brand-700 p-4">
              <button
                type="submit"
                className="flex w-full min-h-11 items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </form>
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex w-64 shrink-0 bg-brand-900 text-brand-100 flex-col">
        <div className="p-6 border-b border-brand-700">
          <p className="font-display text-lg text-white">Admin</p>
          <p className="text-xs text-brand-300 mt-1">Bách Khoa Châu Thành</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <NavLinks />
        </div>
        <form action="/api/auth/logout" method="POST" className="p-4 border-t border-brand-700">
          <button
            type="submit"
            className="flex w-full min-h-11 items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-brand-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </form>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
