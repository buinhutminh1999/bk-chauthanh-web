import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { getSiteConfig, getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({
    title: `Công trình tiêu biểu — ${site.shortName}`,
    description:
      "Hình ảnh và thông tin các dự án cung cấp cống, cọc, gạch, bê tông nhựa và UHPC từ nhà máy Bách Khoa Châu Thành.",
    path: "/cong-trinh",
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        breadcrumb="Công trình"
        title="Công trình tiêu biểu"
        subtitle="Một số dự án đã cung cấp vật liệu xây dựng từ nhà máy Châu Thành"
      />
      <section className="py-16 lg:py-20">
        <Container>
          {projects.length === 0 ? (
            <p className="text-center text-ink-muted py-12">
              Chưa có công trình. Quản trị viên có thể thêm tại Admin.
            </p>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl text-brand-900 mb-6">Nổi bật</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
