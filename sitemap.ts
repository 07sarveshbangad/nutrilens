import type { MetadataRoute } from "next";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/about", "/contact", "/methodology", "/privacy", "/terms",
    "/guides/fibre-in-indian-foods", "/guides/vegetarian-protein"
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/guides/") ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.startsWith("/guides/") ? 0.7 : 0.4
  }));
}
