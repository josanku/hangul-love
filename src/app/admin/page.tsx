"use client";

import { useCallback, useEffect, useState } from "react";

type Stats = {
  storage: string;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  topPages: [string, number][];
  likesByPage: [string, number][];
  dailySeries: [string, number][];
  comments: { id: string; path: string; name: string; text: string; ts: string }[];
};

export default function Admin() {
  const [key, setKey] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/stats", { headers: { "x-admin-key": k } });
      if (r.status === 401) { setError("키가 올바르지 않습니다."); setStats(null); return; }
      const d = await r.json();
      setStats(d);
      try { localStorage.setItem("hl.admin", k); } catch {}
    } catch {
      setError("불러오기 실패");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hl.admin") : null;
    if (saved) { setKey(saved); load(saved); }
  }, [load]);

  const del = useCallback(async (id: string) => {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    await fetch(`/api/admin/comment?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": key },
    });
    setStats((s) => (s ? { ...s, comments: s.comments.filter((c) => c.id !== id) } : s));
  }, [key]);

  const maxDaily = stats ? Math.max(1, ...stats.dailySeries.map(([, v]) => v)) : 1;

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 className="serif" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 6 }}>운영자 · Operator</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>사이트 접속 통계 · 좋아요 · 댓글 관리</p>

      <form onSubmit={(e) => { e.preventDefault(); load(key); }} style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="ADMIN_KEY"
          style={{ padding: "0.5em 0.8em", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)", minWidth: 260 }} />
        <button className="btn btn-primary" style={{ padding: "0.5em 1.2em" }}>{loading ? "…" : "조회"}</button>
        {error && <span style={{ color: "var(--red)", alignSelf: "center" }}>{error}</span>}
      </form>

      {stats && (
        <>
          <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginBottom: 16 }}>저장소: {stats.storage}</div>

          {/* Totals */}
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", marginBottom: 28 }}>
            {[
              { l: "전체 조회수", v: stats.totalViews },
              { l: "좋아요", v: stats.totalLikes },
              { l: "댓글", v: stats.totalComments },
              { l: "집계 일수", v: stats.dailySeries.length },
            ].map((c) => (
              <div key={c.l} className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: "1.9rem", fontWeight: 800 }}>{c.v.toLocaleString()}</div>
                <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>{c.l}</div>
              </div>
            ))}
          </div>

          {/* Daily chart */}
          <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "8px 0 12px" }}>일별 조회수</h2>
          <div className="card" style={{ padding: 18, marginBottom: 28, overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160, minWidth: 320 }}>
              {stats.dailySeries.length === 0 ? <span style={{ color: "var(--ink-soft)" }}>데이터 없음</span> :
                stats.dailySeries.slice(-30).map(([day, v]) => (
                  <div key={day} title={`${day}: ${v}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", maxWidth: 26, height: `${(v / maxDaily) * 130}px`, minHeight: 2, background: "var(--accent)", borderRadius: "4px 4px 0 0" }} />
                    <span style={{ fontSize: "0.6rem", color: "var(--ink-soft)", transform: "rotate(-45deg)", whiteSpace: "nowrap" }}>{day.slice(5)}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Top pages */}
          <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "8px 0 12px" }}>인기 페이지</h2>
          <div className="card" style={{ padding: 4, marginBottom: 28, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <tbody>
                {stats.topPages.map(([p, v]) => (
                  <tr key={p} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 12px" }}>{p}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700 }}>{v.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Comments moderation */}
          <h2 className="serif" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "8px 0 12px" }}>최근 댓글</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {stats.comments.length === 0 ? <p style={{ color: "var(--ink-soft)" }}>댓글 없음</p> :
              stats.comments.map((c) => (
                <div key={c.id} className="card" style={{ padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginBottom: 3 }}>
                      <strong style={{ color: "var(--ink)" }}>{c.name}</strong> · {c.path} · {new Date(c.ts).toLocaleString()}
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{c.text}</div>
                  </div>
                  <button onClick={() => del(c.id)} className="btn btn-ghost" style={{ padding: "0.3em 0.7em", color: "var(--red)", borderColor: "var(--red)" }}>삭제</button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
