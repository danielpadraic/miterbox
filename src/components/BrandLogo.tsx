import Image from "next/image";

type BrandLogoProps = {
  /** Visual size variant */
  size?: "nav" | "hero" | "footer";
  className?: string;
  priority?: boolean;
};

const variants = {
  nav: {
    src: "/images/menu-logo.png",
    width: 1471,
    height: 223,
    className: "h-8 w-auto sm:h-9",
  },
  hero: {
    src: "/images/hero-logo.png",
    width: 1180,
    height: 894,
    className: "mx-auto h-auto w-[min(72vw,18rem)] sm:w-[22rem] md:w-[26rem]",
  },
  footer: {
    src: "/images/menu-logo.png",
    width: 1471,
    height: 223,
    className: "h-7 w-auto opacity-90",
  },
} as const;

/**
 * Brand marks from /public/images/
 * - Hero: hero-logo.png
 * - Nav / footer: menu-logo.png
 */
export function BrandLogo({
  size = "nav",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const config = variants[size];

  return (
    <Image
      src={config.src}
      alt="MITERBOX"
      width={config.width}
      height={config.height}
      priority={priority}
      className={`${config.className} ${className}`.trim()}
    />
  );
}
