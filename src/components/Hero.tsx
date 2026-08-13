"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInquiry } from "@/components/InquiryProvider";
import { BrandLogo } from "@/components/BrandLogo";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { openInquiry } = useInquiry();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24"
    >
      {/* Soft atmosphere — not a flat wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,115,85,0.08),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(28,28,26,0.04),transparent_50%)]"
      />
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.35]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-10"
        >
          {/*
            Hero logo PNG: monogram + MITERBOX stay black; tagline + rules should be bronze (#A67C52).
            Current file was recolored programmatically — swap in a designer-exported
            /public/images/hero-logo.png if you have a cleaner bronze tagline version.
          */}
          <BrandLogo size="hero" priority />
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-serif text-[1.95rem] leading-[1.15] tracking-tight text-charcoal sm:text-5xl md:text-[3.35rem]"
        >
          Handcrafted for the few who notice the difference.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="type-prose mt-5 max-w-xl text-[0.95rem] text-charcoal/65 sm:mt-6 sm:text-lg"
        >
          At the bench since 1994. One craftsman. One or two projects a
          month, built by hand in Nampa.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5"
        >
          <a href="#work" className="btn-primary w-full sm:w-auto">
            View Selected Work
          </a>
          <button
            type="button"
            onClick={openInquiry}
            className="btn-secondary w-full sm:w-auto"
          >
            Start a Conversation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
