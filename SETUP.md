# ClutchFuel Website — Setup & Deploy Workflow

> **Canonical product branch:** `feat/unified-marketing-clutch-score`  
> See [docs/CANONICAL.md](docs/CANONICAL.md). Do not assume `origin/main` is the full marketing site.

## Lovable Preview vs Published URL

This project is hosted on [Lovable](https://lovable.dev) and synced with [GitHub](https://github.com/Clutchfuel/pixel-perfect-exact-88).

| Surface | URL / location | Use for |
|---------|----------------|---------|
| **Published** | https://pixel-perfect-exact-88.lovable.app | **Verify changes after a GitHub push** (confirm which branch Lovable tracks) |
| **Lovable Preview** | In-editor iframe | Dev sandbox only — can lag behind GitHub |
| **Local dev** | `bun run dev` | Active development in Cursor |

**Important:** Pushing to GitHub updates the **Published** site (after Lovable rebuilds) **only if Lovable is tracking that branch**. Point Lovable at `feat/unified-marketing-clutch-score` until it is merged to `main`.

---

## After pushing from Cursor → GitHub

1. Open the **Published URL**: https://pixel-perfect-exact-88.lovable.app  
   Hard-refresh (Cmd+Shift+R) if needed.

2. **Sync Lovable with GitHub** (if Preview still looks wrong):
   - Lovable project → **Settings** → **GitHub**
   - Confirm repo: `Clutchfuel/pixel-perfect-exact-88`, branch: `main`
   - Click **Sync** / **Pull from GitHub**
   - Hard-refresh the Preview pane (Cmd+Shift+R inside the iframe)

3. **Publish** in Lovable when you want to promote the latest Preview build to Published (usually automatic after GitHub sync).

---

## Avoid preview drift

- **Single source of truth:** Edit in Cursor → push to `main` → verify on **Published URL**.
- **Do not rely on Lovable Preview** as the source of truth for GitHub/Cursor work.
- **Ignore or abandon Lovable-only chat tasks** that change layout/components already updated in Cursor (e.g. “Restore home header”, SSR fixes) unless you re-implement them in Cursor and push to GitHub. Those tasks update Preview only and do not appear on `main`.
- **Do not click Preview** on old history entries in Lovable — each row is a snapshot of that commit.

---

## Local development

```bash
bun install
bun run setup          # copies .dev.vars.example → .dev.vars
bun run dev            # http://localhost:5173
```

Optional env in `.dev.vars` (see `.dev.vars.example`): `RESEND_API_KEY`, Turnstile keys, `VITE_SITE_URL`.

```bash
bun run build
bun run preview        # postbuild creates dist/server/server.js for preview
bun run test:e2e       # smoke tests (build + preview + curl checks)
bun run lint
```

---

## GitHub CI

Pushes to `main` run lint, build, unit tests, and e2e smoke via `.github/workflows/ci.yml`.

The TanStack Start build outputs `dist/server/index.js`; `postbuild` copies it to `dist/server/server.js` so `vite preview` works in CI.

---

## Cloudflare Workers (production — domain cutover separate)

Production on a custom domain (e.g. `clutchfuel.com`) uses Cloudflare Workers (`wrangler.jsonc`). That is separate from Lovable hosting and requires `wrangler deploy` plus Worker secrets (see `.dev.vars.example`).

### Before first production deploy (without domain yet)

1. Create D1: `wrangler d1 create clutchfuel-leads` → paste `database_id` into `wrangler.jsonc`
2. Apply migrations: `wrangler d1 migrations apply LEADS_DB --remote`
3. Create KV namespace for `RATE_LIMIT_KV` and paste IDs
4. Set Worker secrets: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEADS_TO_EMAIL`, Turnstile pair, optional `VITE_GA_MEASUREMENT_ID`, `LEADS_EXPORT_TOKEN`
5. See [docs/DATA.md](docs/DATA.md) for export and data model

### Clutch Score product

The live `/clutch-score` experience is the **diagnostic** from `clutch-athlete-insight` (opportunity + First Clutch Move), branded inside this marketing site. Hydration quiz code is archived under `src/lib/_legacy/hydration-quiz/`.
