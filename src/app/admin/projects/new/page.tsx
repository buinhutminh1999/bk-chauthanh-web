import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  return (
    <div className="p-4 sm:p-8 lg:p-10">
      <h1 className="font-display text-2xl text-brand-900 mb-8">Thêm công trình</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
