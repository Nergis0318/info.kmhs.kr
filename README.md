# INFO.KMHS.KR

근명고등학교 학생들을 위한 정보형 웹 서비스입니다. 급식, 시간표, 학사일정, 학교 관련 링크, 유용한 도구를 한곳에서 확인할 수 있도록 만든 Astro 기반 사이트입니다.

## 주요 기능

- 급식 조회: NEIS 급식 API를 사용해 올해 급식 정보를 조회하고, 오늘/내일 급식과 월별 목록을 제공합니다.
- 학사일정 조회: NEIS 학사일정 API를 사용해 오늘의 일정과 월별 학사일정을 보여줍니다.
- 시간표 조회: 학년과 반을 선택해 `API.INFO.KMHS.KR`의 시간표 API에서 주간 시간표를 가져옵니다.
- 링크 모음: 학교 홈페이지, YouTube, Instagram 등 학교 관련 링크를 카드 형태로 제공합니다.
- 도구 모음: 링크 단축, 파일 업로드, 랜덤 자리 배치 생성기로 이동할 수 있습니다.
- 랜덤 자리 배치 생성기: React 컴포넌트로 행/열과 인원 수를 입력해 좌석을 무작위로 배치합니다.
- PWA 설치: `manifest.json`과 서비스 워커를 통해 홈 화면 설치와 기본 캐시를 지원합니다.

## 기술 스택

- Astro 6
- React 19
- TypeScript
- Tailwind CSS 4
- Astro Icon
- Three.js / React Three Fiber
- Cloudflare adapter
- Wrangler
- Bun

## 프로젝트 구조

```text
.
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── favicon.webp
│   └── pwa.png
├── src/
│   ├── assets/
│   │   ├── tool-url.json
│   │   └── url-url.json
│   ├── components/
│   │   ├── Beams.tsx
│   │   ├── IndexCard.astro
│   │   ├── RedirectCard.astro
│   │   ├── SchoolSeatSelector.tsx
│   │   └── ScrollToTopButton.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── meal/index.astro
│   │   ├── timetable/index.astro
│   │   ├── academic_calendar/index.astro
│   │   ├── url/index.astro
│   │   ├── tool/index.astro
│   │   └── install/index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
└── bun.lock
```

## 시작하기

### 요구 사항

- Bun
- Node.js 런타임
- Cloudflare 계정과 Wrangler 로그인 정보, 배포 시 필요

### 설치

```bash
bun install
```

### 개발 서버 실행

```bash
bun run dev
```

기본적으로 Astro 개발 서버가 실행됩니다.

### 빌드

```bash
bun run build
```

빌드 결과물은 `dist/`에 생성됩니다.

### Cloudflare 로컬 미리보기

```bash
bun run preview
```

이 명령은 먼저 `bun run build`를 실행한 뒤 `wrangler dev`로 Cloudflare 환경에 가까운 로컬 미리보기를 실행합니다.

### 타입 생성

```bash
bun run generate-types
```

`wrangler types`를 실행해 Cloudflare Worker 타입 정의를 갱신합니다.

### 배포

```bash
bun run deploy
```

이 명령은 `bun run build` 후 `wrangler deploy`를 실행합니다. `wrangler.jsonc`에는 `info.kmhs.kr` 커스텀 도메인 라우트와 관측성 로그/트레이스 설정이 포함되어 있습니다.

## 외부 API

이 사이트는 브라우저에서 다음 외부 API를 호출합니다.

- `https://open.neis.go.kr/hub/mealServiceDietInfo`: 급식 정보
- `https://open.neis.go.kr/hub/SchoolSchedule`: 학사일정
- `https://api.INFO.KMHS.KR/timetable`: 시간표
- `https://api.INFO.KMHS.KR/mealimg`: 오늘 급식 사진

급식과 학사일정 데이터는 브라우저 `localStorage`에 24시간 캐시됩니다.

## 주요 라우트

| 경로                 | 설명                            |
| -------------------- | ------------------------------- |
| `/`                  | 메인 페이지                     |
| `/meal`              | 급식 조회                       |
| `/timetable`         | 시간표 조회                     |
| `/academic_calendar` | 학사일정 조회                   |
| `/url`               | 학교 관련 링크 모음             |
| `/tool`              | 유용한 도구 모음                |
| `/tool/link`         | 링크 단축 서비스로 리다이렉트   |
| `/tool/file`         | 파일 업로드 서비스로 리다이렉트 |
| `/tool/SSS`          | 랜덤 자리 배치 생성기           |
| `/install`           | PWA 설치 안내                   |
| `/about`             | 사이트 소개                     |

## 코드 포맷

Prettier와 Astro/Tailwind 플러그인이 설정되어 있습니다. 필요할 때 다음 명령으로 포맷을 적용할 수 있습니다.

```bash
bunx prettier --write .
```

## 배포 설정

`astro.config.mjs`는 Cloudflare adapter를 사용하며 사이트 URL은 `https://info.kmhs.kr`입니다. `wrangler.jsonc`의 주요 설정은 다음과 같습니다.

- Worker 이름: `info-kmhs-kr`
- 엔트리: `@astrojs/cloudflare/entrypoints/server`
- Assets binding: `ASSETS`
- Compatibility date: `2026-05-02`
- Custom domain route: `info.kmhs.kr`

## 라이선스

Copyright 2026 Nergis

이 프로젝트는 Apache License 2.0에 따라 배포됩니다. 전체 라이선스 전문은 [LICENSE](LICENSE) 파일을 확인하세요.
