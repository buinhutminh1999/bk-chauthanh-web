import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { getFaqs } from "@/lib/content";

export default async function AdminFaqPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const faqs = await getFaqs();

  return (
    <div className="admin-page">
      <h1 className="font-display text-2xl text-brand-900 mb-2">FAQ</h1>
      <p className="text-sm text-ink-muted mb-8">Quản lý câu hỏi thường gặp trên trang Hỏi đáp.</p>
      <FaqEditor initial={faqs} />
    </div>
  );
}
