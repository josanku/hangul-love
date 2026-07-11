"use client";

import Link from "next/link";
import { CHAPTERS } from "@/lib/chapters";
import { useLang, tr } from "@/lib/i18n";

export default function BookIndex() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);

  return (
    <div className="container-narrow" style={{ padding: "48px 0" }}>
      <h1 className="serif" style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0 0 8px" }}>
        {T("book.title")}
      </h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 8 }}>{T("book.intro")}</p>
      <p style={{ color: "var(--ink-soft)", fontSize: "0.92rem", marginBottom: 28 }}>
        {lang === "ko"
          ? "『한글정음』(한국어) · 『HANGUL: The Design Philosophy』(영어)"
          : "Hangul Jeongeum (Korean) · HANGUL: The Design Philosophy (English)"}
      </p>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {CHAPTERS.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/book/${c.slug}`}
              className="card"
              style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "16px 20px", textDecoration: "none" }}
            >
              <span className="serif" style={{ color: "var(--accent)", fontWeight: 700, minWidth: 34 }}>{c.num}</span>
              <span style={{ fontWeight: 600 }}>{lang === "ko" ? c.koTitle : c.enTitle}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 36, padding: 20, border: "1px dashed var(--line)", borderRadius: 14, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
        {lang === "ko"
          ? "원본 고해상도 PDF(각 1.5GB)는 인쇄용입니다. 소장·인쇄를 원하시면 저자에게 문의하세요."
          : "The original high-resolution PDFs (1.5GB each) are print masters. Contact the author for a copy."}
      </div>
    </div>
  );
}
