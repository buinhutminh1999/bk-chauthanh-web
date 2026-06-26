import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const authed = await verifySession();
  if (!authed) return <LoginForm />;

  return (
    <div className="admin-page">
      <h1 className="font-display text-2xl text-brand-900">Thêm sản phẩm</h1>
      <div className="mt-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
