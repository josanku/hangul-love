"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang, tr } from "@/lib/i18n";

const LINKS = [
  { href: "/book", key: "nav.book" },
  { href: "/learn", key: "nav.learn" },
  { href: "/art", key: "nav.art" },
  { href: "/name", key: "nav.name" },
  { href: "/about", key: "nav.about" },
];

export default function Nav() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
        background: "color-mix(in srgb, var(--paper) 82%, transparent)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: 60, gap: 16 }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 8 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hasattang.svg" alt="" width={30} height={30} style={{ display: "block" }} />
          <span>
            <span style={{ color: "var(--red)" }}>한글</span>
            <span style={{ color: "var(--blue)" }}>.love</span>
          </span>
        </Link>

        <nav
          style={{
            display: open ? "flex" : "none",
            position: open ? "absolute" : "static",
            top: 60,
            left: 0,
            right: 0,
            flexDirection: open ? "column" : "row",
            gap: open ? 4 : 22,
            padding: open ? 12 : 0,
            background: open ? "var(--paper)" : "transparent",
            borderBottom: open ? "1px solid var(--line)" : "none",
          }}
          className="hl-nav"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none", fontWeight: 600, padding: open ? "8px 4px" : 0 }}
            >
              {tr(l.key, lang)}
            </Link>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={toggle}
            className="btn btn-ghost"
            style={{ padding: "0.35em 0.8em", fontSize: "0.85rem" }}
            aria-label="Toggle language"
          >
            {lang === "ko" ? "EN" : "한"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="btn btn-ghost hl-burger"
            style={{ padding: "0.35em 0.7em", display: "none" }}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hl-nav { display: none; }
          .hl-burger { display: inline-flex !important; }
        }
        @media (min-width: 721px) {
          .hl-nav { display: flex !important; position: static !important; flex-direction: row !important; }
        }
      `}</style>
    </header>
  );
}
