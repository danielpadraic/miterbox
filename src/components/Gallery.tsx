"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projectGallery, projects, type Project } from "@/data/projects";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryCarouselHint, Lightbox } from "@/components/Lightbox";

export function Gallery() {
  const [active, setActive] = useState<Project | null>(null);

  const orderedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))),
    [],
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            id="work-heading"
            eyebrow="Portfolio"
            title="Selected Work"
            description="A quiet selection of kitchens, built-ins, and custom pieces — each made by hand for a unique client and their home."
          />
        </FadeIn>

        <div className="mt-10 columns-1 gap-4 sm:mt-12 sm:columns-2 sm:gap-5 lg:columns-3">
          {orderedProjects.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={Math.min(index * 0.05, 0.25)}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                className={`hover-lift group relative block w-full overflow-hidden bg-charcoal/5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-walnut ${
                  project.featured ? "aspect-[4/5]" : "aspect-[5/6]"
                }`}
                aria-label={`View ${project.title}${projectGallery(project).length > 1 ? ` (${projectGallery(project).length} photos)` : ""}`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.caption}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                {projectGallery(project).length > 1 ? (
                  <div className="absolute right-3 top-3 z-10">
                    <GalleryCarouselHint />
                  </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="type-meta text-ivory/70">
                    {project.category}
                  </p>
                  <p className="mt-1 font-serif text-lg leading-snug tracking-tight text-ivory sm:text-xl">
                    {project.title}
                  </p>
                  <p className="mt-1 max-w-[28ch] text-sm leading-[1.45] tracking-[0.01em] text-ivory/75 opacity-90 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                    {project.caption}
                  </p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
