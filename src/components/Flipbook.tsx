"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BOOK_TOTAL, BOOK_TITLE, pageSrc, TOC, tocStart, type Lang } from "@/lib/bookPages";
import { useLang } from "@/lib/i18n";

export default function Flipbook({
  lang,
  initialPage,
}: {
  lang: Lang;
  initialPage: number;
}) {
  const total = BOOK_TOTAL[lang];
  const clamp = useCallback((n: number) => Math.min(total, Math.max(1, n)), [total]);
  const [page, setPage] = useState(clamp(initialPage));
  const [tocOpen, setTocOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const [pageText, setPageText] = useState<string>("");
  const { lang: uiLang } = useLang();
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => setPage(clamp(n)), [clamp]);
  const prev = useCallback(() => go(page - 1), [go, page]);
  const next = useCallback(() => go(page + 1), [go, page]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Home") go(1);
      else if (e.key === "End") go(total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, go, total]);

  // Reflect page in URL (shareable) without reload
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page));
    window.history.replaceState(null, "", url.toString());
  }, [page]);

  // Preload neighbours
  useEffect(() => {
    [page + 1, page + 2, page - 1].forEach((n) => {
      if (n >= 1 && n <= total) {
        const img = new Image();
        img.src = pageSrc(lang, n);
      }
    });
  }, [page, lang, total]);

  // Load current page's extracted text when the panel is open
  useEffect(() => {
    if (!textOpen) return;
    let alive = true;
    setPageText("");
    fetch(`/api/pagetext?lang=${lang}&n=${page}`)
      .then((r) => r.json())
      .then((d) => { if (alive) setPageText(d.text ?? ""); })
      .catch(() => {});
    return () => { alive = false; };
  }, [textOpen, lang, page]);

  const t = (ko: string, en: string) => (uiLang === "ko" ? ko : en);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 60px)" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
        <Link href="/book" style={{ textDecoration: "none", color: "var(--ink-soft)", fontWeight: 600 }}>
          ← {t("책", "Books")}
        </Link>
        <strong className="serif" style={{ fontSize: "0.95rem" }}>{BOOK_TITLE[lang]}</strong>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setTextOpen((v) => !v)} className="btn btn-ghost" aria-pressed={textOpen}
            style={{ padding: "0.35em 0.9em", fontSize: "0.85rem", borderColor: textOpen ? "var(--accent)" : "var(--line)", color: textOpen ? "var(--accent)" : "var(--ink)" }}>
            📄 {t("본문", "Text")}
          </button>
          <button onClick={() => setTocOpen((v) => !v)} className="btn btn-ghost" style={{ padding: "0.35em 0.9em", fontSize: "0.85rem" }}>
            ☰ {t("목차", "Contents")}
          </button>
          <Link
            href={`/book/read/${lang === "ko" ? "en" : "ko"}?page=${page}`}
            className="btn btn-ghost"
            style={{ padding: "0.35em 0.9em", fontSize: "0.85rem" }}
          >
            {lang === "ko" ? "EN" : "한국어"}
          </Link>
        </div>
      </div>

      {/* TOC drawer */}
      {tocOpen && (
        <div style={{ borderBottom: "1px solid var(--line)", background: "var(--paper-2)", maxHeight: "50vh", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
            {TOC.map((e) => {
              const start = tocStart(lang, e);
              return (
                <li key={e.slug}>
                  <button
                    onClick={() => { go(start); setTocOpen(false); }}
                    style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "8px 20px", display: "flex", gap: 12, color: "var(--ink)", fontSize: "0.95rem" }}
                  >
                    <span style={{ color: "var(--accent)", minWidth: 44 }}>p.{start}</span>
                    <span>{lang === "ko" ? e.koTitle : e.enTitle}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Page viewer */}
      <div
        style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "var(--paper)", userSelect: "none" }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx > 45) prev();
          else if (dx < -45) next();
          touchX.current = null;
        }}
      >
        {/* click zones */}
        <button aria-label="previous" onClick={prev} disabled={page <= 1}
          style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "33%", background: "transparent", border: "none", cursor: page <= 1 ? "default" : "w-resize", zIndex: 2 }} />
        <button aria-label="next" onClick={next} disabled={page >= total}
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "33%", background: "transparent", border: "none", cursor: page >= total ? "default" : "e-resize", zIndex: 2 }} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={page}
          src={pageSrc(lang, page)}
          alt={`${BOOK_TITLE[lang]} — page ${page}`}
          style={{ maxHeight: "calc(100vh - 190px)", maxWidth: "100%", width: "auto", objectFit: "contain", boxShadow: "0 10px 40px rgba(0,0,0,0.18)", borderRadius: 4, background: "#fff" }}
        />
      </div>

      {/* Text panel */}
      {textOpen && (
        <div style={{ borderTop: "1px solid var(--line)", background: "var(--paper-2)", maxHeight: "38vh", overflowY: "auto", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>{t("본문 텍스트", "Page text")} · p.{page}</strong>
            <a href={`/read/${lang}/${page}`} className="btn btn-ghost" style={{ padding: "0.25em 0.7em", fontSize: "0.78rem" }}>
              {t("전체 보기 · 검색", "Full page · search")} ↗
            </a>
          </div>
          {pageText.trim() ? (
            <pre className="serif" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "inherit", lineHeight: 1.8, margin: 0, fontSize: "0.98rem" }}>{pageText}</pre>
          ) : (
            <p style={{ color: "var(--ink-soft)", margin: 0 }}>{t("이 페이지는 추출된 텍스트가 없습니다(그림 위주).", "No extracted text for this page (image-only).")}</p>
          )}
        </div>
      )}

      {/* Bottom controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "12px 16px", borderTop: "1px solid var(--line)" }}>
        <button onClick={prev} disabled={page <= 1} className="btn btn-ghost" style={{ padding: "0.4em 1em" }}>‹</button>
        <form
          onSubmit={(e) => { e.preventDefault(); const v = parseInt((e.currentTarget.elements.namedItem("pg") as HTMLInputElement).value, 10); if (!Number.isNaN(v)) go(v); }}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <input name="pg" type="number" min={1} max={total} defaultValue={page} key={page}
            style={{ width: 68, textAlign: "center", padding: "0.35em", borderRadius: 8, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)" }} />
          <span style={{ color: "var(--ink-soft)" }}>/ {total}</span>
        </form>
        <button onClick={next} disabled={page >= total} className="btn btn-ghost" style={{ padding: "0.4em 1em" }}>›</button>
      </div>
    </div>
  );
}
