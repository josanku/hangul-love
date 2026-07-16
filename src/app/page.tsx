"use client";

import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";
import { coverSrc } from "@/lib/bookPages";
import Community from "@/components/Community";

export default function Home() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);

  const cards = [
    { href: "/book", t: "home.cardBookT", d: "home.cardBookD", glyph: "훈민", color: "var(--blue)" },
    { href: "/learn", t: "home.cardLearnT", d: "home.cardLearnD", glyph: "ㆍ ㅣ ㅡ", color: "var(--red)" },
    { href: "/art", t: "home.cardArtT", d: "home.cardArtD", glyph: "한글", color: "var(--yellow)" },
    { href: "/name", t: "home.cardNameT", d: "home.cardNameD", glyph: "이름", color: "var(--blue)" },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "56px 0 40px", textAlign: "center" }}>
        <div className="container-narrow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hasattang.svg" alt="하늘·사람·땅 — 원·세모·네모" width={180} height={180}
            style={{ display: "block", margin: "0 auto 20px", width: "clamp(120px, 26vw, 190px)", height: "auto" }} />
          <div className="serif" style={{ fontSize: "clamp(2.6rem, 7vw, 4.4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {T("home.heroTitle")}
          </div>
          <p style={{ fontSize: "1.15rem", color: "var(--ink-soft)", margin: "22px auto 0", maxWidth: 620 }}>
            {T("home.heroSub")}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary">{T("home.readBook")}</Link>
            <Link href="/learn" className="btn btn-ghost">{T("home.learn59")}</Link>
          </div>
        </div>
      </section>

      {/* Book covers */}
      <section style={{ padding: "8px 0 24px" }}>
        <div className="container" style={{ display: "flex", gap: 28, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
          {(["ko", "en"] as const).map((l) => (
            <Link key={l} href={`/book/read/${l}?page=1`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc(l)}
                alt={l === "ko" ? "한글정음 표지" : "HANGUL cover"}
                style={{ width: "min(46vw, 260px)", borderRadius: 8, boxShadow: "0 16px 44px rgba(0,0,0,0.22)", transition: "transform .18s ease" }}
                className="hl-cover"
              />
              <span style={{ fontWeight: 700, color: "var(--ink)" }}>
                {l === "ko" ? "한글정음 (한국어)" : "HANGUL (English)"}
              </span>
            </Link>
          ))}
        </div>
        <style>{`.hl-cover:hover{transform:translateY(-6px)}`}</style>
        <p style={{ textAlign: "center", color: "var(--ink-soft)", marginTop: 18, fontSize: "0.95rem" }}>
          {lang === "ko" ? "표지를 눌러 실제 책처럼 펼쳐 보세요" : "Tap a cover to flip through the real book"}
        </p>
      </section>

      {/* Three-point glyph strip */}
      <section style={{ padding: "8px 0 40px" }}>
        <div className="container" style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", color: "var(--ink-soft)" }}>
          {[
            { g: "ㆍ", ko: "하늘", en: "Sky" },
            { g: "ㅣ", ko: "사람", en: "Person" },
            { g: "ㅡ", ko: "땅", en: "Earth" },
          ].map((x) => (
            <div key={x.g} className="serif" style={{ textAlign: "center" }}>
              <div className="jamo" style={{ fontSize: "2.6rem", color: "var(--ink)" }}>{x.g}</div>
              <div style={{ fontSize: "0.9rem" }}>{lang === "ko" ? x.ko : x.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: "24px 0 8px" }}>
        <div className="container" style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card" style={{ textDecoration: "none", padding: 26, display: "block" }}>
              <div className="serif" style={{ fontSize: "2rem", fontWeight: 800, color: c.color, marginBottom: 12 }}>{c.glyph}</div>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 8 }}>{T(c.t)}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>{T(c.d)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* External sites strip */}
      <section style={{ padding: "40px 0 8px" }}>
        <div className="container" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="https://hangulart.com" target="_blank" rel="noopener" className="btn btn-ghost">hangulart.com ↗</a>
          <a href="https://myhangulname.com" target="_blank" rel="noopener" className="btn btn-ghost">myhangulname.com ↗</a>
        </div>
      </section>

      <section style={{ padding: "8px 0 8px" }}>
        <div className="container-narrow">
          <Community title="Hangul Love · 한글.love" />
        </div>
      </section>
    </>
  );
}
