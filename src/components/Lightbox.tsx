"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { projectGallery, type Project } from "@/data/projects";

type LightboxProps = {
  project: Project | null;
  onClose: () => void;
};

export function Lightbox({ project, onClose }: LightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [slide, setSlide] = useState(0);

  const gallery = project ? projectGallery(project) : [];
  const hasCarousel = gallery.length > 1;
  const currentSrc = gallery[slide] ?? project?.image ?? "";

  useEffect(() => {
    setSlide(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (hasCarousel && e.key === "ArrowLeft") {
        e.preventDefault();
        setSlide((s) => (s - 1 + gallery.length) % gallery.length);
      }
      if (hasCarousel && e.key === "ArrowRight") {
        e.preventDefault();
        setSlide((s) => (s + 1) % gallery.length);
      }

      if (e.key === "Tab") {
        const dialog = document.getElementById("miterbox-lightbox");
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [project, onClose, hasCarousel, gallery.length]);

  const previous = () =>
    setSlide((s) => (s - 1 + gallery.length) % gallery.length);
  const next = () => setSlide((s) => (s + 1) % gallery.length);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            id="miterbox-lightbox"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl overflow-hidden bg-ivory shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm bg-ivory/90 text-charcoal transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut sm:right-3 sm:top-3"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="relative aspect-[4/3] w-full bg-charcoal/5 sm:aspect-[16/10]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSrc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSrc}
                    alt={`${project.title} — ${project.caption}${hasCarousel ? `, photo ${slide + 1} of ${gallery.length}` : ""}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {hasCarousel ? (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-ivory/90 text-charcoal transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut sm:left-3"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-ivory/90 text-charcoal transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut sm:right-14"
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>

                  <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-sm bg-charcoal/55 px-1.5 py-1 backdrop-blur-sm sm:bottom-3 sm:gap-1 sm:px-2">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Show photo ${i + 1}`}
                        aria-current={i === slide}
                        onClick={() => setSlide(i)}
                        className="inline-flex h-11 w-11 items-center justify-center"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all ${
                            i === slide
                              ? "w-5 bg-ivory"
                              : "w-1.5 bg-ivory/45"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="flex items-baseline justify-between gap-4 px-5 py-4 sm:px-7">
              <div>
                <p
                  id={titleId}
                  className="font-serif text-lg leading-snug tracking-tight text-charcoal sm:text-xl"
                >
                  {project.title}
                </p>
                <p className="type-prose mt-1 text-sm text-charcoal/60">
                  {project.caption}
                </p>
                {hasCarousel ? (
                  <p className="type-meta mt-2 text-walnut">
                    {slide + 1} / {gallery.length}
                  </p>
                ) : null}
              </div>
              <span className="type-meta shrink-0 text-walnut">
                {project.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Small badge for gallery tiles that open a multi-photo carousel */
export function GalleryCarouselHint() {
  return (
    <span className="type-meta inline-flex items-center gap-1.5 rounded-sm bg-charcoal/45 px-2 py-1 text-[0.6rem] text-ivory backdrop-blur-sm">
      <Images size={11} strokeWidth={1.75} aria-hidden />
      Gallery
    </span>
  );
}
