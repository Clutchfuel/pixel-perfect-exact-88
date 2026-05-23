# ClutchFuel — Multi-Page SEO Build

Turn the current single-page site into a full content site engineered for organic search. Every page is its own indexable landing page with unique copy, metadata, and structured data — built on the existing design system so the visual language stays consistent.

## Site map (final structure)

```text
/                         Home (trimmed: hero + system teaser + sweat teaser + dashboard teaser + final CTA)
/system                   The 3-stage hydration system (full deep page)
/sweat-rate               Educational landing — "sweat rate calculator" target
/platform                 The Clutch Score app / dashboard marketing page
/clutch-score             Existing placeholder (kept as-is)

/products                 Products overview (3-card grid + comparison)
/products/clutch-iso      PDP — Prepare
/products/clutch-flow     PDP — Perform
/products/clutch-recovery PDP — Recover

/athletes                 Athlete profiles hub + sport directory
/athletes/basketball      Sport landing
/athletes/running         Sport landing
/athletes/hyrox           Sport landing
/athletes/gym             Sport landing

/insights                 Content hub index (article grid + categories)
/insights/$slug           Article template — 6 seed articles:
  • hydration-101-for-everyday-athletes
  • how-to-calculate-your-sweat-rate
  • electrolytes-explained-sodium-potassium-magnesium
  • hydration-for-basketball-performance
  • hydration-strategy-for-hyrox-athletes
  • pre-during-post-workout-hydration-guide

/about                    Brand story, philosophy, team placeholder
/faq                      Common questions (with FAQPage JSON-LD)
/contact                  Visual-only contact form + email
/privacy                  Legal page

/sitemap.xml              Server route enumerating everything above
/robots.txt               Allow all + sitemap reference
```

Every CTA on every page still routes to `/clutch-score` — that's the conversion goal.

## SEO foundation (applies to every page)

- **Per-route `head()`** in each route file: unique `title`, `description`, `og:title`, `og:description`, `og:url`, `og:type`, plus `<link rel="canonical">`. All using the project domain. Root keeps only sitewide defaults (no canonical, no `og:image` — leaf-only).
- **JSON-LD per page type**:
  - Root: `Organization` + `WebSite` with `SearchAction`
  - Articles: `Article` + `BreadcrumbList`
  - Products: `Product`
  - FAQ: `FAQPage`
  - Sport/athlete landings: `BreadcrumbList`
- **Internal linking**: every page includes contextual links to related routes (e.g. basketball page links to hydration-for-basketball article, sweat-rate, Clutch ISO). This is where organic ranking compounds.
- **Sitemap.xml** server route auto-enumerates all routes (static array, since insights/products are file-driven not DB-driven).
- **Robots.txt**: `Allow: /` + `Sitemap:` directive.
- **Semantic HTML**: one `h1` per page, `<article>`/`<section>` landmarks, descriptive alt text.

## Page templates (consistent shell)

A new `<PageHero>` component gives every non-home route a tight branded hero (eyebrow, h1, sub, optional CTA) so pages feel like a system, not a collection of one-offs. The existing `Header` (with expanded nav dropdowns) and `Footer` wrap everything.

**Expanded header nav** (desktop dropdowns, mobile accordion):
- The System → /system, /products, /sweat-rate
- Platform → /platform, /clutch-score
- Athletes → /athletes/basketball, /running, /hyrox, /gym
- Insights → /insights
- About → /about, /faq, /contact

## Content strategy per page (so they actually rank)

- **/sweat-rate** — targets "how to calculate sweat rate" + "sweat rate calculator". Educational long-form: what sweat rate is, why it matters, a manual formula explainer, then CTA to Clutch Score for the personalized version.
- **/products/\*** — each PDP has a unique benefit headline, who it's for, when to use it, key ingredients (placeholder facts), 3-4 FAQs.
- **/athletes/[sport]** — sport-specific hydration challenges, what makes this sport demanding, how ClutchFuel fits, sport-specific testimonial slot, related products.
- **/insights/$slug** — 600-900 word articles with H2 structure, related-article cards, Article schema. Articles live as typed data in `src/data/insights.ts` (no CMS needed; Cursor can swap for MDX later).
- **/faq** — 12-15 questions across hydration, products, the Clutch Score, and account. FAQPage schema makes them eligible for rich results.

## File / data organization

- `src/data/site.ts` — extend with full nav structure
- `src/data/products.ts` — 3 products (name, stage, slug, headline, copy, bullets, ingredients, faqs)
- `src/data/sports.ts` — 4 sports (slug, name, hero copy, challenges, recommended products)
- `src/data/insights.ts` — 6 articles (slug, title, excerpt, body sections, date, readTime, category)
- `src/data/faq.ts` — Q&A pairs
- `src/data/about.ts` — story, philosophy, values
- All routes import from `src/data/` — never hard-code copy in components.

## Components added

- `PageHero` — branded route-level hero
- `Breadcrumbs` — for /products/\*, /athletes/\*, /insights/\*
- `ArticleCard` / `ProductCard` / `SportCard` — reusable grid items
- `JsonLd` — tiny helper to emit structured data via `head().scripts`
- `RelatedLinks` — internal linking block reused across leaf pages
- `Faq` accordion (uses existing shadcn accordion)

## Home page trim

The current 9-section homepage becomes lighter so other pages have a reason to exist: keep Hero, condensed System (CTA → /system), condensed Sweat (CTA → /sweat-rate), condensed Dashboard (CTA → /platform), Testimonials, Final CTA. Detailed System/Sweat/Platform content moves to its own routes.

## Out of scope (still — matches your original spec)

- No backend, no real form submissions, no real Clutch Score logic, no analytics, no auth.
- Articles and products are static typed data, not a CMS.
- Real product photography stays as placeholder blocks; hero photography reused across pages.

## Definition of done

- All 20+ routes render cleanly with unique titles + descriptions + canonicals.
- `sitemap.xml` lists every route; `robots.txt` allows crawling and references the sitemap.
- Header/footer nav reach every page; every leaf page has at least 2 internal links back into the cluster.
- No console errors; mobile-clean at 375 / 768 / 1280; build passes.
