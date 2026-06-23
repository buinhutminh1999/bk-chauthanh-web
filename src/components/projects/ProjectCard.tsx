import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0];

  return (
    <article className="group overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="relative aspect-[16/10] bg-brand-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-400 text-sm">
            Không có ảnh
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
        {project.year && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-white/90 text-brand-800 rounded-full">
            {project.year}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.productTypes.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-medium bg-brand-50 text-brand-700 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg text-brand-900 line-clamp-2">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {project.location}
        </p>
        <p className="mt-3 text-sm text-ink-muted line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </div>
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
