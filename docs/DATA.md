# ClutchFuel data layer

## Where things live

| Data | Store | Notes |
|------|--------|--------|
| Clutch Score responses + emails | Cloudflare **D1** (`LEADS_DB`) table `clutch_score_responses` | System of record |
| Newsletter / contact | D1 table `leads` | Plus Resend notification to team |
| Assessment feedback | D1 table `feedback` | Optional post-score form |
| Transactional email | **Resend** | Not a database — delivery only |
| Analytics | **GA4** (after cookie consent) | `VITE_GA_MEASUREMENT_ID` |

## Setup (before production deploy)

```bash
# Create D1 database
wrangler d1 create clutchfuel-leads

# Put the real database_id into wrangler.jsonc → d1_databases[0].database_id

# Apply migrations
wrangler d1 migrations apply LEADS_DB --remote
wrangler d1 migrations apply LEADS_DB --local   # optional for local
```

Also create KV for rate limiting and replace zero IDs in `wrangler.jsonc`.

## Export

Set `LEADS_EXPORT_TOKEN` in Worker secrets, then:

```
GET /api/admin/export-leads?token=YOUR_TOKEN
```

Returns JSON (up to 5000 rows) of clutch score responses and leads.

## Nurture emails

Copy for Day 2 / Day 5 lives in `src/data/nurture-emails.ts`.  
Wire into Resend Audiences or Loops after domain cutover — not auto-sent by the Worker yet.

## Legacy

Previous hydration quiz scoring lives under `src/lib/_legacy/hydration-quiz/` (not user-facing).
