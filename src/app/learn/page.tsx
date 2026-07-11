"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";
import JamoBuilder from "@/components/JamoBuilder";

export default function Learn() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);

  const steps =
    lang === "ko"
      ? [
          { g: "ㆍ", h: "하늘", d: "둥근 하늘. 밝음(양)의 씨앗." },
          { g: "ㅡ", h: "땅", d: "평평한 땅. 어둠(음)의 바탕." },
          { g: "ㅣ", h: "사람", d: "선 사람. 하늘과 땅을 잇는 존재." },
        ]
      : [
          { g: "ㆍ", h: "Sky", d: "The round heaven. Seed of brightness (yang)." },
          { g: "ㅡ", h: "Earth", d: "The flat ground. Base of darkness (yin)." },
          { g: "ㅣ", h: "Person", d: "The upright human, joining sky and earth." },
        ];

  return (
    <div className="container-narrow" style={{ padding: "40px 0" }}>
      {/* Ashimeu hero */}
      <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--line)", fontSize: "0.8rem", color: "var(--red)", fontWeight: 700 }}>
        AhSiMeu · 아시므
      </span>
      <h1 className="serif" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800, margin: "14px 0 10px", lineHeight: 1.15 }}>
        {T("learn.ashimeuTitle")}
      </h1>
      <p style={{ fontSize: "1.1rem", color: "var(--ink-soft)", marginBottom: 8 }}>{T("learn.ashimeuLead")}</p>

      {/* Three points */}
      <section style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", margin: "28px 0" }}>
        {steps.map((s) => (
          <div key={s.g} className="card" style={{ padding: 22, textAlign: "center" }}>
            <div className="serif" style={{ fontSize: "3rem", lineHeight: 1 }}>{s.g}</div>
            <div style={{ fontWeight: 700, margin: "10px 0 4px" }}>{s.h}</div>
            <div style={{ color: "var(--ink-soft)", fontSize: "0.92rem" }}>{s.d}</div>
          </div>
        ))}
      </section>

      <p className="serif" style={{ fontSize: "1.05rem" }}>
        {lang === "ko"
          ? "이 세 점이 만나 모든 홀소리가 되고, 발음 기관을 본뜬 다섯 닿소리(ㄱ ㄴ ㅁ ㅅ ㅇ)에 획을 더해 모든 닿소리가 됩니다. 외울 것이 없습니다 — 원리만 알면 됩니다."
          : "These three points combine into every vowel; five consonants shaped after the speech organs (ㄱ ㄴ ㅁ ㅅ ㅇ) gain strokes to form all the rest. Nothing to memorize — just the logic."}
      </p>

      {/* Ashimeu diagram */}
      <div style={{ margin: "28px 0", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
        <Image
          src="/ashimeu-hangul.png"
          alt="Ashimeu — Sky, Person, Earth principle of Hangul"
          width={1200}
          height={800}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Interactive builder */}
      <h2 className="serif" style={{ fontSize: "1.5rem", fontWeight: 800, margin: "36px 0 14px", color: "var(--accent)" }}>
        {T("learn.try")}
      </h2>
      <JamoBuilder />

      {/* Deeper */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
        <Link href="/book/ashimeu" className="btn btn-primary">
          {lang === "ko" ? "책에서 더 읽기 · 아시므" : "Read more in the book · Ashimeu"}
        </Link>
        <Link href="/book/principles" className="btn btn-ghost">
          {lang === "ko" ? "창제원리" : "Principles of creation"}
        </Link>
      </div>
    </div>
  );
}
