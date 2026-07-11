"use client";

import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";

export default function ChapterReader({
  koTitle,
  enTitle,
  koHtml,
  enHtml,
  prev,
  next,
}: {
  koTitle: string;
  enTitle: string;
  koHtml: string;
  enHtml: string;
  prev: { slug: string; koTitle: string; enTitle: string } | null;
  next: { slug: string; koTitle: string; enTitle: string } | null;
}) {
  const { lang, setLang } = useLang();
  const html = lang === "ko" ? koHtml : enHtml;
  const title = lang === "ko" ? koTitle : enTitle;
  const hasLang = html.trim().length > 0;

  return (
    <div className="container-narrow" style={{ padding: "36px 0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Link href="/book" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
          ← {tr("book.toc", lang)}
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", border: "1px solid var(--line)", borderRadius: 999, overflow: "hidden" }}>
          {(["ko", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "0.4em 1em",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                background: lang === l ? "var(--accent)" : "transparent",
                color: lang === l ? "#fff" : "var(--ink)",
              }}
            >
              {l === "ko" ? tr("book.readKo", lang) : tr("book.readEn", lang)}
            </button>
          ))}
        </div>
      </div>

      <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 24 }}>{title}</h1>

      {hasLang ? (
        <article className="prose serif" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p style={{ color: "var(--ink-soft)" }}>
          {lang === "ko" ? "이 언어의 본문은 준비 중입니다." : "This language is being prepared."}
        </p>
      )}

      <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
        {prev ? (
          <Link href={`/book/${prev.slug}`} className="btn btn-ghost">
            {tr("book.prev", lang)} · {lang === "ko" ? prev.koTitle : prev.enTitle}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/book/${next.slug}`} className="btn btn-ghost">
            {lang === "ko" ? next.koTitle : next.enTitle} · {tr("book.next", lang)}
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
