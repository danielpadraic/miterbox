"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, type Review } from "@/data/reviews";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

const SWIPE_THRESHOLD = 56;
const EASE = [0.22, 1, 0.36, 1] as const;
const ACTIVE_SCALE = 1.04;
const SIDE_SCALE = 0.8;
const SIDE_OPACITY = 0.36;
const SIDE_Y = 20;
const PEEK = 78;

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
      className={`review-card relative flex h-full w-full flex-col px-5 py-4 sm:px-6 sm:py-5 ${
        review.placeholder ? "review-card--placeholder" : ""
      } ${active ? "review-card--active" : "review-card--side"}`}
    >
      {review.placeholder ? (
        <p className="type-meta mb-2 text-center text-[0.55rem] text-walnut/70">
          Placeholder — replace later
        </p>
      ) : null}

      <div
        className={`mx-auto shrink-0 transition-[width] duration-500 ease-out ${
          active
            ? "mb-3 w-[7.25rem] sm:mb-4 sm:w-[9.5rem]"
            : "mb-2.5 w-[5rem] sm:mb-3 sm:w-[5.75rem]"
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
              ? "drop-shadow-[0_10px_22px_rgba(28,28,26,0.2)]"
              : "opacity-70 drop-shadow-[0_3px_8px_rgba(28,28,26,0.1)]"
          }`}
        />
      </div>

      <blockquote className="flex-1 text-center">
        <p
          className={`font-serif type-quote text-charcoal transition-[font-size] duration-500 ${
            active
              ? "text-[0.82rem] leading-[1.65] sm:text-[0.95rem]"
              : "line-clamp-5 text-[0.75rem] leading-[1.55] sm:text-[0.8rem]"
          }`}
        >
          “{review.quote}”
        </p>
      </blockquote>

      <footer className="mt-3 border-t border-charcoal/8 pt-2.5 text-center sm:mt-3.5 sm:pt-3">
        <p
          className={`font-medium tracking-wide text-charcoal ${
            active ? "text-xs sm:text-sm" : "text-[0.7rem]"
          }`}
        >
          {review.name}
        </p>
        <p className="type-meta mt-0.5 text-charcoal/50">
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
  const duration = reduceMotion ? 0 : 0.6;
  const activeScale = isNarrow ? 1 : ACTIVE_SCALE;

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

  // Mobile: single centered card (no side peeks). Desktop: focused center + peeks.
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
      className="scroll-mt-24 border-t border-charcoal/8 bg-[#F3EFE9]/60 px-5 py-16 sm:px-8 sm:py-32"
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

        <FadeIn delay={0.08} className="mt-10 sm:mt-16">
          <div className="relative mx-auto max-w-5xl">
            <div className="reviews-stage relative mx-auto h-[24.5rem] overflow-hidden sm:h-[32rem] md:h-[34rem]">
              <AnimatePresence initial={false}>
                {slots.map(({ review: item, offset }) => {
                  const active = offset === 0;
                  const peek = offset * PEEK;

                  return (
                    <motion.div
                      key={item.id}
                      className={`absolute left-1/2 top-[48%] w-[min(calc(100%-4.75rem),20.5rem)] sm:w-[23rem] md:w-[25.5rem] ${
                        active
                          ? "cursor-grab active:cursor-grabbing"
                          : "cursor-pointer"
                      }`}
                      style={{ zIndex: active ? 3 : 1 }}
                      initial={{
                        x: `calc(-50% + ${offset * (PEEK + 16)}%)`,
                        y: `calc(-50% + ${SIDE_Y + 8}px)`,
                        scale: active ? activeScale : SIDE_SCALE - 0.04,
                        opacity: active ? 0.85 : 0.18,
                      }}
                      animate={{
                        x: `calc(-50% + ${peek}%)`,
                        y: active ? "-50%" : `calc(-50% + ${SIDE_Y}px)`,
                        scale: active ? activeScale : SIDE_SCALE,
                        opacity: active ? 1 : SIDE_OPACITY,
                      }}
                      exit={{
                        opacity: 0,
                        scale: SIDE_SCALE - 0.08,
                        y: `calc(-50% + ${SIDE_Y + 10}px)`,
                        transition: { duration: duration * 0.65, ease: EASE },
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
              </AnimatePresence>
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
              className="mt-6 flex items-center justify-center gap-0.5 sm:mt-10 sm:gap-1"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-walnut"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-walnut"
                        : "w-1.5 bg-charcoal/20"
                    }`}
                  />
                </button>
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
