import { preload } from "react-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroImage } from "@/components/ui/HeroImage";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HomeBelowFold } from "@/components/home/HomeBelowFold";
import { getSiteConfig } from "@/lib/content";
import { PRODUCT_LINE_FILTERS, telLink, zaloLink } from "@/lib/site-constants";

export default async function HomePage() {
  const site = await getSiteConfig();
  const heroProductLabels = PRODUCT_LINE_FILTERS.map(({ label }) => label);
  const heroProductText =
    heroProductLabels.length > 1
      ? `${heroProductLabels.slice(0, -1).join(", ")} và ${heroProductLabels.at(-1)}`
      : heroProductLabels.join(", ");

  preload("/images/hero-nha-may-640.avif", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <>
      <section
        className="relative overflow-hidden grain-overlay blueprint-bg-dark min-h-[540px] lg:min-h-[620px] flex items-center border-b border-brand-700/40"
        style={{ minHeight: "540px" }}
      >
        <div className="absolute inset-0" style={{ position: "absolute", inset: 0 }}>
          <HeroImage
            alt={`Nhà máy sản xuất ${site.shortName}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/96 via-brand-900/82 to-brand-800/55" />
          <div className="absolute inset-0 blueprint-bg-dark opacity-40" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-accent to-brand-600" />
        <Container className="relative py-20 lg:py-28">
          <div className="max-w-2xl animate-fade-up">
            <p className="section-eyebrow section-eyebrow-light mb-5">
              {site.shortName}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] text-white leading-[1.08] tracking-tight">
              {site.tagline}
            </h1>
            <p className="mt-6 text-lg text-brand-100 leading-relaxed max-w-xl">
              Sản xuất {heroProductText} tại Châu Thành, An Giang.
            </p>
            <div className="slab-divider" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/san-pham" size="lg" variant="accent">
                Khám phá sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/bang-gia" variant="outline-light" size="lg">
                Yêu cầu báo giá
              </Button>
              {site.phone && (
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto pt-1 sm:pt-0">
                  <a
                    href={telLink(site.phone)}
                    className="inline-flex min-h-12 flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-md font-semibold bg-brand-700 text-white hover:bg-brand-600 transition-colors border border-brand-600/40 sm:px-6"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="truncate">{site.phone}</span>
                  </a>
                  <a
                    href={zaloLink(site.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-md font-semibold bg-zalo text-white hover:bg-zalo-hover transition-colors sm:px-6"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Zalo
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />

      <HomeBelowFold site={site} />
    </>
  );
}
