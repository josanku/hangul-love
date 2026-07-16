# WORKLOG — hangul.love

## 2026-07-11
- 리소스 조사 완료.
  - 책 원본: `/Users/skyblue/hangul/` (repo josanku/hangul, GitHub Pages, CNAME=hangul.hangulmadang.com).
    - KO 전체 본문: `master/*.md` (8,234줄). EN: `chapters-en/*.pdf` (텍스트 없음, 1.5GB PDF).
  - 인프라 참조: `/Users/skyblue/hangulname` (myhangulname.com) = Next.js 16 + Tailwind 4 + Vercel + GitHub josanku.
  - 한글아트: `/Users/skyblue/hangulart` (Next.js, Vercel) + `public/gallery/*.html` (p5.js). ashimeu: `public/ashimeu-hangul.png`.
- 결정: hangul.love = 신규 Next.js 앱 (myhangulname 동일 스택), Vercel 배포, GitHub josanku/hangul-love.
- 도구 확인: node v20.20, npm 10.8, pdftotext OK, gh 로그인(josanku), vercel CLI 없음(npx 사용).
- **EN 본문 추출 완료**: `chapters-en/*.pdf` → `_content/en-raw/*.txt` (pdftotext -layout, 9,254줄). OCR 잔상 소량(정리 필요).
- PLAN.md 작성 완료. (기획서)
- **Next.js 앱 구현 완료**: layout/Nav/Footer, Home, Book(목록+챕터 리더 KO/EN 17개), Learn(아시므+자모조합기), Art(p5 갤러리), Name(myhangulname iframe), About. i18n(KO/EN 토글, localStorage). 디자인: 한지+오방색.
- `npm run build` 성공(26 페이지, 챕터 17개 SSG). 로컬 스모크 테스트 통과.
- **GitHub 퍼블리시**: https://github.com/josanku/hangul-love (public, main). 대용량 PDF는 .gitignore/.vercelignore 로 제외.
- **Vercel 배포 완료**: project `hangul-love` (prj_SwDjaPpRX7JUkpSCFso4RUA0cMCo), org team_XKrY0ZOeDsPMQ9u4wsFQZwXA (myhangulname/hangulart 동일). GitHub 연결 → 이후 push 자동 배포.
  - Live: https://hangul-love.vercel.app (전 페이지 200, 본문 정상 렌더 확인).
  - 첫 배포가 로컬 1.9GB PDF까지 업로드하려다 실패 → `.vercelignore` 추가 후 재배포(업로드 145B) 성공.
- **도메인 hangul.love**: Vercel 프로젝트에 추가 완료. 단, 네임서버가 Cloudflare(troy/violet.ns.cloudflare.com).
  - ⚠️ 남은 수동 1단계: Cloudflare DNS에 `A  hangul.love  76.76.21.21` (프록시 회색구름/DNS only) 추가 → 자동 연결·SSL 발급. (Cloudflare 자격증명이 로컬에 없어 대신 실행 불가.)
- 상태: 콘텐츠·기능·배포 100% 완료. hangul.love 연결만 CF DNS 레코드 1건 남음.

## 2026-07-11 (2차 — 플립북/표지/목차)
- 사용자 요청: ①첫 페이지에 책 표지 ②각 페이지 이미지로 좌우 넘김(플립북) ③상세 목차→해당 페이지 점프.
- **hangul.love 도메인 라이브 확인**: Cloudflare에 `A hangul.love 76.76.21.21`(DNS only) 추가됨 → HTTP 200, SSL 발급 완료. https://hangul.love 정상.
- 페이지 이미지 소스: 사용자가 Google Drive 폴더 2개 제공.
  - EN: "HANGUL, THE COSMIC PHILOSOPHY 202603" 428p (개정판, 로컬 PDF의 'Design Philosophy'와 다른 에디션) → Drive 공개링크 curl 다운로드 → sips 1000px/q68 리사이즈 → `public/pages/en/p-001..428.jpg`.
  - KO: "한글정음-우주비밀코드-20260325" = 로컬 1.9GB PDF와 동일 → pdftoppm 로컬 렌더(scale-to-x 1000) → `public/pages/ko/p-001..388.jpg`.
  - 총 816장, ~80MB. 원본 대용량 PDF는 계속 제외.
- 신규 코드: `lib/bookPages.ts`(페이지 매니페스트+장별 KO/EN 시작페이지), `components/Flipbook.tsx`(좌우 넘김·키보드·스와이프·페이지점프·목차드로어·언어전환), `app/book/read/[lang]/page.tsx`. 홈/`/book` 표지·상세목차 반영.
- `npm run build` 성공(28 라우트), 로컬 이미지 서빙 200 확인.

## 2026-07-12 (3차 — 대표 심볼 · 운영자/공유/좋아요/댓글 · 배포 이슈 해결)
- **대표 심볼(하사땅)**: 하늘(원)·사람(세모)·땅(네모) SVG(`public/brand/hasattang.svg`) → 홈 히어로·나브 로고·OG 공유이미지(`opengraph-image.tsx`). 파비콘은 hangulart.com 것(파란 원+하늘점).
- **운영자/커뮤니티 기능**: `lib/kv.ts`(@vercel/kv+인메모리 폴백, `hl:` 프리픽스), API `/api/track|like|comments|admin/stats|admin/comment`, 컴포넌트 TrackView·Reactions(공유+좋아요)·Comments·Community(홈·배우기·아트·소개·책챕터), `/admin` 대시보드(ADMIN_KEY, 조회수·일별차트·인기페이지·좋아요·댓글삭제). 로컬 스모크 전부 200.
- **KV 저장소**: myhangulname의 Upstash 스토어 `upstash-kv-beige-planet`를 `vercel integration resource connect`로 hangul-love에 연결(env 자동주입). ADMIN_KEY 설정. (myhangulname은 `hg:`, hangul.love는 `hl:` 프리픽스로 키 충돌 없음.)
- **배포 이슈**: 프로젝트 루트에 원본 풀해상도 이미지 폴더(EN 704MB `.jpeg` 등)와 EN PDF가 있었고 `git add -A`로 704MB가 커밋됨 → .git 1GB, 매 푸시 1.4GB 전송 실패(408/EPIPE/broken pipe). 해결: `*.jpeg`+원본폴더를 .gitignore/.vercelignore에 추가, `git reset --mixed origin/main` 후 웹용 `public/pages/*.jpg`만 재커밋(80MB). 재푸시(재시도 루프) → Vercel 자동배포.
- env vars: KV_REST_API_URL/TOKEN/READ_ONLY_TOKEN + ADMIN_KEY (Encrypted, prod/preview/dev).

## 2026-07-14 (4차 — 페이지별 본문 텍스트 + 검색 + 크롤링)
- 요청: 각 페이지 이미지에 본문 텍스트를 함께 제공(클릭 시 텍스트), 검색·AI 크롤 가능하게.
- 페이지 단위 텍스트 추출: 이미지와 동일 에디션 원본 PDF(루트의 KO/EN 1.9GB)에서 pdftotext 한 번에 추출 후 form-feed(\f)로 분할 → `src/content/pages/{ko,en}/p-NNN.txt` (KO 388·EN 428, 3.1MB).
- `/read/[lang]/[n]`: 페이지 이미지 + 본문 텍스트 SSG(816쪽) → 검색/AI 크롤 가능한 HTML. 장(chapter) 문맥·이전/다음·언어전환·플립북 링크.
- 플립북: '본문' 토글 패널(현재 페이지 텍스트 fetch) + 전체보기 링크.
- 검색: `/search` + `/api/search`(전 페이지 인메모리 인덱스, 스니펫·하이라이트·페이지 점프), `/api/pagetext`.
- 크롤링: `sitemap.xml`(816 read 페이지 포함) + `robots.txt`(전체 허용, /admin·/api 차단). 나브에 검색 추가.
- 배포: push → Vercel 자동배포. 프로덕션 확인 — /read 200, 검색 'Sejong' 26건.

## 2026-07-15 (5차 — 제목 변경 + 폰트)
- 제목: HANGUL: The Design Philosophy → **HANGUL, The Cosmic Philosophy** (전역: bookPages/i18n/layout/about/footer/book meta/README).
- 폰트(원본 `/Users/skyblue/birth of hangul/`): 나눔명조옛한글·한컴 훈민정음 가로쓰기(HancomHoonminjeongeumH.otf 28MB) → fonttools/pyftsubset 서브셋+woff2.
  - 본문: `NanumMyeongjoYetHangul.woff2`(868KB, 전체음절+책 한자) → `.serif`(=prose/read/flipbook 텍스트).
  - 홀소리·닿소리·옛한글: `HancomHunminH.woff2`(119KB, 자모블록 U+3130-318F·1100-11FF·A960-A97F·D7B0-D7FF, 모던음절 제외) → `.jamo` 클래스(홈 3점·배우기 스텝·자모조합기 버튼).
  - 서브셋 venv: scratchpad/fontenv. font-display: swap.
- 프로덕션 확인: 폰트 200, 제목 Cosmic Philosophy.
