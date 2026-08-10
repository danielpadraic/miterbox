"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, type Review } from "@/data/reviews";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

const SWIPE_THRESHOLD = 56;
const EASE = [0.22, 1, 0.36, 1] as const;

function useIsNarrow() {
  // Assume narrow until measured to avoid a desktop-layout flash on phones
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return narrow;
}

function ReviewCard({
  review,
  active,
}: {
  review: Review;
  active: boolean;
}) {
  return (
    <article
      className={`review-card relative flex h-full w-full flex-col px-5 py-5 sm:px-6 sm:py-7 ${
        review.placeholder ? "review-card--placeholder" : ""
      } ${active ? "review-card--active" : "review-card--side"}`}
    >
      {review.placeholder ? (
        <p className="mb-3 text-center text-[0.55rem] font-medium uppercase tracking-[0.18em] text-walnut/70">
          Placeholder — replace later
        </p>
      ) : null}

      <div
        className={`mx-auto mb-4 transition-[width] duration-500 ease-out sm:mb-5 ${
          active ? "w-[7.5rem] sm:w-[9rem]" : "w-[5.75rem] sm:w-[6.5rem]"
        }`}
      >
        <Image
          src="/images/5-star-seal.png"
          alt={active ? "5-star customer review" : ""}
          width={512}
          height={430}
          aria-hidden={!active}
          className={`h-auto w-full transition-opacity duration-500 ${
            active
              ? "drop-shadow-[0_8px_18px_rgba(28,28,26,0.16)]"
              : "opacity-80 drop-shadow-[0_4px_10px_rgba(28,28,26,0.1)]"
          }`}
        />
      </div>

      <blockquote className="flex-1 text-center">
        <p
          className={`font-serif leading-[1.55] text-charcoal transition-[font-size] duration-500 ${
            active
              ? "text-[0.85rem] sm:text-[0.95rem] sm:leading-[1.65]"
              : "line-clamp-6 text-[0.78rem] sm:text-[0.82rem]"
          }`}
        >
          “{review.quote}”
        </p>
      </blockquote>

      <footer className="mt-4 border-t border-charcoal/8 pt-3 text-center sm:mt-5 sm:pt-4">
        <p
          className={`font-medium tracking-wide text-charcoal ${
            active ? "text-xs sm:text-sm" : "text-[0.7rem]"
          }`}
        >
          {review.name}
        </p>
        <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-charcoal/50">
          {review.location}
        </p>
      </footer>
    </article>
  );
}

export function Reviews() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isNarrow = useIsNarrow();
  const total = reviews.length;
  const review = reviews[index];
  const duration = reduceMotion ? 0 : 0.55;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("reviews");
      if (!section) return;
      if (!section.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") previous();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previous, next]);

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -400) next();
    else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 400)
      previous();
  };

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  const slots: { review: Review; offset: -1 | 0 | 1 }[] = isNarrow
    ? [{ review: reviews[index], offset: 0 }]
    : [
        { review: reviews[prevIndex], offset: -1 },
        { review: reviews[index], offset: 0 },
        { review: reviews[nextIndex], offset: 1 },
      ];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 border-t border-charcoal/8 bg-[#F3EFE9]/60 px-5 py-24 sm:px-8 sm:py-32"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            id="reviews-heading"
            eyebrow="Kind words"
            title="Real Customer Reviews"
            description="A few notes from homeowners who trusted the work — and the hands behind it."
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12 sm:mt-16">
          <div className="relative mx-auto max-w-5xl">
            <div className="reviews-stage relative mx-auto h-[30rem] overflow-hidden sm:h-[34rem] md:h-[36rem]">
              {slots.map(({ review: item, offset }) => {
                const active = offset === 0;
                const peek = offset * 76;

                return (
                  <motion.div
                    key={item.id}
                    className={`absolute left-1/2 top-[48%] w-[min(100%,21rem)] sm:w-[22rem] md:w-[24rem] ${
                      active
                        ? "cursor-grab active:cursor-grabbing"
                        : "cursor-pointer"
                    }`}
                    style={{ zIndex: active ? 3 : 1 }}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${peek}%)`,
                      y: active ? "-50%" : "calc(-50% + 14px)",
                      scale: active ? 1 : 0.84,
                      opacity: active ? 1 : 0.4,
                    }}
                    transition={{ duration, ease: EASE }}
                    drag={active ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={active ? onDragEnd : undefined}
                    onClick={() => {
                      if (offset === -1) previous();
                      if (offset === 1) next();
                    }}
                    aria-hidden={!active}
                  >
                    <ReviewCard review={item} active={active} />
                  </motion.div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous review"
              className="review-nav-btn absolute left-0 top-[48%] z-20 -translate-y-1/2 sm:left-1 lg:-left-2"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="review-nav-btn absolute right-0 top-[48%] z-20 -translate-y-1/2 sm:right-1 lg:-right-2"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>

            <div
              className="mt-8 flex items-center justify-center gap-2 sm:mt-10"
              role="tablist"
              aria-label="Review slides"
            >
              {reviews.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show review ${i + 1} of ${total}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-walnut"
                      : "w-1.5 bg-charcoal/20 hover:bg-charcoal/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <p className="sr-only" aria-live="polite">
          Review {index + 1} of {total}: {review.name}
        </p>
      </div>
    </section>
  );
}
