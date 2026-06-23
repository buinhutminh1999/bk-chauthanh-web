import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  return (
    <div className="p-4 sm:p-8 lg:p-10">
      <h1 className="font-display text-2xl text-brand-900">Thêm bài viết</h1>
      <div className="mt-8">
        <PostForm mode="create" />
      </div>
    </div>
  );
}
