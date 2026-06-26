import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/shared/JsonLd";
import { CTABanner } from "@/components/shared/CTABanner";
import { getProjectBySlug, getProjects, getSiteConfig } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const site = await getSiteConfig();
  return buildMetadata({
    title: `${project.title} — ${site.shortName}`,
    description: project.description,
    path: `/cong-trinh/${project.slug}`,
    image: project.images[0],
    siteName: site.shortName,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const site = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Công trình", path: "/cong-trinh" },
          { name: project.title, path: `/cong-trinh/${project.slug}` },
        ])}
      />
      <JsonLd
        data={projectJsonLd({
          title: project.title,
          description: project.description,
          slug: project.slug,
          images: project.images,
          location: project.location,
          year: project.year,
          siteName: site.shortName,
        })}
      />

      <section className="py-8 lg:py-12">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-600">
              <li>
                <Link href="/" className="hover:text-brand-900">
                  Trang chủ
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/cong-trinh" className="hover:text-brand-900">
                  Công trình
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-brand-900 font-medium line-clamp-1">
                {project.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/cong-trinh"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả công trình
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start min-w-0">
            <ImageGallery images={project.images} alt={project.title} className="min-w-0" />

            <div className="min-w-0 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.productTypes.map((type) => (
                    <Badge key={type}>{type}</Badge>
                  ))}
                  {project.year && <Badge variant="dark">{project.year}</Badge>}
                </div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-brand-900">
                  {project.title}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
                  {project.location}
                </p>
                <p className="mt-4 text-lg text-ink-muted leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
