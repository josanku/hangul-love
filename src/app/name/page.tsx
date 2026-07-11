"use client";

import { useLang, tr } from "@/lib/i18n";

export default function NamePage() {
  const { lang } = useLang();
  const T = (k: string) => tr(k, lang);

  return (
    <div className="container-narrow" style={{ padding: "48px 0", textAlign: "center" }}>
      <div className="serif" style={{ fontSize: "clamp(3rem,12vw,6rem)", fontWeight: 800, lineHeight: 1 }}>
        <span style={{ color: "var(--red)" }}>이</span>
        <span style={{ color: "var(--blue)" }}>름</span>
      </div>
      <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 800, margin: "18px 0 10px" }}>{T("home.cardNameT")}</h1>
      <p style={{ color: "var(--ink-soft)", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto 28px" }}>
        {lang === "ko"
          ? "당신의 이름을 소리 그대로 한글로 옮기고, 아름다운 카드로 만들어 보세요. myhangulname.com 에서 무료로."
          : "Transliterate your name into Hangul by its sound and turn it into a beautiful card — free at myhangulname.com."}
      </p>
      <a href="https://myhangulname.com" target="_blank" rel="noopener" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
        myhangulname.com {T("common.openSite")}
      </a>

      <div style={{ marginTop: 40, border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", height: "70vh", minHeight: 460 }}>
        <iframe
          src="https://myhangulname.com"
          title="My Hangul Name"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
