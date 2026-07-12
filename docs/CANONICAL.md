# Canonical product branch

**Ship from:** `feat/unified-marketing-clutch-score`  
**Do not treat current `origin/main` as the full product.**

## Why

`origin/main` was rewritten into a **stripped Clutch Score MVP** (homepage assessment only + Supabase). That conflicts with the launch blueprint: full marketing site + diagnostic Clutch Score + leads/D1.

This feature branch is the **full ClutchFuel website** the launch plan targets.

## Safe merge path (when ready)

1. Open/review the PR from this branch → `main`
2. Expect large conflicts (routes, quiz, data layer)
3. Prefer **replacing MVP main with this branch** after stakeholder sign-off — not a blind auto-merge
4. Point Lovable at this branch (or merge to `main` first, then sync Lovable to `main`)
5. Keep MVP assessment history via git tags if needed (`mvp-assessment-2026-06`)

## Until merge

- Continue all product work on `feat/unified-marketing-clutch-score`
- Preview via local `bun run dev` or a Lovable project pointed at this branch
