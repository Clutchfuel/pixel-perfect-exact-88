
# ClutchFuel Website Rebuild

Reposition the site from a single-page hydration quiz into a premium, editorial performance platform. The Clutch Score assessment stays as the primary conversion, but it becomes one destination inside a larger brand experience.

## Brand & visual system

A significant shift from the current dark + lime look. Confirm before I commit:

- **Palette**: Deep navy (`#0A1628`) as primary background surface, off-white (`#F7F8FA`) for editorial sections, soft grays for supporting UI, and **electric blue** (`#2E7BFF`-ish) as the single accent. Retire the lime green.
- **Typography**: Modern sans headline pairing — proposing Inter Tight (headlines) + Inter (body), or Söhne-style alternative. Large editorial headlines, generous line-height.
- **Feel**: AG1 trust + Apple spacing + Strava performance energy. Lots of whitespace, rounded cards, soft shadows, subtle motion.
- **Photography/video**: Placeholders using tasteful stock/AI imagery of real-athlete moments until you supply real assets. Hero uses a static cinematic image with a "video coming" hook (background `<video>` support wired but source left as a placeholder to swap in).

## Information architecture

New routes under `src/routes/`:

```text
/                      Home (marketing)
/how-it-works          3-step Clutch Score explainer
/clutch-score          Landing → embeds the existing assessment
/performance-hub       Editorial article grid
/performance-hub/$slug Individual article template (with 3–4 seeded example articles)
/community             Athlete stories + future events
/about                 Story + mission
/privacy               (existing, keep)
```

The current `/` assessment moves into `/clutch-score`. The root becomes the new homepage. All existing quiz logic, Supabase writes, and feedback flow are preserved — only relocated.

## Shared layout

- Sticky, transparent-on-top nav that gains a navy blur background on scroll. Links: Home, How It Works, Performance Hub, Community, About + primary CTA "Take the Clutch Score".
- Mobile: hamburger sheet + sticky bottom CTA bar ("Take the Clutch Score") on every marketing page except the assessment itself.
- Footer: mission line, nav columns, social placeholders (Instagram / LinkedIn / YouTube), email signup (writes to a new `subscribers` table), copyright.

## Page-by-page scope

**Home**: Hero (headline + subhead + primary/secondary CTA + scroll cue), Problem section (illustrated cards), How It Works (3 cards), Why Clutch Score Exists, Performance Pillars (6 cards with lucide icons + hover), Community preview strip, Performance Hub preview (3 latest articles), Social proof (assessment-focused quotes), Final CTA band, Footer.

**How It Works**: Long-form 3-step walkthrough with connecting motion, sample insight card, FAQ, CTA.

**Clutch Score**: Landing intro (60s / personalized / science-informed / no equipment) → mounts the existing assessment component (extracted from `src/routes/index.tsx` into `src/components/clutch-score/Assessment.tsx`).

**Performance Hub**: Editorial grid, category chips (Hydration/Recovery/Fueling/Performance/Training/Mindset), featured + popular sections. Articles are seeded as typed data in `src/content/articles.ts` (no CMS). Article detail page renders MDX-lite (plain TSX per article) with reading time, category, related reads, CTA to Clutch Score.

**Community**: Athlete story cards (Runner / Basketball / Busy Parent / College Athlete / Weekend Warrior / CrossFit / HYROX), "Future events" section, ambassadors placeholder, CTA.

**About**: Mission narrative, brand pillars, founder note placeholder, CTA.

## Backend

- Reuse existing `assessment_responses` table + `submitFeedback` server fn — no changes.
- New `subscribers` table for the "Join the Clutch Crew" email capture (email, source, created_at). Requires a migration approval step.

## Motion & polish

Reuse existing `Reveal` component for scroll-in fades. Use `hover-scale` and subtle transforms already defined in styles. No heavy libraries.

## SEO

Per-route `head()` with unique title/description/og:*, canonical, JSON-LD (Organization on root, Article schema on hub posts, BreadcrumbList on nested routes). Update `sitemap.xml` and `robots.txt` for the new routes.

## Technical notes (for reference)

- Update `src/styles.css` `@theme` tokens: swap `--color-lime` for `--color-accent` (electric blue), add navy surface tokens, keep semantic shadcn tokens.
- Extract quiz to `src/components/clutch-score/Assessment.tsx`; `/clutch-score` and (optionally) `/` embed it.
- Add `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileStickyCta.tsx`, wrap via `__root.tsx` (excluded on `/clutch-score` if desired).
- Article content in `src/content/articles.ts`; detail route reads from that array.
- Subscriber capture via a new `subscribe.functions.ts` server fn.

## Out of scope for this pass

- Real cinematic hero video (placeholder wired, swap URL when ready).
- Real athlete photography (using tasteful generated/stock imagery meanwhile).
- CMS for the Performance Hub (seeded TS data now, easy to migrate later).
- Ambassador applications, events booking, hydration lab calculators.

## Open questions before I build

1. **Color palette shift**: OK to fully retire lime green in favor of electric blue on navy? Or keep lime as a secondary accent somewhere?
2. **Assessment location**: Should `/` be the new marketing home (assessment moves to `/clutch-score`), or keep the assessment at `/` and add the marketing pages around it?
3. **Imagery**: OK to use AI-generated athlete imagery as placeholders now, with the plan to swap for real photography later?
