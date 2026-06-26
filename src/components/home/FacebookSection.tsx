import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink } from "lucide-react";

export function FacebookSection({ facebookUrl }: { facebookUrl: string }) {
  return (
    <Section className="bg-brand-50/60 border-y border-brand-100/80">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeader
            eyebrow="Fanpage"
            title="Theo dõi Nhà máy Bê tông Châu Thành"
            description="Cập nhật hoạt động sản xuất, tin tức công ty và hình ảnh thực tế từ nhà máy trên Facebook."
          />
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-md bg-facebook text-white font-semibold hover:bg-facebook-hover transition-colors"
          >
            Theo dõi Fanpage
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-lg max-w-full overflow-hidden ring-1 ring-brand-100 bg-white shadow-card">
          <iframe
            title="Facebook Bê tông Châu Thành"
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookUrl)}&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            className="w-full max-w-full h-[360px] sm:h-[400px] border-0"
            loading="lazy"
            allow="encrypted-media"
          />
        </div>
      </div>
    </Section>
  );
}
