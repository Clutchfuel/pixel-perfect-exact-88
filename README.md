# ClutchFuel Website

Marketing site for [ClutchFuel](https://clutchfuel.com): hydration system, Clutch Score quiz, insights, and lead capture. Built with **TanStack Start**, **React 19**, and **Vite 7**, synced from [Lovable](https://lovable.dev) to GitHub.

|                         |                                                      |
| ----------------------- | ---------------------------------------------------- |
| **Published (Lovable)** | https://pixel-perfect-exact-88.lovable.app           |
| **GitHub**              | https://github.com/Clutchfuel/pixel-perfect-exact-88 |
| **Package name**        | `clutchfuel-website`                                 |

Full deploy workflow, preview drift, and hosting notes: **[SETUP.md](./SETUP.md)**.  
Production secrets, Turnstile, KV, and monitoring: **[docs/PRODUCTION.md](./docs/PRODUCTION.md)**.

## Quick start

```bash
bun install
bun run setup          # .dev.vars.example → .dev.vars
bun run videos:fetch   # hero MP4s (yt-dlp + ffmpeg) — see public/videos/clutch/README.md
bun run dev            # http://localhost:5173
```

## Scripts

| Command                        | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| `bun run dev`                  | Local development                                     |
| `bun run build`                | Production build                                      |
| `bun run test`                 | Unit tests (score, security, hydration lab)           |
| `bun run test:e2e`             | Smoke tests (SEO, APIs, key routes)                   |
| `bun run lint`                 | ESLint + Prettier                                     |
| `bun run videos:fetch`         | Download/trim hero clips into `public/videos/clutch/` |
| `bun run verify:production`    | Pre-deploy env checklist (`.dev.vars`)                |
| `bun run configure:production` | Cloudflare Worker: KV, secrets, deploy                |

## Environment variables

Copy [`.dev.vars.example`](./.dev.vars.example) via `bun run setup`. Never commit `.dev.vars`.

| Variable                  | Scope  | Required in prod                           |
| ------------------------- | ------ | ------------------------------------------ |
| `VITE_SITE_URL`           | Client | Yes                                        |
| `VITE_TURNSTILE_SITE_KEY` | Client | Recommended (pair with secret)             |
| `VITE_GA_MEASUREMENT_ID`  | Client | Optional (cookie consent)                  |
| `VITE_HERO_VIDEO_CDN`     | Client | Optional (R2/CDN base URL for hero MP4s)   |
| `RESEND_API_KEY`          | Server | Yes                                        |
| `RESEND_FROM_EMAIL`       | Server | Yes (verified sender)                      |
| `LEADS_TO_EMAIL`          | Server | Yes                                        |
| `TURNSTILE_SECRET_KEY`    | Server | When site key is set                       |
| `ERROR_WEBHOOK_URL`       | Server | Recommended (Slack/PagerDuty JSON webhook) |

**Lovable:** Project → **Settings** → **Environment** — add the same keys (server keys without `VITE_` prefix).

## Repository name (optional)

The GitHub repo is still named `pixel-perfect-exact-88` (Lovable default). To rename: GitHub → **Settings** → **General** → **Repository name** → `clutchfuel-website`, then update Lovable GitHub sync and `VITE_SITE_URL` if the published hostname changes.

## Returning athletes (homepage CTAs)

The marketing site and athlete app run on different origins. After login, redirect athletes back with `?athlete_session=1` (sets `cf-athlete-authenticated` in localStorage). The athlete app can also set that key when both apps share an origin in production.

## License

[MIT](./LICENSE)
