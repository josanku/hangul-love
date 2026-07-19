import type { MetadataRoute } from "next";
import { BOOK_TOTAL, type Lang } from "@/lib/bookPages";
import { CHAPTERS } from "@/lib/chapters";

const BASE = "https://hangul.love";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/book", "/book/jeoma", "/learn", "/art", "/name", "/search", "/about"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const chapterPages = CHAPTERS.map((c) => ({
    url: `${BASE}/book/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const readPages: MetadataRoute.Sitemap = [];
  (["ko", "en"] as Lang[]).forEach((lang) => {
    for (let n = 1; n <= BOOK_TOTAL[lang]; n++) {
      readPages.push({
        url: `${BASE}/read/${lang}/${n}`,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  });

  return [...staticPages, ...chapterPages, ...readPages];
}
