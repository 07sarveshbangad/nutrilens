import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteChrome from "../components/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NutriLens — Fibre & Protein in Your Food",
    template: "%s | NutriLens"
  },
  description: "Look up fibre and protein in everyday Indian and international foods. Choose a food, set your portion weight, and view nutrition values with source information.",
  applicationName: "NutriLens",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "NutriLens",
    title: "NutriLens — Fibre & Protein in Your Food",
    description: "Explore food nutrition with portion-based fibre and protein calculations.",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriLens — Fibre & Protein in Your Food",
    description: "Look up fibre and protein in everyday foods."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f1"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
