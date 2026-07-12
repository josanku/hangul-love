"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

type Comment = { id: string; name: string; text: string; ts: string };

function timeAgo(ts: string, lang: string): string {
  const d = new Date(ts).getTime();
  const s = Math.max(0, (Date.now() - d) / 1000);
  const mins = Math.floor(s / 60), hrs = Math.floor(s / 3600), days = Math.floor(s / 86400);
  if (lang === "ko") {
    if (s < 60) return "방금";
    if (mins < 60) return `${mins}분 전`;
    if (hrs < 24) return `${hrs}시간 전`;
    return `${days}일 전`;
  }
  if (s < 60) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

export default function Comments() {
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  const [items, setItems] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/comments?path=${encodeURIComponent(pathname)}`)
      .then((r) => r.json())
      .then((d) => setItems(d.comments ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [pathname]);

  useEffect(() => {
    setName(typeof window !== "undefined" ? localStorage.getItem("hl.name") ?? "" : "");
    load();
  }, [load]);

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try { localStorage.setItem("hl.name", name); } catch {}
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: pathname, name, text }),
      });
      const d = await r.json();
      if (d.ok && d.comment) {
        setItems((prev) => [d.comment, ...prev]);
        setText("");
      }
    } catch {}
    setSending(false);
  }, [name, text, pathname, sending]);

  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return (
    <section style={{ marginTop: 40 }}>
      <h3 className="serif" style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 14 }}>
        {t("댓글", "Comments")} {items.length > 0 ? `(${items.length})` : ""}
      </h3>

      <form onSubmit={submit} style={{ display: "grid", gap: 8, marginBottom: 22 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("이름 (선택)", "Name (optional)")}
          maxLength={40}
          style={{ padding: "0.55em 0.8em", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", maxWidth: 260 }}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("한글에 대한 생각을 남겨 주세요…", "Share your thoughts on Hangul…")}
          maxLength={1000}
          rows={3}
          style={{ padding: "0.6em 0.8em", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", resize: "vertical", fontFamily: "inherit" }}
        />
        <div>
          <button type="submit" className="btn btn-primary" disabled={sending || !text.trim()} style={{ padding: "0.5em 1.4em" }}>
            {sending ? "…" : t("등록", "Post")}
          </button>
        </div>
      </form>

      {loading ? (
        <p style={{ color: "var(--ink-soft)" }}>…</p>
      ) : items.length === 0 ? (
        <p style={{ color: "var(--ink-soft)" }}>{t("첫 댓글을 남겨 보세요.", "Be the first to comment.")}</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
          {items.map((c) => (
            <li key={c.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 4 }}>
                <strong style={{ fontSize: "0.95rem" }}>{esc(c.name)}</strong>
                <span style={{ color: "var(--ink-soft)", fontSize: "0.8rem" }}>{timeAgo(c.ts, lang)}</span>
              </div>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: esc(c.text) }} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
