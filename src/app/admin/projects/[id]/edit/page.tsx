import { notFound } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/content";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="admin-page">
      <h1 className="font-display text-2xl text-brand-900 mb-8">Sửa công trình</h1>
      <ProjectForm mode="edit" initial={project} />
    </div>
  );
}
