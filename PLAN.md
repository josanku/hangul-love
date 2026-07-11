# hangul.love — 기획서 (Website Plan)

> 한글정음(한국어) + HANGUL(영어) 두 책을 세계에 공개하고, 한글을 **배우고·즐기고·나누는** 허브.
> 작성: 2026-07-11 · 소유: 조산구(josanku) · 도메인: hangul.love

## 1. 목표 (Goals)
- 두 책(한글정음 / HANGUL: The Design Philosophy)의 **전체 내용을 웹에서 무료 열람**.
- 단순 열람을 넘어 **학습·체험·창작·나눔** 경험 제공.
- 전 세계 독자 대상 → **한국어/영어 이중언어(i18n)** 기본.
- myhangulname.com 과 **동일 인프라**: Next.js 16 + Tailwind 4 + Vercel + GitHub(josanku).

## 2. 정보구조 (Information Architecture / 메뉴)
1. **Home** — 히어로, 한글 한눈에, 모든 섹션 진입점, 언어 토글(KO/EN).
2. **The Book / 책** — 두 책 전체.
   - 한글정음 (KO) · HANGUL (EN) 언어 전환.
   - 챕터별 웹 리더 (master/*.md, EN은 PDF 추출 텍스트).
   - 원본 PDF 다운로드 (대용량 → Google Drive 링크).
   - 목차: 창제원리 · 첫소리 · 가운뎃소리 · 끝소리 · 세소리어울림 · 낱글자쓰임 · 정인지 서 · 보탬(원형·한글아트·시므스스로 등).
3. **Learn / 배우기**
   - **아시므 — 한글 59초 만에 깨우치기**: 하늘(ㆍ)·사람(ㅣ)·땅(ㅡ) 원리로 순식간에 체득. (ashimeu 이미지 + 인터랙티브 자모 조합기).
   - 자모 기초(닿소리/홀소리), 소리값, 쓰기 순서.
4. **Hangul Art / 한글아트** — 생성예술 갤러리(p5.js 작품 임베드), hangulart.com 연결.
5. **My Hangul Name / 내 한글이름** — myhangulname.com 로 내 이름을 한글로. (연결/임베드)
6. **About / 소개** — 책·저자·한글마당 이야기, 라이선스, 연락.

## 3. 기술 스택 (Stack) — myhangulname 동일
- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4.
- 호스팅: **Vercel** (team_XKrY0ZOeDsPMQ9u4wsFQZwXA), 커스텀 도메인 hangul.love.
- 저장소: **GitHub** github.com/josanku/hangul-love (public).
- 대용량 PDF(1.5GB×2)는 저장소에서 제외(.gitignore), 웹은 마크다운/추출텍스트로 렌더, 원본은 Drive.

## 4. 콘텐츠 소스 (Sources)
- KO 본문: `/Users/skyblue/hangul/master/*.md` (전체 텍스트, 8,234줄).
- EN 본문: `/Users/skyblue/hangul/chapters-en/*.pdf` → pdftotext 추출 → `_content/en-raw/`.
- 아시므: `hangulart/public/ashimeu-hangul.png` + gallery `21_ashimeu.html`.
- 한글아트: `hangulart/public/gallery/*.html` (p5.js), hangulart.com.
- 데이터: `/Users/skyblue/hangul/data/{news,words}.json`.

## 5. 실행 단계 (Build Phases)
0. 기획·기록 (PLAN.md, WORKLOG.md). ← 현재
1. Next.js 스캐폴드 + Tailwind + i18n 뼈대.
2. 콘텐츠 파이프라인: KO md 복사, EN 텍스트 추출·정리, 자산 복사.
3. 페이지 구현: Home / Book(reader) / Learn(ashimeu) / Art / Name / About.
4. GitHub 저장소 생성·푸시.
5. Vercel 배포 + hangul.love 도메인 연결.

## 6. 결정 (모두 진행: 질문은 Yes 기본)
- 저장소명: `hangul-love` (public).
- 이중언어: URL 무접두 + 클라이언트 토글(초기), 추후 `/en` 세그먼트 확장.
- 책 리더: 마크다운→HTML 정적 렌더, 챕터 라우팅 `/book/[lang]/[chapter]`.
- 원본 PDF: 다운로드는 외부(Drive) 링크, 저장소 미포함.
