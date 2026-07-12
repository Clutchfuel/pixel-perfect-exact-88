# ClutchFuel Go-Live Gameplan (Agent Handoff)

**Purpose:** Feed this entire document to Claude Cowork (or any coding agent) to finish what is left and take ClutchFuel live.  
**Authoring context date:** 2026-07-12  
**Do not invent a new product direction.** Follow this plan exactly.

---

## 0. Mission

Ship **one** production product on **https://clutchfuel.com**:

1. Full marketing website  
2. Embedded **Clutch Score** diagnostic (score + Biggest Opportunity + First Clutch Move™)  
3. Email capture + durable lead storage  
4. Correct SEO/canonicals on the real domain  
5. Analytics events firing  

**Not in scope for this go-live:** SMS, auth/dashboard app, ecommerce checkout, force-pushing history, redesign for its own sake.

---

## 1. Source of truth (read this twice)

### Repos

| Repo | URL | Role |
|------|-----|------|
| **Canonical website** | https://github.com/Clutchfuel/pixel-perfect-exact-88 | Full marketing site + Clutch Score |
| Assessment donor (deprecated as separate product) | https://github.com/Clutchfuel/clutch-athlete-insight | Historical diagnostic content; do not ship as primary URL |

### Critical branch fact

- **`origin/main` was rewritten into a stripped Clutch Score MVP** (homepage-only assessment + Supabase). That is **NOT** the full launch product.
- The **canonical full site** is branch:  
  **`feat/unified-marketing-clutch-score`**
- Open PR (review/cutover):  
  https://github.com/Clutchfuel/pixel-perfect-exact-88/pull/12
- Docs on branch: `docs/CANONICAL.md`, `docs/DATA.md`, `SETUP.md`

### Local path (if present on this machine)

```text
/Users/dkap/Desktop/Code Projects/pixel-perfect-exact-88
```

Assessment clone (reference only):

```text
/Users/dkap/Desktop/Code Projects/_clutch-research/clutch-athlete-insight
```

### Locked product decisions (do not reverse)

1. One public product URL: `clutchfuel.com`  
2. Clutch Score content = diagnostic from athlete-insight (`diagnostic-config.ts`): opportunity + First Clutch Move  
3. Old hydration quiz is archived under `src/lib/_legacy/hydration-quiz/` — not user-facing  
4. Production host = **Cloudflare Workers** (`wrangler.jsonc`, worker name `clutchfuel-website`)  
5. Lovable = staging/preview only after cutover  
6. Platform/dashboard UI is **vision / coming soon**, not a live logged-in app  

---

## 2. What is already done (do not redo)

On `feat/unified-marketing-clutch-score`:

- Full marketing site restored/shipped on this branch  
- `/clutch-score` rebuilt with diagnostic funnel (intro → 5 Qs → results → email → optional feedback)  
- Testimonials / fake Early Reviews removed  
- Everyday-athlete community copy  
- Privacy + consent fixes  
- D1 schema + write path code (`migrations/0001_leads.sql`, `src/lib/leads-db.ts`)  
- Resend email templates for diagnostic results  
- Nurture copy ready (not auto-sent): `src/data/nurture-emails.ts`  
- GA event names wired: `clutch_score_start`, `clutch_score_step`, `clutch_score_complete`, `clutch_score_email_save`, `clutch_score_feedback_submit`  
- SEO: `llms.txt`, HowTo/WebApplication schema, sitemap priorities, canonical default `https://clutchfuel.com`  
- Pillar insight articles + expanded FAQ  
- Platform honesty labels  
- Quiz a11y focus management  
- Hero video preload lightened  
- PR #12 opened  

**Gaps left are mostly ops + cutover**, not greenfield product build.

---

## 3. Agent operating rules

1. Work in repo `pixel-perfect-exact-88` on branch `feat/unified-marketing-clutch-score` unless user explicitly says otherwise.  
2. **Do not force-push `main`.**  
3. **Do not merge PR #12 without confirming with the human** if conflicts are large — prepare the merge, show the plan, then merge only with approval (or if human already said “merge it”).  
4. Never commit secrets (`.dev.vars`, API keys).  
5. Prefer existing patterns in the repo (TanStack Start, Resend, D1, Turnstile).  
6. After each phase: `bun run test` and `bun run build`.  
7. Commit when a phase is complete; push the feature branch.  
8. Domain DNS changes: only when human asks / confirms registrar access.  

---

## 4. Phase A — Make the canonical branch the production codebase

### Goal
Production code = full marketing site + diagnostic Score (not MVP main).

### Steps

1. Checkout and update:

```bash
cd "/Users/dkap/Desktop/Code Projects/pixel-perfect-exact-88"
git fetch origin
git checkout feat/unified-marketing-clutch-score
git pull --ff-only
```

2. Open/review PR #12 vs `main`. Summarize conflict risk to the human.  
3. **Preferred cutover method (safest intentional replace):**

Option A (recommended if human approves replacing MVP main):

```bash
# After human approval:
git checkout main
git pull origin main
# Tag MVP for history
git tag mvp-assessment-2026-06 origin/main
git push origin mvp-assessment-2026-06

# Merge feature branch (resolve conflicts favoring feature branch product)
git merge feat/unified-marketing-clutch-score
# Fix conflicts carefully — KEEP full marketing routes + diagnostic clutch-score
bun install
bun run test
bun run build
git push origin main
```

Option B (if merge is too painful): ask human permission for a carefully explained strategy; do **not** `push --force` unless human explicitly requests it.

4. Point Lovable GitHub sync to **`main`** (after merge) or temporarily to `feat/unified-marketing-clutch-score`.  
5. Verify published preview shows:
   - Marketing homepage sections  
   - `/clutch-score` diagnostic (not the MVP cramp/dehydration quiz)  
   - `/insights`, `/products`, `/athletes`, etc.

### Done when
Canonical full site is on the branch Lovable/production will deploy from.

---

## 5. Phase B — Cloudflare infrastructure (before or with domain)

### Goal
Worker can run with real D1 + KV + secrets (even on `*.workers.dev` first).

### B1. Auth

```bash
bunx wrangler login
bunx wrangler whoami
```

### B2. Create D1

```bash
bunx wrangler d1 create clutchfuel-leads
```

Paste the returned `database_id` into `wrangler.jsonc` → `d1_databases[0].database_id`  
Keep binding name: **`LEADS_DB`**  
Keep `database_name`: **`clutchfuel-leads`**  
Keep `migrations_dir`: **`migrations`**

### B3. Apply migrations

```bash
bunx wrangler d1 migrations apply LEADS_DB --remote
bunx wrangler d1 migrations apply LEADS_DB --local   # optional
```

Confirm tables exist: `clutch_score_responses`, `leads`, `feedback`.

### B4. Create KV rate limit namespace

```bash
bunx wrangler kv namespace create RATE_LIMIT_KV
bunx wrangler kv namespace create RATE_LIMIT_KV --preview
```

Replace zero IDs in `wrangler.jsonc` → `kv_namespaces` for `RATE_LIMIT_KV`.

### B5. Set secrets

Use Worker dashboard **or**:

```bash
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put RESEND_FROM_EMAIL
bunx wrangler secret put LEADS_TO_EMAIL
bunx wrangler secret put TURNSTILE_SECRET_KEY
bunx wrangler secret put LEADS_EXPORT_TOKEN
```

Set **non-secret / Vite** vars for the build/deploy environment:

```text
VITE_SITE_URL=https://clutchfuel.com          # use workers.dev URL temporarily if domain not ready
VITE_GA_MEASUREMENT_ID=G-XXXXXXXX
VITE_TURNSTILE_SITE_KEY=xxxxxxxx
```

Also configure the same in Cloudflare Workers Variables for production builds as the project expects (`SETUP.md`, `.dev.vars.example`).

### B6. Resend

1. Create/verify Resend account  
2. Verify domain `clutchfuel.com` (or use temporary verified sender for pre-domain tests)  
3. `RESEND_FROM_EMAIL` must match a verified from-address  
4. `LEADS_TO_EMAIL` = team inbox (e.g. `hello@clutchfuel.com`)

### B7. Deploy Worker (pre-domain OK)

```bash
bun run build
bunx wrangler deploy
```

Smoke on the workers.dev URL.

### Done when
Worker is live; D1 writes succeed; emails send on Score save (or clearly skipped only in local without key — production must send).

---

## 6. Phase C — Domain cutover

### Goal
`https://clutchfuel.com` serves the Worker with correct SEO URLs.

### Steps

1. In Cloudflare DNS / Workers custom domains, attach:
   - `clutchfuel.com`  
   - `www.clutchfuel.com` → redirect to apex  
2. Force HTTPS  
3. Set `VITE_SITE_URL=https://clutchfuel.com`  
4. Rebuild + redeploy Worker  
5. Verify:
   - `curl -I https://clutchfuel.com`  
   - View-source: canonicals/OG use clutchfuel.com (not lovable.app)  
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`  

### Redirects

1. Redirect assessment Lovable URL:  
   `https://clutch-athlete-insight.lovable.app/*` → `https://clutchfuel.com/clutch-score`  
2. Optionally redirect old marketing Lovable URL to clutchfuel.com after cutover.  
3. Lovable becomes staging-only.

### Done when
A phone on cellular can open clutchfuel.com and complete the Score end-to-end.

---

## 7. Phase D — Production smoke test (mandatory)

Run on **https://clutchfuel.com** (or workers.dev if pre-domain):

### Marketing
- [ ] `/` loads; hero CTA → `/clutch-score`  
- [ ] Community section present; no Early Reviews/testimonials  
- [ ] `/products`, `/athletes`, `/insights`, `/faq`, `/privacy` load  

### Clutch Score
- [ ] Intro → 5 questions → results (score, opportunity, First Clutch Move)  
- [ ] Email save with consent  
- [ ] User receives results email  
- [ ] Team receives lead email  
- [ ] Row in D1 `clutch_score_responses`  
- [ ] Optional feedback saves to `feedback`  

### Other forms
- [ ] Footer newsletter  
- [ ] Contact form  

### Analytics
- [ ] Cookie consent → GA4 loads  
- [ ] Events visible in GA4 Debug/Realtime: start, step, complete, email_save  

### Honesty / UX
- [ ] Platform/dashboard labeled vision/coming soon  
- [ ] Mobile usable at 375px width  

### Export
```text
GET /api/admin/export-leads?token=LEADS_EXPORT_TOKEN
```
Returns JSON leads (401 without token).

---

## 8. Phase E — Soft-launch ops (same week)

### E1. Nurture emails
Copy lives in `src/data/nurture-emails.ts`.

Wire in Resend Audiences **or** Loops:

- Day 0: already sent by app (results email)  
- Day 2: First Clutch Move reminder  
- Day 5: Prepare/Perform/Recover system tip  

Segment by `opportunity` when possible.

### E2. Search Console
1. Verify `clutchfuel.com`  
2. Submit `https://clutchfuel.com/sitemap.xml`  

### E3. Weekly scorecard (document for founders)
- Sessions  
- Score starts  
- Completion rate  
- Email capture rate  
- Top opportunities  

### E4. Legal (optional but recommended)
Have counsel skim `src/routes/privacy.tsx` before heavy marketing spend.

---

## 9. Environment variable reference

From `.dev.vars.example` / SETUP:

```text
# Client
VITE_SITE_URL=https://clutchfuel.com
VITE_GA_MEASUREMENT_ID=
VITE_TURNSTILE_SITE_KEY=

# Server
RESEND_API_KEY=
RESEND_FROM_EMAIL=
LEADS_TO_EMAIL=hello@clutchfuel.com
TURNSTILE_SECRET_KEY=
LEADS_EXPORT_TOKEN=
ERROR_WEBHOOK_URL=   # optional
```

Data model details: `docs/DATA.md`.

---

## 10. Key files the agent may touch

| Area | Paths |
|------|--------|
| Score UI | `src/routes/clutch-score.tsx` |
| Scoring SSOT | `src/lib/diagnostic-config.ts`, `src/lib/diagnostic-result.ts` |
| Leads API | `src/routes/api/leads/*` |
| D1 | `migrations/0001_leads.sql`, `src/lib/leads-db.ts`, `wrangler.jsonc` |
| Email | `src/lib/email-templates.ts`, `src/lib/leads.ts` |
| Nurture copy | `src/data/nurture-emails.ts` |
| Config/SEO | `src/config.ts`, `src/lib/seo.ts`, `src/routes/sitemap[.]xml.ts`, `src/routes/llms[.]txt.ts` |
| Deploy docs | `SETUP.md`, `docs/CANONICAL.md`, `docs/DATA.md` |

---

## 11. Explicit do-not list

- Do not rebuild the Clutch Score from scratch  
- Do not restore the old hydration quiz as primary Score  
- Do not ship dual public assessment URLs  
- Do not treat `/platform` mock as a live app  
- Do not add SMS for launch  
- Do not commit `.dev.vars` or keys  
- Do not force-push `main` without explicit human request  
- Do not “fix” MVP main by deleting marketing routes  

---

## 12. Suggested commit messages (if agent commits)

```text
Configure D1/KV bindings and document production secrets setup.

Prepare clutchfuel.com Worker cutover and SITE_URL production config.

Add go-live smoke notes and Search Console / nurture wiring docs.
```

Only commit when human expects commits; otherwise leave a summary of exact commands run.

---

## 13. Definition of “live”

ClutchFuel is live when **all** are true:

1. Full site (not MVP-only) is what `clutchfuel.com` serves  
2. Clutch Score diagnostic completes on mobile  
3. Results email delivers  
4. Lead stored in D1  
5. Canonicals/sitemap use `https://clutchfuel.com`  
6. GA4 records a test completion  
7. Old assessment Lovable URL redirects to `/clutch-score`  
8. Platform clearly labeled as vision/coming soon  

---

## 14. First message the agent should send the human

Ask only what blocks execution:

1. Approve merging PR #12 / replacing MVP `main` with the feature branch? (yes/no)  
2. Confirm Cloudflare + Resend + GA4 access are available in this environment.  
3. Confirm domain DNS can be changed now, or stop after workers.dev smoke test.  

Then execute Phases A→E in order based on answers.

---

## 15. Quick command cheat sheet

```bash
cd "/Users/dkap/Desktop/Code Projects/pixel-perfect-exact-88"
git checkout feat/unified-marketing-clutch-score && git pull

bun install
bun run test
bun run build
bun run dev

bunx wrangler login
bunx wrangler d1 create clutchfuel-leads
bunx wrangler d1 migrations apply LEADS_DB --remote
bunx wrangler kv namespace create RATE_LIMIT_KV
bunx wrangler deploy

# Export check (prod)
curl -s "https://clutchfuel.com/api/admin/export-leads?token=$LEADS_EXPORT_TOKEN" | head
```

---

**End of handoff.** Execute this plan; do not reopen product strategy unless the human changes the locked decisions in Section 1.
