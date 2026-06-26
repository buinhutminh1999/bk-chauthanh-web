import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { JsonLd } from "@/components/shared/JsonLd";
import { getSiteConfig, getProjects } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Công trình tiêu biểu — ${site.shortName}`,
    description:
      `Hình ảnh và thông tin các dự án cung cấp cống, cọc, gạch, bê tông nhựa và UHPC từ nhà máy ${site.shortName}.`,
    path: "/cong-trinh",
    siteName: site.shortName,
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Công trình", path: "/cong-trinh" },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Công trình" },
        ]}
        title="Công trình tiêu biểu"
        subtitle="Một số dự án đã cung cấp vật liệu xây dựng từ nhà máy Châu Thành"
      />
      <section className="py-16 lg:py-20">
        <Container>
          {projects.length === 0 ? (
            <EmptyState
              title="Chưa có công trình"
              description="Quản trị viên có thể thêm công trình tiêu biểu tại Admin."
            />
          ) : (
            <>
              {featured.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl text-brand-900 mb-6">Nổi bật</h2>
                  <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </div>
              )}
              {others.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <h2 className="font-display text-2xl text-brand-900 mb-6">Khác</h2>
                  )}
                  <div className="grid grid-cols-1 min-[414px]:grid-cols-2 lg:grid-cols-3 gap-6">
                    {others.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
