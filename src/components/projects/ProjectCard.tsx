import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0];

  return (
    <article className="group overflow-hidden card-base card-interactive">
      <Link href={`/cong-trinh/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-brand-100 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-steel text-sm">
              Không có ảnh
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/65 via-brand-900/15 to-transparent" />
          {project.year && (
            <Badge variant="dark" className="absolute top-3 right-3 backdrop-blur-sm">
              {project.year}
            </Badge>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.productTypes.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h3 className="font-display text-lg text-brand-900 line-clamp-2 group-hover:text-brand-700 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-steel">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            {project.location}
          </p>
          <p className="mt-3 text-sm text-ink-muted line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length <= 1) return null;

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.slice(1).map((src) => (
        <div
          key={src}
          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-50 ring-1 ring-brand-100"
        >
          <Image src={src} alt={title} fill className="object-cover" sizes="200px" />
        </div>
      ))}
    </div>
  );
}
