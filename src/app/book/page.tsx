"use client";

import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";
import { TOC, coverSrc, BOOK_TITLE } from "@/lib/bookPages";

export default function BookIndex() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);

  return (
    <div className="container" style={{ padding: "40px 0 8px" }}>
      <h1 className="serif" style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0 0 8px" }}>{T("book.title")}</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 16, maxWidth: 640 }}>
        {lang === "ko"
          ? "표지를 눌러 실제 책처럼 좌우로 넘겨 보세요. 각 페이지의 본문 텍스트도 함께 볼 수 있고, 전체 검색이 됩니다."
          : "Tap a cover to flip through the real pages. Each page's full text is available too, and everything is searchable."}
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        <Link href="/search" className="btn btn-ghost">
          🔍 {lang === "ko" ? "본문 전체 검색" : "Search the full text"}
        </Link>
        <Link href="/book/jeoma" className="btn btn-ghost">
          ✚ {lang === "ko" ? "보탬 — 원리의 확장 (정음점자 등)" : "Extensions (incl. Jeongeum Braille)"}
        </Link>
      </div>

      {/* Two covers */}
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", maxWidth: 720 }}>
        {(["ko", "en"] as const).map((l) => (
          <Link key={l} href={`/book/read/${l}?page=1`} className="card" style={{ padding: 16, textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverSrc(l)} alt={BOOK_TITLE[l]} style={{ width: "100%", maxWidth: 240, borderRadius: 6, boxShadow: "0 8px 26px rgba(0,0,0,0.16)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700 }}>{l === "ko" ? "한글정음" : "HANGUL"}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>{l === "ko" ? "한국어 · 388쪽" : "English · 428pp"}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Detailed TOC */}
      <h2 className="serif" style={{ fontSize: "1.5rem", fontWeight: 800, margin: "44px 0 16px", color: "var(--accent)" }}>
        {lang === "ko" ? "목차" : "Contents"}
      </h2>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8, maxWidth: 820 }}>
        {TOC.map((e, i) => (
          <li key={e.slug} className="card" style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span className="serif" style={{ color: "var(--ink-soft)", minWidth: 26 }}>{String(i).padStart(2, "0")}</span>
            <span style={{ fontWeight: 600, flex: 1, minWidth: 180 }}>{lang === "ko" ? e.koTitle : e.enTitle}</span>
            <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href={`/book/read/ko?page=${e.koStart}`} className="btn btn-ghost" style={{ padding: "0.25em 0.7em", fontSize: "0.8rem" }}>한글 p.{e.koStart}</Link>
              <Link href={`/book/read/en?page=${e.enStart}`} className="btn btn-ghost" style={{ padding: "0.25em 0.7em", fontSize: "0.8rem" }}>EN p.{e.enStart}</Link>
              <Link href={`/book/${e.slug}`} className="btn btn-ghost" style={{ padding: "0.25em 0.7em", fontSize: "0.8rem" }}>{lang === "ko" ? "텍스트" : "Text"}</Link>
            </span>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 28, marginBottom: 8, padding: 18, border: "1px dashed var(--line)", borderRadius: 14, color: "var(--ink-soft)", fontSize: "0.9rem", maxWidth: 820 }}>
        {lang === "ko"
          ? "‘텍스트’는 검색·복사·번역이 쉬운 글자 버전입니다. 페이지 이미지는 실제 책의 편집·디자인을 그대로 보여줍니다."
          : "‘Text’ is a searchable, copyable version. The page images preserve the book's actual layout and design."}
      </div>
    </div>
  );
}
