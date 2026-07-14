import "server-only";
import fs from "node:fs";
import path from "node:path";
import { BOOK_TOTAL, TOC, type Lang } from "./bookPages";

const DIR = path.join(process.cwd(), "src", "content", "pages");

export function getPageText(lang: Lang, n: number): string {
  try {
    return fs.readFileSync(path.join(DIR, lang, `p-${String(n).padStart(3, "0")}.txt`), "utf8");
  } catch {
    return "";
  }
}

/** Which chapter a given page belongs to (by TOC start pages). */
export function chapterOfPage(lang: Lang, n: number): { koTitle: string; enTitle: string; slug: string } | null {
  let current = null as (typeof TOC)[number] | null;
  for (const e of TOC) {
    const start = lang === "ko" ? e.koStart : e.enStart;
    if (start <= n) current = e;
    else break;
  }
  return current ? { koTitle: current.koTitle, enTitle: current.enTitle, slug: current.slug } : null;
}

// ── Search index (built once per server instance, cached) ────────────
type IndexEntry = { lang: Lang; page: number; text: string; lower: string };
let _index: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  if (_index) return _index;
  const idx: IndexEntry[] = [];
  (["ko", "en"] as Lang[]).forEach((lang) => {
    for (let n = 1; n <= BOOK_TOTAL[lang]; n++) {
      const text = getPageText(lang, n);
      if (text.trim()) idx.push({ lang, page: n, text, lower: text.toLowerCase() });
    }
  });
  _index = idx;
  return idx;
}

export type SearchHit = {
  lang: Lang;
  page: number;
  snippet: string;
  chapterKo: string;
  chapterEn: string;
};

export function search(query: string, limit = 60): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const idx = buildIndex();
  const hits: SearchHit[] = [];
  for (const e of idx) {
    const pos = e.lower.indexOf(q);
    if (pos === -1) continue;
    const start = Math.max(0, pos - 60);
    const end = Math.min(e.text.length, pos + q.length + 90);
    let snippet = e.text.slice(start, end).replace(/\s+/g, " ").trim();
    if (start > 0) snippet = "…" + snippet;
    if (end < e.text.length) snippet = snippet + "…";
    const ch = chapterOfPage(e.lang, e.page);
    hits.push({
      lang: e.lang,
      page: e.page,
      snippet,
      chapterKo: ch?.koTitle ?? "",
      chapterEn: ch?.enTitle ?? "",
    });
    if (hits.length >= limit) break;
  }
  return hits;
}
