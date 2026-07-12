"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function Reactions({ title }: { title?: string }) {
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  useEffect(() => {
    setLiked(typeof window !== "undefined" && localStorage.getItem(`hl.like.${pathname}`) === "1");
    fetch(`/api/like?path=${encodeURIComponent(pathname)}`)
      .then((r) => r.json())
      .then((d) => setLikes(d.count ?? 0))
      .catch(() => setLikes(0));
  }, [pathname]);

  const like = useCallback(async () => {
    if (liked) return;
    setLiked(true);
    setLikes((n) => (n ?? 0) + 1);
    try { localStorage.setItem(`hl.like.${pathname}`, "1"); } catch {}
    try {
      const r = await fetch(`/api/like?path=${encodeURIComponent(pathname)}`, { method: "POST" });
      const d = await r.json();
      if (typeof d.count === "number") setLikes(d.count);
    } catch {}
  }, [liked, pathname]);

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://hangul.love";
    const shareData = { title: title || "Hangul Love · 한글.love", text: t("한글을 읽고 배우고 즐기다", "Read, learn & enjoy Hangul"), url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share(shareData); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }, [title, lang]);

  const enc = (s: string) => encodeURIComponent(s);
  const url = typeof window !== "undefined" ? window.location.href : "https://hangul.love";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <button onClick={like} className="btn btn-ghost" aria-pressed={liked}
        style={{ padding: "0.45em 1em", borderColor: liked ? "var(--red)" : "var(--line)", color: liked ? "var(--red)" : "var(--ink)" }}>
        {liked ? "♥" : "♡"} {t("좋아요", "Like")}{likes !== null ? ` ${likes}` : ""}
      </button>

      <button onClick={share} className="btn btn-ghost" style={{ padding: "0.45em 1em" }}>
        {copied ? t("링크 복사됨 ✓", "Link copied ✓") : `↗ ${t("공유", "Share")}`}
      </button>

      <a href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title || "Hangul Love")}`}
        target="_blank" rel="noopener" className="btn btn-ghost" style={{ padding: "0.45em 0.8em" }} aria-label="Share on X">𝕏</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank" rel="noopener" className="btn btn-ghost" style={{ padding: "0.45em 0.8em" }} aria-label="Share on Facebook">f</a>
    </div>
  );
}
