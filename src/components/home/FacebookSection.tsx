import { Container } from "@/components/ui/Container";
import { ExternalLink } from "lucide-react";

export function FacebookSection({ facebookUrl }: { facebookUrl: string }) {
  return (
    <section className="py-16 lg:py-20 bg-brand-50/60">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              Fanpage
            </p>
            <h2 className="mt-2 font-display text-3xl text-brand-900">
              Theo dõi Nhà máy Bê tông Châu Thành
            </h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Cập nhật hoạt động sản xuất, tin tức công ty và hình ảnh thực tế từ nhà máy trên
              Facebook.
            </p>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white font-medium hover:bg-[#166FE5] transition-colors"
            >
              Theo dõi Fanpage
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-brand-100 bg-white shadow-md">
            <iframe
              title="Facebook Bách Khoa Châu Thành"
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookUrl)}&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
              className="w-full h-[400px] border-0"
              loading="lazy"
              allow="encrypted-media"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
