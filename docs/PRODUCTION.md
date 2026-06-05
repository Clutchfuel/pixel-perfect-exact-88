# Production checklist

Use this before go-live on **Lovable** and/or **Cloudflare Workers**.

## 1. Verify environment

```bash
bun run setup
# Fill .dev.vars from .dev.vars.example
bun run verify:production
bun run verify:production --strict   # fail on warnings too
```

## 2. Lovable environment variables

In the Lovable project: **Settings** → **Environment**, set the same values as `.dev.vars`:

| Key | Notes |
|-----|--------|
| `VITE_SITE_URL` | Published URL (canonical + OG tags) |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Server verification (must pair with site key) |
| `RESEND_API_KEY` | Lead + Clutch Score emails |
| `RESEND_FROM_EMAIL` | Verified domain in Resend |
| `LEADS_TO_EMAIL` | Internal inbox |
| `ERROR_WEBHOOK_URL` | JSON POST webhook for `reportError` payloads |
| `VITE_HERO_VIDEO_CDN` | Optional CDN origin for hero MP4s |
| `VITE_GA_MEASUREMENT_ID` | Optional GA4 |

Redeploy / sync from GitHub after changing env.

**Rate limiting on Lovable:** Uses in-memory limits per instance (5 requests/hour per IP+email). For stronger protection, enable Turnstile and monitor Resend spam.

## 3. Hero videos

MP4s are **not in git**. Either:

- Run `bun run videos:fetch` on the build machine before publish, or
- Upload clips to R2/CDN and set `VITE_HERO_VIDEO_CDN` (see `public/videos/clutch/README.md`).

## 4. Cloudflare Workers (custom domain)

```bash
bunx wrangler login
bun run configure:production
```

This script:

1. Creates `RATE_LIMIT_KV` namespaces if needed and patches `wrangler.jsonc`
2. Uploads secrets from `.dev.vars`
3. Runs `wrangler deploy`

Distributed rate limiting applies when `RATE_LIMIT_KV` IDs are real (not placeholders).

## 5. Monitoring

| Signal | How |
|--------|-----|
| SSR / worker errors | `ERROR_WEBHOOK_URL` — JSON body from `src/lib/observability.ts` |
| Resend deliverability | Resend dashboard — bounces, spam complaints |
| Form abuse | Turnstile analytics + 429 rate on `/api/leads/*` |
| Uptime | External ping on published URL + `/api/leads/contact` health (POST with invalid body → 400) |

Example webhook payload:

```json
{
  "level": "error",
  "ts": "2026-06-04T12:00:00.000Z",
  "message": "...",
  "source": "worker",
  "url": "https://..."
}
```

## 6. Post-deploy smoke

```bash
bun run build
bun run preview --port 8080 --host
SKIP_BUILD=1 bun run test:e2e http://localhost:8080
```

On Lovable: hard-refresh the **Published** URL (not Preview only). See [SETUP.md](../SETUP.md).
