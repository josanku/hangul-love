"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Community from "@/components/Community";

function Figure({ src, cap }: { src: string; cap: string }) {
  return (
    <figure style={{ margin: "22px 0", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={cap} style={{ width: "100%", height: "auto", display: "block" }} />
      <figcaption style={{ padding: "8px 14px", fontSize: "0.85rem", color: "var(--ink-soft)", borderTop: "1px solid var(--line)" }}>{cap}</figcaption>
    </figure>
  );
}

export default function Botaem() {
  const { lang } = useLang();
  const ko = lang === "ko";

  const siblings = [
    {
      href: "/book/origin",
      glyph: "○△□",
      t: ko ? "한글 원형" : "Hangul Archetype",
      d: ko
        ? "하늘·사람·땅과 원·세모·네모 — 모든 글자가 나온 근원."
        : "Sky·Person·Earth and circle·triangle·square — the source of every letter.",
    },
    {
      href: "/art",
      glyph: "한",
      t: ko ? "한글아트" : "Hangul Art",
      d: ko
        ? "자모가 살아 움직이는 생성 예술로 뻗은 원리."
        : "The principle extended into generative, living art.",
    },
    {
      href: "/learn",
      glyph: "ㆍㅣㅡ",
      t: ko ? "아시므 · 시므 스스로" : "Ashimeu",
      d: ko
        ? "세 점으로 59초 만에 깨치는 배움으로 뻗은 원리."
        : "The principle extended into a 59-second way to learn.",
    },
  ];

  return (
    <div className="container-narrow" style={{ padding: "40px 0" }}>
      <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--line)", fontSize: "0.8rem", color: "var(--blue)", fontWeight: 700 }}>
        보탬 · Extensions
      </span>
      <h1 className="serif" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 800, margin: "14px 0 8px", lineHeight: 1.15 }}>
        {ko ? "보탬 — 한글 원리가 뻗는 자리" : "Extensions — where Hangul's principle reaches"}
      </h1>
      <p style={{ fontSize: "1.1rem", color: "var(--ink-soft)", marginBottom: 8 }}>
        {ko
          ? "창제의 이치는 옛 책에만 머물지 않는다. 예술로, 배움으로, 그리고 손끝으로 오늘도 뻗어 간다."
          : "The creation logic does not stay in an old book. It reaches into art, into learning, and into the fingertips today."}
      </p>
      <Link href="/book" style={{ textDecoration: "none", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
        ← {ko ? "책으로" : "Back to the book"}
      </Link>

      {/* Sibling 보탬 topics */}
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", margin: "28px 0 8px" }}>
        {siblings.map((s) => (
          <Link key={s.href} href={s.href} className="card" style={{ padding: 20, textDecoration: "none", display: "block" }}>
            <div className="jamo" style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>{s.glyph}</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.t}</div>
            <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>{s.d}</div>
          </Link>
        ))}
      </div>

      {/* Featured: 정음점자 */}
      <section style={{ marginTop: 40, paddingTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--red)", border: "1px solid var(--line)", borderRadius: 999, padding: "3px 10px", background: "var(--paper-2)" }}>
            {ko ? "새 보탬" : "New"}
          </span>
          <span style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>正音點字 · Jeongeum Braille</span>
        </div>
        <h2 className="serif" style={{ fontSize: "1.8rem", fontWeight: 800, margin: "6px 0 6px" }}>
          {ko ? "정음점자 — 한글 원리로 만든 점자" : "Jeongeum Braille — a braille born from Hangul"}
        </h2>
        <p style={{ color: "var(--ink-soft)", marginBottom: 4 }}>
          {ko
            ? "점의 배열이 곧 자모의 모양. 외우지 않고 손끝으로 읽는다."
            : "The dots are the letter's shape — read by touch, nothing to memorize."}
        </p>

        <article className="prose serif" style={{ marginTop: 18 }}>
          {ko ? (
            <>
              <p>세종의 정음은 <strong>보는 글자</strong>이면서 <strong>소리의 이치를 담은 글자</strong>다. 그 이치는 눈에만 머물 까닭이 없다. 손끝으로도 읽을 수 있어야 한다. <strong>정음점자</strong>는 한글 창제원리를 그대로 손끝에 옮긴 점자로, 점의 배열이 곧 닿소리·홀소리의 <strong>모양</strong>이다. 스물넉 자에 하늘아( ㆍ )를 더한 <strong>스물다섯 자</strong>를 점자로 옮긴다.</p>

              <Figure src="/jeoma/slide-1.png" cap="정음점자 뿌리 — 닿소리·홀소리, 빛깔·확장 방식" />

              <h3>뿌리 — 하사땅·원세모</h3>
              <p>닿소리의 뿌리는 발음기관을 본뜬 바탕글자다. 원·세모·네모에서 <strong>ㅇ·ㅅ·ㅁ</strong>가 나오고, <strong>ㄴ·ㄱ</strong>을 더한 <strong>ㅇ ㅅ ㅁ ㄴ ㄱ</strong> 다섯이 뿌리가 된다. 홀소리의 뿌리는 하늘·사람·땅 그 자체 <strong>ㆍ·ㅣ·ㅡ</strong>다. 점자에서도 ㅇ은 동그라미, ㅅ은 세모의 꼭지, ㅁ은 네모의 둘레를 이루고, ㆍ는 한 점, ㅣ는 세로 세 점, ㅡ는 가로 세 점이다.</p>

              <Figure src="/jeoma/slide-2.png" cap="바탕글자 ㅇ·ㅅ·ㅁ와 ㆍ·ㅣ·ㅡ — 점 배열이 곧 글자 모양" />

              <h3>자람 — 덧점과 덧그음</h3>
              <p>낱글자를 만든 이치가 <strong>획을 더함</strong>이었듯, 정음점자도 점을 더하고 그음을 더해 자란다. ㅇ→ㅎ, ㅅ→ㅈ→ㅊ, ㅁ→ㅂ→ㅍ, ㄴ→ㄷ→ㅌ, ㄱ→ㅋ. 소리가 세질수록 점이 는다.</p>

              <Figure src="/jeoma/slide-3.png" cap="닿소리 기본자와 확장 — 덧점·덧그음으로 자란다" />

              <p>홀소리는 뿌리 ㅣ·ㅡ에 하늘점( ㆍ )을 <strong>글자가 놓이는 자리 그대로</strong> 얹어 자란다. ㅣ 오른쪽이면 ㅏ, 왼쪽이면 ㅓ, 위가 ㅗ, 아래가 ㅜ. 점이 붙는 곳이 곧 한글에서 ㆍ가 붙는 곳이다.</p>

              <Figure src="/jeoma/slide-4.png" cap="홀소리와 확장 — ㆍ점을 글자 자리 그대로 얹는다" />

              <h3>빛깔 — 파초노빨보</h3>
              <p>다섯 뿌리에 다섯 빛을 입힌다. <strong>ㅇ 파랑 · ㅅ 초록 · ㅁ 노랑 · ㄴ 빨강 · ㄱ 보라</strong>. 하사땅의 파·초·빨과 다움(오행)의 다섯 빛을 오늘의 한글빛으로 다듬어, 밝이어다움(음양오행)의 이치를 점자에도 이었다.</p>

              <h3>쓰기 — 풀어쓰기와 모아쓰기</h3>
              <p><strong>풀어쓰기</strong>는 낱자를 차례로, <strong>모아쓰기</strong>는 한글처럼 첫·가운데·끝을 한 자리에 모은다.</p>

              <Figure src="/jeoma/slide-6.png" cap="보기: 대한민국 — 풀어쓰기(위)와 모아쓰기(아래)" />

              <p>정음점자는 새 부호를 외우게 하지 않는다. 한글을 아는 손이라면 그 모양을 그대로 만지게 한다. 보는 이에게 아름답던 원리가 보지 못하는 이에게도 그대로 닿는다 — 정음이 <strong>모두의 글자</strong>가 되는 한 걸음이다.</p>
              <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>#정음점자 #하사땅 #원세모 #파초노빨보 #모두의한글</p>
            </>
          ) : (
            <>
              <p>King Sejong&rsquo;s <em>Jeongeum</em> is a script you <strong>see</strong>, yet it carries the <strong>logic of sound</strong> — which need not stop at the eye. <strong>Jeongeum Braille</strong> carries Hangul&rsquo;s creation principles straight to the touch: the arrangement of dots <em>is</em> the <strong>shape</strong> of each letter. It renders <strong>25 letters</strong> — the 24 modern letters plus the sky-dot ( ㆍ ).</p>

              <Figure src="/jeoma/slide-1.png" cap="The roots of Jeongeum Braille — consonants, vowels, color and extension." />

              <h3>Roots — Sky·Person·Earth, circle·triangle·square</h3>
              <p>From circle, triangle and square come <strong>ㅇ·ㅅ·ㅁ</strong>; with <strong>ㄴ·ㄱ</strong> they form the five roots <strong>ㅇ ㅅ ㅁ ㄴ ㄱ</strong>. Vowel roots are Sky·Person·Earth themselves — <strong>ㆍ·ㅣ·ㅡ</strong>. The dots draw them: ㅇ a ring, ㅅ a triangle&rsquo;s apex, ㅁ a square&rsquo;s frame; ㆍ one dot, ㅣ three vertical, ㅡ three horizontal.</p>

              <Figure src="/jeoma/slide-2.png" cap="Base letters ㅇ·ㅅ·ㅁ and ㆍ·ㅣ·ㅡ — the dots are the letter's shape." />

              <h3>Growth — added dots and strokes</h3>
              <p>As letters were formed by <strong>adding strokes</strong>, Jeongeum Braille grows by adding dots: ㅇ→ㅎ, ㅅ→ㅈ→ㅊ, ㅁ→ㅂ→ㅍ, ㄴ→ㄷ→ㅌ, ㄱ→ㅋ. The stronger the sound, the more dots.</p>

              <Figure src="/jeoma/slide-3.png" cap="Base consonants and their extensions — grown by added dots and strokes." />

              <p>Vowels grow by placing the sky-dot ( ㆍ ) <strong>exactly where it sits in the written letter</strong>: right of ㅣ gives ㅏ, left gives ㅓ, above ㅡ gives ㅗ, below gives ㅜ.</p>

              <Figure src="/jeoma/slide-4.png" cap="Vowels and their extensions — the sky-dot placed as in the written letter." />

              <h3>Color — Blue·Green·Yellow·Red·Purple</h3>
              <p>The five roots wear five colors: <strong>ㅇ blue · ㅅ green · ㅁ yellow · ㄴ red · ㄱ purple</strong>, drawn from Sky·Person·Earth and the Five Movements — linking braille, too, to Yin·Yang and the Five Elements.</p>

              <h3>Writing — linear and stacked</h3>
              <p><strong>Linear</strong> sets letters in sequence; <strong>stacked</strong> gathers initial·medial·final into one cell, as in Hangul.</p>

              <Figure src="/jeoma/slide-6.png" cap="Example: Daehan-minguk (Republic of Korea) — linear (top) and stacked (bottom)." />

              <p>Jeongeum Braille asks no one to memorize new symbols. A hand that knows Hangul touches its very shape — the principle beautiful to the seeing becomes, unchanged, reachable by those who cannot see. One step toward Jeongeum as <strong>everyone&rsquo;s script</strong>.</p>
            </>
          )}
        </article>
      </section>

      <Community title={ko ? "보탬 · 정음점자" : "Extensions · Jeongeum Braille"} />
    </div>
  );
}
