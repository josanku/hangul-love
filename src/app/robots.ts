import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all crawlers (incl. AI) to read the book text; keep admin private.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: "https://hangul.love/sitemap.xml",
    host: "https://hangul.love",
  };
}
