## Goal

Fill in the missing visuals across the site, mark all product imagery as "Coming Soon", and verify every route renders cleanly.

## What's there today

- Images already generated: `hero-desktop.jpg`, `hero-mobile.jpg`, `athlete-sweat.jpg` (used by home page only).
- Every other route relies on solid color blocks / gradients with no photography.
- Product cards (`ProductCard`, `SystemSection`, `products.$slug` hero) render an abstract "bottle silhouette" div — no label telling the user it's a placeholder.

## Plan

### 1. Generate new images (saved to `src/assets/`)

Premium-quality photography, on-brand (athletic, clean, energetic, neutral palette + lime accent friendly):

- `system-hero.jpg` — athlete drinking from a bottle mid-training (for `/system` and `/`)
- `platform-hero.jpg` — athlete checking phone post-workout (for `/platform`)
- `sweat-rate-hero.jpg` — close-up sweat on skin / scale & bottle (for `/sweat-rate`)
- `about-team.jpg` — team / lab / formulation shot (for `/about`)
- `insights-hero.jpg` — flat-lay notebook + bottle (for `/insights` index + article fallback)
- `sport-basketball.jpg`, `sport-running.jpg`, `sport-hyrox.jpg`, `sport-gym.jpg` — one action shot per sport (for `/athletes` cards and `/athletes/$sport` hero)
- `clutch-score-hero.jpg` — athlete-on-phone or data overlay shot (for `/clutch-score`)

All `1536×1024` JPGs, `standard` quality. Total: 10 images.

### 2. Product "Coming Soon" treatment

Replace the abstract bottle div in three places with a clean badge layout:

- `src/components/cards/ProductCard.tsx`
- `src/components/sections/SystemSection.tsx`
- `src/routes/products.$slug.tsx` (PDP hero block)

Treatment: keep the existing gradient panel, center a small lime "Coming Soon" pill plus the product `name` and `stage` in display type. No fake bottle silhouette. Accent product keeps the lime glow.

### 3. Wire images into pages

- `PageHero` — extend to optionally accept a background image (`bgImage` prop) with a dark gradient overlay for legibility. Used by sport pages, system, platform, sweat-rate, insights, about, clutch-score.
- `/athletes` index — show each sport's image inside `SportCard` (add `image` to `Sport` type via filename map; render as cover behind a gradient + sport name).
- `/insights` index — hero image on top + article cards keep current clean look.
- `/about` — split-screen with `about-team.jpg`.
- Article fallback — show `insights-hero.jpg` at top of `/insights/$slug` until articles have their own covers.

### 4. Light polish while wiring

- Add a subtle `pt-32` adjustment on routes whose `PageHero` now has a bg image (so it reads as a banner not a card).
- Ensure alt text is descriptive on every new `<img>`.

### 5. Verify end-to-end

- `curl` every route, confirm 200.
- Tail dev-server log for SSR errors after navigation.
- Spot-check `/`, `/products`, `/products/clutch-iso`, `/athletes/basketball`, `/insights`, `/about` for layout/visuals.

## Out of scope

- Real product photography (waiting on real bottles — that's why "Coming Soon").
- Per-article cover images (uses shared insights hero for now).
- Any backend/data changes.
