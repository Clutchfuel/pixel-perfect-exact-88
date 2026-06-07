# Hero clutch videos

Trimmed MP4 segments (~4–6s each) for optional dev previews and legacy tooling. Config: `src/data/clutch-clips.ts`.

## Homepage hero (production)

The live hero is **not** clutch-finish footage. It is a **30-second cinematic “moment before” image reel** — slow Ken Burns crossfades on brand photography (preparation, hydration, training, community).

- Scenes: `src/data/hero-preparation-reel.ts`
- Component: `src/components/HeroPreparationReel.tsx`
- Copy: `src/data/brand-experience.ts` → `brand.hero`

No yt-dlp/ffmpeg required for Lovable publish.

## Optional MP4 segments

| File                   | In git?                                     |
| ---------------------- | ------------------------------------------- |
| `hero-reel.mp4`        | Optional legacy loop (not used by homepage) |
| Other `*.mp4` segments | **No** — gitignored                         |

```bash
bun run videos:fetch:reel   # hero segments + stitch (dev only)
bun run videos:fetch        # full catalog
```

## CDN / R2

Set `VITE_HERO_VIDEO_CDN` if you host legacy MP4s. The preparation image reel does not use this.

URLs resolve via `src/lib/media.ts` (`heroVideoUrl`).
