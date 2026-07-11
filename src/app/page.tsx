"use client";

import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";

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
      <section style={{ padding: "72px 0 40px", textAlign: "center" }}>
        <div className="container-narrow">
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

      {/* Three-point glyph strip */}
      <section style={{ padding: "8px 0 40px" }}>
        <div className="container" style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", color: "var(--ink-soft)" }}>
          {[
            { g: "ㆍ", ko: "하늘", en: "Sky" },
            { g: "ㅣ", ko: "사람", en: "Person" },
            { g: "ㅡ", ko: "땅", en: "Earth" },
          ].map((x) => (
            <div key={x.g} className="serif" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.4rem", color: "var(--ink)" }}>{x.g}</div>
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
    </>
  );
}
