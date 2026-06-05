# Hero clutch videos

Trimmed MP4s for the homepage hero slideshow (~4–6s each). **Not stored in git** (see root `.gitignore`).

## Local / Lovable build

Requires [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/):

```bash
bun run videos:fetch
```

Clip list and trim windows: `src/data/clutch-clips.ts`.

Homepage hero is **one looping video**: `hero-reel.mp4` — a stitched reel of diverse, younger everyday athletes (Hyrox, parkrun, track, etc.). See `HERO_REEL_CLIP_IDS` in `src/data/clutch-clips.ts`.

`hero-reel.mp4` is committed to git so Lovable/production always has video. Re-run `bun run videos:fetch` after changing clip IDs.

## CDN / R2 (recommended for production)

1. Upload this folder’s `*.mp4` to Cloudflare R2 (or any static host).
2. Set `VITE_HERO_VIDEO_CDN` to the public origin (no trailing slash), e.g. `https://media.clutchfuel.com`.
3. Rebuild and deploy.

The app resolves URLs via `src/lib/media.ts` (`heroVideoUrl`).

## Lovable published site

After cloning on a new machine, run `bun run videos:fetch` before publishing, **or** point `VITE_HERO_VIDEO_CDN` at hosted assets so CI/Lovable builds do not need binaries in the repo.
