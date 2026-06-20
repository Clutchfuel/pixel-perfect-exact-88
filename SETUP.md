# ClutchFuel Clutch Score MVP — Setup & Deploy

## Repos

| Repo | Role |
|------|------|
| **`pixel-perfect-exact-88-b80bf162`** (this repo) | Clutch Score MVP — public assessment + Supabase leads |
| **`clutch-athlete-insight`** | Full athlete platform — profile, dashboard, sessions |
| **`pixel-perfect-exact-88`** | Legacy marketing site (archived for new work) |

## Lovable

1. Open the Lovable project linked to **`Clutchfuel/pixel-perfect-exact-88-b80bf162`**
2. **Settings → GitHub** — confirm branch `main`
3. After GitHub push: **Pull from GitHub** if Preview lags, then **Publish**
4. Verify: https://pixel-perfect-exact-88-b80bf162.lovable.app

## Local development

```bash
bun install
cp .env.example .env
bun run dev
```

Supabase keys come from Lovable Cloud / Supabase dashboard — not from git.

## GitHub CI

Pushes to `main` run: `bun install --frozen-lockfile` → `lint` → `build`.

## Supabase

Migrations live in `supabase/migrations/`. Table: `assessment_responses` (quiz answers, score, email, feedback).
