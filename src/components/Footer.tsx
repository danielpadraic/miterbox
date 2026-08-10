import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/8 px-5 py-12 pb-24 sm:px-8 sm:pb-12">
      {/* Extra bottom padding on mobile so the floating CTA doesn’t cover the copyright */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="#top" aria-label="MITERBOX home">
          <BrandLogo size="footer" />
        </a>
        <p className="text-center text-xs tracking-wide text-charcoal/50 sm:text-right">
          © {year} MITERBOX. Est. 1994. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
