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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
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
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          {/*
            Hero logo PNG: monogram + MITERBOX stay black; tagline + rules should be bronze (#A67C52).
            Current file was recolored programmatically — swap in a designer-exported
            /public/images/hero-logo.png if you have a cleaner bronze tagline version.
          */}
          <BrandLogo size="hero" priority />
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-serif text-[2.05rem] leading-[1.15] tracking-tight text-charcoal sm:text-5xl md:text-[3.35rem]"
        >
          Handcrafted for the few who notice the difference.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/65 sm:text-lg"
        >
          Since 1994 at the bench. One craftsman. One or two projects a
          month — designed and built by hand in Nampa, Idaho.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:gap-5"
        >
          <a href="#work" className="btn-primary">
            View Selected Work
          </a>
          <button
            type="button"
            onClick={openInquiry}
            className="btn-secondary"
          >
            Start a Conversation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
