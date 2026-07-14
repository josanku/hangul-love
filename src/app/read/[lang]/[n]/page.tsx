import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BOOK_TOTAL, BOOK_TITLE, pageSrc, type Lang } from "@/lib/bookPages";
import { getPageText, chapterOfPage } from "@/lib/pageText";

export function generateStaticParams() {
  const params: { lang: string; n: string }[] = [];
  (["ko", "en"] as Lang[]).forEach((lang) => {
    for (let n = 1; n <= BOOK_TOTAL[lang]; n++) params.push({ lang, n: String(n) });
  });
  return params;
}

function parse(lang: string, nStr: string): { lang: Lang; n: number } | null {
  if (lang !== "ko" && lang !== "en") return null;
  const n = parseInt(nStr, 10);
  if (!Number.isInteger(n) || n < 1 || n > BOOK_TOTAL[lang as Lang]) return null;
  return { lang: lang as Lang, n };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; n: string }> }): Promise<Metadata> {
  const { lang, n } = await params;
  const p = parse(lang, n);
  if (!p) return {};
  const ch = chapterOfPage(p.lang, p.n);
  const title = `${BOOK_TITLE[p.lang]} — p.${p.n}${ch ? ` · ${p.lang === "ko" ? ch.koTitle : ch.enTitle}` : ""}`;
  const text = getPageText(p.lang, p.n).replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title,
    description: text || title,
    alternates: { canonical: `/read/${p.lang}/${p.n}` },
  };
}

export default async function ReadTextPage({ params }: { params: Promise<{ lang: string; n: string }> }) {
  const { lang, n } = await params;
  const p = parse(lang, n);
  if (!p) notFound();

  const total = BOOK_TOTAL[p.lang];
  const text = getPageText(p.lang, p.n);
  const ch = chapterOfPage(p.lang, p.n);
  const chTitle = ch ? (p.lang === "ko" ? ch.koTitle : ch.enTitle) : "";
  const prev = p.n > 1 ? p.n - 1 : null;
  const next = p.n < total ? p.n + 1 : null;
  const other: Lang = p.lang === "ko" ? "en" : "ko";
  const otherN = Math.min(BOOK_TOTAL[other], p.n);

  return (
    <div className="container" style={{ padding: "24px 0 8px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <Link href="/book" style={{ textDecoration: "none", color: "var(--ink-soft)", fontWeight: 600 }}>← 책 / Books</Link>
        <span style={{ color: "var(--ink-soft)" }}>·</span>
        <strong className="serif">{BOOK_TITLE[p.lang]}</strong>
        {chTitle && <span style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>／ {chTitle}</span>}
        <span style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Link href={`/book/read/${p.lang}?page=${p.n}`} className="btn btn-ghost" style={{ padding: "0.35em 0.9em", fontSize: "0.85rem" }}>📖 넘겨보기 / Flip</Link>
          <Link href={`/read/${other}/${otherN}`} className="btn btn-ghost" style={{ padding: "0.35em 0.9em", fontSize: "0.85rem" }}>{p.lang === "ko" ? "EN" : "한국어"}</Link>
        </span>
      </div>

      {/* Image + text side by side */}
      <div style={{ display: "grid", gap: 28, gridTemplateColumns: "minmax(260px, 0.9fr) 1.1fr", alignItems: "start" }} className="hl-read-grid">
        <div style={{ position: "sticky", top: 74 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pageSrc(p.lang, p.n)} alt={`${BOOK_TITLE[p.lang]} page ${p.n}`}
            style={{ width: "100%", borderRadius: 6, boxShadow: "0 10px 34px rgba(0,0,0,0.16)", background: "#fff" }} />
        </div>
        <article>
          <h1 className="serif" style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 4px" }}>
            {chTitle || BOOK_TITLE[p.lang]}
          </h1>
          <div style={{ color: "var(--ink-soft)", fontSize: "0.85rem", marginBottom: 16 }}>
            {BOOK_TITLE[p.lang]} · p.{p.n} / {total}
          </div>
          {text.trim() ? (
            <pre className="serif" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "inherit", lineHeight: 1.85, fontSize: "1.02rem", margin: 0 }}>{text}</pre>
          ) : (
            <p style={{ color: "var(--ink-soft)" }}>이 페이지는 그림 위주로, 추출된 본문 텍스트가 없습니다. 왼쪽 이미지를 참고하세요.</p>
          )}
        </article>
      </div>

      {/* Prev / next */}
      <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
        {prev ? <Link href={`/read/${p.lang}/${prev}`} className="btn btn-ghost">← p.{prev}</Link> : <span />}
        {next ? <Link href={`/read/${p.lang}/${next}`} className="btn btn-ghost">p.{next} →</Link> : <span />}
      </nav>

      <style>{`@media (max-width: 720px){ .hl-read-grid{ grid-template-columns: 1fr !important; } .hl-read-grid > div{ position: static !important; } }`}</style>
    </div>
  );
}
