#!/usr/bin/env node
/**
 * Download and trim real clutch hero clips from YouTube (HYROX Worlds, parkrun, etc.).
 *
 * Usage: node scripts/fetch-clutch-videos.mjs
 *
 * Requires: yt-dlp, ffmpeg
 *
 * Clip list mirrors ClutchClips.jsx — prefer whole-short moments or finish slices.
 */

import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const OUT_DIR = join(ROOT, "public/videos/clutch");
const TMP = join(ROOT, ".tmp/yt-clips");

const VF = "scale=1280:-2,unsharp=3:3:0.6:3:3:0.0";

/** @type {{ youtubeId: string; start: number; end: number; out: string; note: string }[]} */
const CLIPS = [
  {
    youtubeId: "la8Ml7hg1Es",
    start: 8,
    end: 14,
    out: "photo-finish.mp4",
    note: "Charlotte's last-second pass — Tooting parkrun",
  },
  {
    youtubeId: "5s_DDfNRo0c",
    start: 840,
    end: 846,
    out: "pr-attempt.mp4",
    note: "Wenisch holds off McIntyre — HYROX 2025 Worlds Men",
  },
  {
    youtubeId: "PYTjfSUscT0",
    start: 19,
    end: 25,
    out: "last-station.mp4",
    note: "HYROX photo-finish at the line",
  },
  {
    youtubeId: "GlENBVDgb2k",
    start: 360,
    end: 366,
    out: "finish-line.mp4",
    note: "Linda Meier takes the title — HYROX 2025 Worlds Women",
  },
  {
    youtubeId: "CRR5R7b6Kn0",
    start: 26,
    end: 32,
    out: "surge-pace.mp4",
    note: "The closest finish ever — photo finish",
  },
];

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function bin(name, fallback) {
  try {
    execSync(`which ${name}`, { stdio: "ignore" });
    return name;
  } catch {
    return fallback;
  }
}

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const FF = bin("ffmpeg", "/opt/homebrew/bin/ffmpeg");

for (const clip of CLIPS) {
  const raw = join(TMP, `${clip.youtubeId}-raw.mp4`);
  const url = `https://www.youtube.com/watch?v=${clip.youtubeId}`;

  console.log(`\n→ ${clip.out} (${clip.note})`);
  run(
    `yt-dlp --no-playlist -f "bv*[height<=720]/bv*+ba/b" --download-sections "*${clip.start}-${clip.end}" --force-keyframes-at-cuts -o "${raw}" "${url}"`,
  );

  const dest = join(OUT_DIR, clip.out);
  run(
    `"${FF}" -y -i "${raw}" -vf "${VF}" -an -movflags +faststart -c:v libx264 -preset fast -crf 21 "${dest}"`,
  );
  rmSync(raw, { force: true });
}

console.log("\n✓ Real clutch hero videos ready in public/videos/clutch/");
