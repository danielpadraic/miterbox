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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide while the modal is open so it doesn’t compete with the dialog
  const show = visible && !isOpen;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={openInquiry}
            className="pointer-events-auto group inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-walnut px-4 py-3 text-ivory shadow-[0_10px_28px_rgba(28,28,26,0.16)] transition-[transform,box-shadow,background-color] duration-300 hover:scale-[1.03] hover:bg-walnut-soft hover:shadow-[0_14px_34px_rgba(28,28,26,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-charcoal sm:min-h-[3.25rem] sm:px-5"
            aria-haspopup="dialog"
          >
            <MessageCircle
              size={17}
              strokeWidth={1.5}
              className="shrink-0 opacity-90"
              aria-hidden
            />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] sm:text-[0.72rem]">
              Start a Conversation
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
