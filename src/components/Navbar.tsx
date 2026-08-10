"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-charcoal/8 bg-ivory/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="relative z-10 block shrink-0" aria-label="MITERBOX home">
          <BrandLogo size="nav" priority />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-charcoal/75 transition-colors duration-300 hover:text-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-10 inline-flex items-center justify-center rounded-sm p-2 text-charcoal md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 bg-ivory/97 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-2 px-8 py-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    className="block py-3 font-serif text-3xl text-charcoal"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
