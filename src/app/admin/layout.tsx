import { verifySession } from "@/lib/auth";
import { AdminChrome } from "@/components/admin/AdminChrome";

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
