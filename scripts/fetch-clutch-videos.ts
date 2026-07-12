#!/usr/bin/env node
/**
 * Download and trim hero clutch clips from YouTube.
 *
 * Usage: node scripts/run-ts.mjs scripts/fetch-clutch-videos.ts
 *
 * Requires: yt-dlp, ffmpeg
 * Clip list + trim windows: src/data/clutch-clips.ts
 */

import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getHeroClips, heroTrimWindow } from "../src/data/clutch-clips.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/videos/clutch");
const TMP = join(ROOT, ".tmp/yt-clips");

const VF = "scale=1280:-2,unsharp=3:3:0.6:3:3:0.0";

function run(cmd: string) {
  execSync(cmd, { stdio: "inherit", shell: true });
}

function bin(name: string, fallback: string) {
  try {
    execSync(`which ${name}`, { stdio: "ignore" });
    return name;
  } catch {
    return fallback;
  }
}

function ytDuration(id: string): number {
  const out = execSync(
    `yt-dlp --no-playlist --print duration "https://www.youtube.com/watch?v=${id}"`,
    { encoding: "utf8" },
  );
  return Number.parseFloat(out.trim());
}

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const FF = bin("ffmpeg", "/opt/homebrew/bin/ffmpeg");

for (const clip of getHeroClips()) {
  const outFile = clip.heroFile!;
  const url = `https://www.youtube.com/watch?v=${clip.id}`;
  const needsDuration = clip.mode === "whole" && clip.heroStart == null && clip.heroEnd == null;
  const durationSec = needsDuration ? ytDuration(clip.id) : 0;
  const { start, end } = heroTrimWindow(clip, durationSec);
  const raw = join(TMP, `${clip.id}-raw.mp4`);
  const dest = join(OUT_DIR, outFile);

  console.log(`\n→ ${outFile} (${clip.title})`);
  console.log(`  ${clip.id} ${start}s–${end}s`);

  run(
    `yt-dlp --no-playlist -f "bv*[height<=720]/bv*+ba/b" --download-sections "*${start}-${end}" --force-keyframes-at-cuts -o "${raw}" "${url}"`,
  );

  run(
    `"${FF}" -y -i "${raw}" -vf "${VF}" -an -movflags +faststart -c:v libx264 -preset fast -crf 21 "${dest}"`,
  );
  rmSync(raw, { force: true });
}

console.log("\n✓ Hero clutch videos ready in public/videos/clutch/");
