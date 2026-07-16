"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

// Unicode Hangul composition: 0xAC00 + (cho*21 + jung)*28 + jong
const CHO = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const CHO_INDEX: Record<string, number> = {
  ㄱ: 0, ㄲ: 1, ㄴ: 2, ㄷ: 3, ㄸ: 4, ㄹ: 5, ㅁ: 6, ㅂ: 7, ㅃ: 8, ㅅ: 9,
  ㅆ: 10, ㅇ: 11, ㅈ: 12, ㅉ: 13, ㅊ: 14, ㅋ: 15, ㅌ: 16, ㅍ: 17, ㅎ: 18,
};
const JUNG = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"];
const JUNG_INDEX: Record<string, number> = {
  ㅏ: 0, ㅐ: 1, ㅑ: 2, ㅒ: 3, ㅓ: 4, ㅔ: 5, ㅕ: 6, ㅖ: 7, ㅗ: 8, ㅘ: 9,
  ㅙ: 10, ㅚ: 11, ㅛ: 12, ㅜ: 13, ㅝ: 14, ㅞ: 15, ㅟ: 16, ㅠ: 17, ㅡ: 18, ㅢ: 19, ㅣ: 20,
};
const JONG = ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ"];
const JONG_INDEX: Record<string, number> = {
  "": 0, ㄱ: 1, ㄴ: 4, ㄷ: 7, ㄹ: 8, ㅁ: 16, ㅂ: 17, ㅇ: 21,
};

function compose(cho: string, jung: string, jong: string): string {
  const c = CHO_INDEX[cho];
  const j = JUNG_INDEX[jung];
  const t = JONG_INDEX[jong] ?? 0;
  if (c === undefined || j === undefined) return "";
  return String.fromCharCode(0xac00 + (c * 21 + j) * 28 + t);
}

function Row({
  label,
  items,
  value,
  onPick,
}: {
  label: string;
  items: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((it) => (
          <button
            key={it || "none"}
            onClick={() => onPick(it)}
            className="jamo"
            style={{
              minWidth: 40,
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              cursor: "pointer",
              fontSize: "1.15rem",
              background: value === it ? "var(--accent)" : "var(--paper)",
              color: value === it ? "#fff" : "var(--ink)",
            }}
          >
            {it || "∅"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JamoBuilder() {
  const { lang } = useLang();
  const [cho, setCho] = useState("ㅎ");
  const [jung, setJung] = useState("ㅏ");
  const [jong, setJong] = useState("ㄴ");
  const syllable = compose(cho, jung, jong);

  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
        <div
          className="serif"
          style={{
            fontSize: "clamp(5rem, 22vw, 9rem)",
            lineHeight: 1,
            minWidth: 160,
            textAlign: "center",
            color: "var(--ink)",
          }}
        >
          {syllable || "?"}
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <Row label={lang === "ko" ? "첫소리 (닿소리)" : "Initial (consonant)"} items={CHO} value={cho} onPick={setCho} />
          <Row label={lang === "ko" ? "가운뎃소리 (홀소리)" : "Medial (vowel)"} items={JUNG} value={jung} onPick={setJung} />
          <Row label={lang === "ko" ? "끝소리 (받침, 선택)" : "Final (batchim, optional)"} items={JONG} value={jong} onPick={setJong} />
        </div>
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", marginTop: 8, marginBottom: 0 }}>
        {lang === "ko"
          ? "첫소리·가운뎃소리·끝소리를 골라 한 글자를 쌓아 보세요. 이것이 한글의 모아쓰기입니다."
          : "Stack an initial, a medial, and a final into one block. This is how Hangul builds syllables."}
      </p>
    </div>
  );
}
