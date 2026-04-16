# AGENTS.md

## Dev commands
- `bun dev` — dev server (Turbopack)
- `bun build` — production build (Turbopack)
- `bun run preview` — `next build --turbopack && next export`

## Build pipeline
1. `next build --turbopack` — generates static output in `/out`
2. `postbuild` script — runs `scripts/generate-sitemap.js` which scans `/out` and writes `sitemap.xml` + `robots.txt`
3. `bun run preview` runs both in sequence

**Important:** `next.config.ts` has `output: 'export'` — the app is fully static, no SSR. The `next export` command is required for the `out/` directory to be fully populated (without it, the sitemap generation fails because `out/` won't contain the HTML pages).

## Architecture
- Next.js App Router, React 19, TypeScript strict
- Path aliases: `@/*` → `src/*`, `@components/*` → `src/components/*`, `@lib/*` → `src/lib/*`, `@styles/*` → `src/styles/*`
- **i18n:** bilingual EN/ES with URL-based routing (`/en/*` and `/es/*` for home, `/tour/360` and `/recorrido/360` for tours, etc.). Middleware handles language cookie-based redirects. Translations live in `src/i18n/translations/`.
- **Components:** Most are client components (`"use client"`) with heavy use of GSAP ScrollTrigger. All page-level components are dynamically imported with `ssr: false` (except HeroVideo which uses `ssr: true`).
- **GSAP:** All components using GSAP must `registerPlugin(ScrollTrigger)`. Use `gsap.context()` in `useEffect` and call `ctx.revert()` on cleanup.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` (CSS-based config in `globals.css` `@theme` block). No `tailwind.config.js` file. Custom colors: `--color-wine`, `--color-blush`, `--color-olive-dark`, `--color-cream`, `--color-sage`.
- **Fonts:** `next/font/google` Montserrat variable + custom `@font-face` for "Madison Sauvage Serif" in `public/fonts/`.
- **`public/video/*` and `public/360/*` are gitignored** (large files).

## Key files
- `src/app/page.tsx` — root redirects to `/en`
- `middleware.ts` — language redirect logic (EN/ES routing)
- `src/i18n/routeMap.ts` — EN/ES URL pair definitions
- `src/i18n/i18n.ts` — i18next initialization
- `scripts/generate-sitemap.js` — sitemap generation (site URL: `https://www.palmasrecovery.com`)
- `.env` — `NEXT_PUBLIC_API_URL=https://www.palmasrecovery.com`

## Console removal in production
`next.config.ts` uses `compiler.removeConsole` in production. Don't rely on `console.log` for debugging in built output.
