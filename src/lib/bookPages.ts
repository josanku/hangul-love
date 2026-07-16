// Flipbook page manifest for both books.
// KO page ranges are the book's own "원본 페이지" (authoritative, 388p).
// EN page ranges are computed from the split chapter PDFs (428p; slight drift
// in later chapters — good enough to jump near a chapter start).

export type Lang = "ko" | "en";

export type TocEntry = {
  slug: string;
  koTitle: string;
  enTitle: string;
  koStart: number;
  enStart: number;
};

export const BOOK_TOTAL: Record<Lang, number> = { ko: 388, en: 428 };

export const BOOK_TITLE: Record<Lang, string> = {
  ko: "한글정음 — 우주비밀코드",
  en: "HANGUL, The Cosmic Philosophy",
};

// Cover image = page 1 of each book.
export const coverSrc = (lang: Lang) => `/pages/${lang}/p-${pad(lang, 1)}.jpg`;

// pdftoppm zero-pads to the digit-width of the last page (3 for both books).
export function pad(lang: Lang, n: number): string {
  const width = String(BOOK_TOTAL[lang]).length; // 3
  return String(n).padStart(width, "0");
}

export const pageSrc = (lang: Lang, n: number) => `/pages/${lang}/p-${pad(lang, n)}.jpg`;

export const TOC: TocEntry[] = [
  { slug: "cover", koTitle: "표지 · 여는 글", enTitle: "Cover & Intro", koStart: 1, enStart: 1 },
  { slug: "hunmin-sejong", koTitle: "훈민정음 · 세종 서문", enTitle: "Hunminjeongeum · Sejong's Preface", koStart: 13, enStart: 13 },
  { slug: "toc-intro", koTitle: "목차와 머리말", enTitle: "Contents & Introduction", koStart: 41, enStart: 45 },
  { slug: "principles", koTitle: "정음 풀이 1 · 창제원리", enTitle: "Explanation 1 · Principles of Creation", koStart: 53, enStart: 63 },
  { slug: "initials", koTitle: "정음 풀이 2 · 첫소리", enTitle: "Explanation 2 · Initial Consonants", koStart: 149, enStart: 171 },
  { slug: "medials", koTitle: "정음 풀이 3 · 가운뎃소리", enTitle: "Explanation 3 · Medial Vowels", koStart: 155, enStart: 178 },
  { slug: "finals", koTitle: "정음 풀이 4 · 끝소리", enTitle: "Explanation 4 · Final Consonants", koStart: 167, enStart: 191 },
  { slug: "harmony", koTitle: "정음 풀이 5 · 첫가끝 어울림", enTitle: "Explanation 5 · Three-Sound Harmony", koStart: 179, enStart: 204 },
  { slug: "usage", koTitle: "정음 풀이 6 · 낱글자 쓰임", enTitle: "Explanation 6 · Example Usage", koStart: 195, enStart: 223 },
  { slug: "jeong-inji", koTitle: "마무리 · 정인지 서", enTitle: "Postscript · Jeong In-ji", koStart: 213, enStart: 240 },
  { slug: "guide", koTitle: "보탬 · 일러두기", enTitle: "Appendix · Guide & Notice", koStart: 227, enStart: 254 },
  { slug: "more-explain", koTitle: "보탬 · 덧풀이", enTitle: "Appendix · Additional Notes", koStart: 243, enStart: 275 },
  { slug: "more-see", koTitle: "보탬 · 더보기", enTitle: "Appendix · Supplementary", koStart: 277, enStart: 316 },
  { slug: "origin", koTitle: "보탬 · 한글 원형", enTitle: "Appendix · Hangul Origin", koStart: 313, enStart: 349 },
  { slug: "art", koTitle: "보탬 · 한글아트", enTitle: "Appendix · Hangul Art", koStart: 327, enStart: 364 },
  { slug: "ashimeu", koTitle: "보탬 · 시므 스스로 (아시므)", enTitle: "Appendix · Sime Self-Hangul (Ashimeu)", koStart: 355, enStart: 391 },
  { slug: "closing", koTitle: "보탬 · 연혁 · 닫는 글", enTitle: "References · Editor's Closing", koStart: 369, enStart: 404 },
];

export function tocStart(lang: Lang, e: TocEntry): number {
  return lang === "ko" ? e.koStart : e.enStart;
}
