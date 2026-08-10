"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useInquiry } from "@/components/InquiryProvider";

/** Show after the hero is mostly past */
const SCROLL_THRESHOLD = 320;

export function FloatingCTA() {
  const { openInquiry, isOpen } = useInquiry();
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade away once the page contact form is on screen — no competing CTAs
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      // Expand root so the FAB fades before covering fields / submit
      { rootMargin: "48px 0px 120px 0px", threshold: 0 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  // Hide while the modal is open or the inline contact section is visible
  const show = visible && !isOpen && !contactInView;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none fixed z-40 bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+1rem))] right-[max(1.25rem,calc(env(safe-area-inset-right,0px)+1rem))] sm:bottom-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] sm:right-[max(2rem,calc(env(safe-area-inset-right,0px)+1.5rem))]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={openInquiry}
            aria-label="Start a Conversation"
            aria-haspopup="dialog"
            className="pointer-events-auto group inline-flex min-h-11 items-center gap-2 rounded-sm border border-charcoal/12 bg-ivory/95 px-3.5 py-2.5 text-charcoal shadow-[0_4px_18px_rgba(28,28,26,0.07)] backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-charcoal/22 hover:bg-ivory hover:shadow-[0_6px_22px_rgba(28,28,26,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-walnut sm:min-h-12 sm:gap-2.5 sm:px-4 sm:py-3"
          >
            <MessageCircle
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-walnut opacity-80 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <span className="type-label text-[0.65rem] tracking-[0.18em] text-charcoal/85 sm:text-[0.68rem]">
              Start a Conversation
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
