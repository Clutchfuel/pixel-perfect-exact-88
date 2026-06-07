# Lovable plan — status (June 2026)

> **Source of truth:** GitHub `main` + Cursor. Do not re-run obsolete Lovable-only UI tasks that conflict with `SETUP.md`.

## Completed

- **Page heroes:** `src/assets/*` (system, platform, sweat-rate, about, insights, sports, clutch-score) wired via `PageHero` / `imageSets`.
- **Product placeholders:** `ComingSoonVisual` on product cards, system section, and PDP heroes.
- **Clutch Score / Hydration Lab:** Full quiz UX, server-side scoring, lead APIs, email templates.
- **Security:** CSP headers, Turnstile hooks, Zod lead schemas, rate limits, e2e smoke tests.
- **Hero videos:** Config in `src/data/clutch-clips.ts`; MP4s generated via `bun run videos:fetch` (not stored in git). Optional `VITE_HERO_VIDEO_CDN`.

## Ongoing / manual

| Item                       | Owner    | Notes                                                                |
| -------------------------- | -------- | -------------------------------------------------------------------- |
| Production secrets         | You      | Lovable env + `bun run verify:production` — see `docs/PRODUCTION.md` |
| Turnstile + Resend         | You      | Required for live lead capture                                       |
| `ERROR_WEBHOOK_URL`        | You      | Monitoring webhook                                                   |
| Hero MP4 hosting           | You      | `videos:fetch` locally or CDN via `VITE_HERO_VIDEO_CDN`              |
| Real product photography   | Brand    | UI shows "Coming Soon" until bottle assets exist                     |
| Per-article insight covers | Content  | Shared `insights-hero` fallback on `/insights/$slug`                 |
| GitHub repo rename         | Optional | `pixel-perfect-exact-88` → `clutchfuel-website` (see README)         |

## Verify after changes

```bash
bun run lint && bun run test && bun run test:e2e
```

Published URL: https://pixel-perfect-exact-88.lovable.app (hard-refresh after GitHub push).
