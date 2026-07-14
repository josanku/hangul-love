"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Hit = { lang: "ko" | "en"; page: number; snippet: string; chapterKo: string; chapterEn: string };

export default function SearchPage() {
  const { lang } = useLang();
  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(async (query: string) => {
    if (!query.trim()) { setHits(null); return; }
    setLoading(true);
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const d = await r.json();
      setHits(d.hits ?? []);
    } catch { setHits([]); }
    setLoading(false);
  }, []);

  // Read ?q= from URL on load
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) { setQ(p); run(p); }
  }, [run]);

  const highlight = (text: string) => {
    if (!q.trim()) return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark style={{ background: "var(--yellow)", color: "var(--ink)", padding: "0 2px", borderRadius: 3 }}>{text.slice(i, i + q.length)}</mark>
        {text.slice(i + q.length)}
      </>
    );
  };

  return (
    <div className="container-narrow" style={{ padding: "40px 0" }}>
      <h1 className="serif" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 8 }}>
        {t("본문 검색", "Search the Books")}
      </h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 20 }}>
        {t("두 책의 모든 페이지 본문에서 찾습니다.", "Searches the full text of every page in both books.")}
      </p>

      <form onSubmit={(e) => { e.preventDefault(); run(q); const u = new URL(window.location.href); u.searchParams.set("q", q); window.history.replaceState(null, "", u.toString()); }}
        style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus
          placeholder={t("예: 창제, 하늘, Sejong, vowel…", "e.g. 창제, sky, Sejong, vowel…")}
          style={{ flex: 1, padding: "0.6em 0.9em", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", fontSize: "1rem" }} />
        <button className="btn btn-primary" style={{ padding: "0.5em 1.4em" }}>{loading ? "…" : t("검색", "Search")}</button>
      </form>

      {hits !== null && (
        <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem", marginBottom: 14 }}>
          {t(`${hits.length}개 결과`, `${hits.length} results`)}
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {hits?.map((h, i) => (
          <Link key={i} href={`/read/${h.lang}/${h.page}`} className="card" style={{ padding: "14px 18px", textDecoration: "none", display: "block" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 4, fontSize: "0.82rem", color: "var(--accent)" }}>
              <span style={{ fontWeight: 700 }}>{h.lang === "ko" ? "한글정음" : "HANGUL"}</span>
              <span style={{ color: "var(--ink-soft)" }}>p.{h.page} · {h.lang === "ko" ? h.chapterKo : h.chapterEn}</span>
            </div>
            <div style={{ lineHeight: 1.6 }}>{highlight(h.snippet)}</div>
          </Link>
        ))}
        {hits !== null && hits.length === 0 && !loading && (
          <p style={{ color: "var(--ink-soft)" }}>{t("결과가 없습니다.", "No results.")}</p>
        )}
      </div>
    </div>
  );
}
