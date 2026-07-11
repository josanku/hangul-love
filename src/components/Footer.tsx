"use client";

import Link from "next/link";
import { useLang, tr } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 64, padding: "36px 0", color: "var(--ink-soft)" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>
            <span style={{ color: "var(--red)" }}>한글</span>
            <span style={{ color: "var(--blue)" }}>.love</span>
          </div>
          <div style={{ fontSize: "0.9rem" }}>{tr("site.tagline", lang)}</div>
        </div>
        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: "0.9rem" }}>
          <Link href="/book" style={{ textDecoration: "none" }}>{tr("nav.book", lang)}</Link>
          <Link href="/learn" style={{ textDecoration: "none" }}>{tr("nav.learn", lang)}</Link>
          <Link href="/art" style={{ textDecoration: "none" }}>{tr("nav.art", lang)}</Link>
          <a href="https://myhangulname.com" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>myhangulname.com ↗</a>
          <a href="https://hangulart.com" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>hangulart.com ↗</a>
        </nav>
      </div>
      <div className="container" style={{ marginTop: 20, fontSize: "0.8rem" }}>
        © {2026} 조산구 (Josanku) · 『한글정음』 · 『HANGUL: The Design Philosophy』
      </div>
    </footer>
  );
}
