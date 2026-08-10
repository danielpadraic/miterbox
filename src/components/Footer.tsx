import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/8 px-5 py-8 pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+5.5rem))] sm:px-8 sm:py-10 sm:pb-10">
      {/* Extra bottom padding on mobile so the floating CTA doesn’t cover the copyright */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
        <a
          href="#top"
          aria-label="MITERBOX home"
          className="inline-flex min-h-11 items-center"
        >
          <BrandLogo size="footer" />
        </a>
        <div className="flex flex-col items-center gap-1.5 text-center sm:items-end sm:text-right">
          <p className="text-xs tracking-[0.06em] text-charcoal/45">
            Based in Nampa, Idaho
          </p>
          <p className="text-xs tracking-[0.04em] text-charcoal/40">
            © {year} MITERBOX
          </p>
        </div>
      </div>
    </footer>
  );
}
