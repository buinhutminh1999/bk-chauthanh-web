import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function RootNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface px-4">
      <Container className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">404</p>
        <h1 className="mt-3 font-display text-2xl text-brand-900">Không tìm thấy trang</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Trang bạn tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/">Về trang chủ</Button>
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center px-5 rounded-md text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Admin
          </Link>
        </div>
      </Container>
    </main>
  );
}
