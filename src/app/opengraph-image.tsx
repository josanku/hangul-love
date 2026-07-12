import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hangul Love — Read, learn, enjoy & share Hangul";

// Brand symbol (하늘·사람·땅 / circle·triangle·square) as a data URI so Satori
// renders it as a single image without needing SVG element support.
const SYMBOL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1600'>
    <rect width='1600' height='1600' fill='#ffffff'/>
    <circle cx='372' cy='808' r='182' fill='#1a12ff'/>
    <circle cx='372' cy='808' r='49' fill='#8ec9e6'/>
    <polygon points='800,596 606,1024 800,1024' fill='#2ecb2e'/>
    <polygon points='800,596 800,1024 994,1024' fill='#0a8f0a'/>
    <rect x='1046' y='616' width='382' height='191' fill='#f7b8c3'/>
    <rect x='1046' y='807' width='382' height='191' fill='#fb0308'/>
  </svg>`
)}`;

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#f7f2e7",
          padding: "0 80px",
          gap: 48,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SYMBOL} width={360} height={360} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, color: "#1c1a17", letterSpacing: -2 }}>
            HANGUL LOVE
          </div>
          <div style={{ fontSize: 40, color: "#b23b3b", marginTop: 10, fontWeight: 700 }}>
            Sky · Person · Earth
          </div>
          <div style={{ fontSize: 34, color: "#4a453d", marginTop: 18 }}>
            Read · Learn · Enjoy · hangul.love
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
