import { notFound } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { PostForm } from "@/components/admin/PostForm";
import { getPostById } from "@/lib/content";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="p-8 lg:p-10">
      <h1 className="font-display text-2xl text-brand-900">Sửa bài viết</h1>
      <div className="mt-8">
        <PostForm mode="edit" initial={post} />
      </div>
    </div>
  );
}
