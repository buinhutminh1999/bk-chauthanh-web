import type { Metadata } from "next";
import { verifySession } from "@/lib/auth";
import { AdminChrome } from "@/components/admin/AdminChrome";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Quản trị",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await verifySession();

  if (!authed) {
    return <main className="flex-1 min-w-0">{children}</main>;
  }

  return <AdminChrome>{children}</AdminChrome>;
}
