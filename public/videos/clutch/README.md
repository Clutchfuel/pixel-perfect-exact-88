# Hero clutch videos

Trimmed MP4 segments (~4–6s each) for the homepage hero. Config lives in `src/data/clutch-clips.ts`.

## What ships in git

| File | In git? |
|------|---------|
| `hero-reel.mp4` | **Yes** — one looping culture reel for Lovable/production |
| Other `*.mp4` segments | **No** — gitignored; regenerate locally (see below) |

Root `.gitignore` ignores `public/videos/clutch/*.mp4` except `hero-reel.mp4`.

## Homepage hero

Single muted loop: **`hero-reel.mp4`** — HYROX, run club, basketball, and football (two beats each). Clip order: `HERO_REEL_CLIP_IDS` in `src/data/clutch-clips.ts`.

## Regenerate locally

Requires [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/):

```bash
# Hero reel only (faster; skips segments already on disk with --reel-only)
bun run videos:fetch:reel

# Full catalog (all hero segments + reel stitch)
bun run videos:fetch
```

After changing `HERO_REEL_CLIP_IDS`, re-run `videos:fetch:reel` and commit the updated `hero-reel.mp4`.

## CDN / R2 (optional for production)

1. Upload `*.mp4` to Cloudflare R2 (or any static host).
2. Set `VITE_HERO_VIDEO_CDN` to the public origin (no trailing slash), e.g. `https://media.clutchfuel.com`.
3. Rebuild and deploy.

URLs resolve via `src/lib/media.ts` (`heroVideoUrl`).

## Lovable

Clones already include `hero-reel.mp4`, so publish works without yt-dlp/ffmpeg. To refresh the reel after clip changes, regenerate locally and push `hero-reel.mp4`, or point `VITE_HERO_VIDEO_CDN` at hosted assets.
