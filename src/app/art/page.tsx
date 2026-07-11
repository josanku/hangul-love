"use client";

import { useState } from "react";
import { useLang, tr } from "@/lib/i18n";

type Piece = { file: string; ko: string; en: string };

const PIECES: Piece[] = [
  { file: "5_hangul_jamo.html", ko: "자모 흐름", en: "Jamo Flow" },
  { file: "6_hangul_jamo_equal.html", ko: "자모 고른 흐름", en: "Jamo Even Flow" },
  { file: "10_arirang_syllable.html", ko: "아리랑 · 음절", en: "Arirang · Syllables" },
  { file: "11_arirang_ohaeng.html", ko: "아리랑 · 오행", en: "Arirang · Five Elements" },
  { file: "12_arirang_obangsaek.html", ko: "아리랑 · 오방색", en: "Arirang · Five Colors" },
  { file: "20_oldhangul_allfonts.html", ko: "옛한글 · 모든 글꼴", en: "Old Hangul · All Fonts" },
];

export default function Art() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);
  const [active, setActive] = useState<Piece | null>(null);

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 className="serif" style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0 0 8px" }}>{T("nav.art")}</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 8, maxWidth: 640 }}>
        {lang === "ko"
          ? "한글의 자모가 살아 움직이는 생성 예술입니다. 작품을 눌러 감상하고, 더 많은 작품은 hangulart.com 에서 만나세요."
          : "Generative art where Hangul's letters come alive. Tap a piece to view; find more at hangulart.com."}
      </p>
      <a href="https://hangulart.com" target="_blank" rel="noopener" className="btn btn-ghost" style={{ marginBottom: 24 }}>
        hangulart.com ↗
      </a>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", marginTop: 8 }}>
        {PIECES.map((p) => (
          <button
            key={p.file}
            onClick={() => setActive(p)}
            className="card"
            style={{ padding: 0, overflow: "hidden", cursor: "pointer", textAlign: "left", border: "1px solid var(--line)" }}
          >
            <div style={{ position: "relative", height: 200, background: "#fff" }}>
              <iframe
                src={`/gallery/${p.file}`}
                title={p.en}
                style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                loading="lazy"
                scrolling="no"
              />
              <span style={{ position: "absolute", inset: 0 }} />
            </div>
            <div style={{ padding: "12px 16px", fontWeight: 600 }}>{lang === "ko" ? p.ko : p.en}</div>
          </button>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 100, display: "flex", flexDirection: "column", padding: "3vh 2vw" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", marginBottom: 10 }}>
            <strong>{lang === "ko" ? active.ko : active.en}</strong>
            <button onClick={() => setActive(null)} className="btn" style={{ background: "#fff", color: "#000", padding: "0.3em 0.9em" }}>✕</button>
          </div>
          <iframe
            src={`/gallery/${active.file}`}
            title={active.en}
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, width: "100%", border: "none", borderRadius: 12, background: "#fff" }}
          />
        </div>
      )}
    </div>
  );
}
