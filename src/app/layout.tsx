import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miterbox.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MITERBOX — Cabinetry & Artisan Carpentry",
    template: "%s — MITERBOX",
  },
  description:
    "Handcrafted custom cabinetry and artisan carpentry in Nampa, Idaho. Established 1994. One or two projects a month — designed and built by hand for Ada and Canyon Counties.",
  keywords: [
    "custom cabinetry",
    "artisan carpentry",
    "Nampa Idaho",
    "Ada County",
    "Canyon County",
    "Treasure Valley",
    "handcrafted kitchens",
    "built-ins",
  ],
  authors: [{ name: "MITERBOX" }],
  // Favicons: src/app/favicon.ico, icon.png, apple-icon.png (MB monogram on white circle)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MITERBOX",
    title: "MITERBOX — Cabinetry & Artisan Carpentry",
    description:
      "Handcrafted for the few who notice the difference. Custom cabinetry since 1994 — from a private workshop in Nampa, Idaho.",
    images: [
      {
        // TODO: Replace with a dedicated Open Graph image of your best work
        url: "/gallery/kitchen-walnut.jpg",
        width: 1200,
        height: 800,
        alt: "MITERBOX custom cabinetry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MITERBOX — Cabinetry & Artisan Carpentry",
    description:
      "Handcrafted custom cabinetry since 1994 — from a private workshop in Nampa, Idaho.",
    images: ["/gallery/kitchen-walnut.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} min-h-screen bg-ivory font-sans text-charcoal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
