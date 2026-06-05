#!/usr/bin/env node
/**
 * Download hero segments and stitch one looping hero-reel.mp4.
 *
 * Usage: node scripts/run-ts.mjs scripts/fetch-clutch-videos.ts
 *
 * Requires: yt-dlp, ffmpeg
 * Clip list: src/data/clutch-clips.ts (HERO_REEL_CLIP_IDS)
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { platform } from "node:os";
import {
  getClipsToFetch,
  getHeroReelClips,
  heroTrimWindow,
  HERO_REEL_FILENAME,
} from "../src/data/clutch-clips.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/videos/clutch");
const TMP = join(ROOT, ".tmp/yt-clips");

const VF = "scale=1280:-2,unsharp=3:3:0.6:3:3:0.0";

const IS_WIN = platform() === "win32";

function run(cmd: string) {
  execSync(cmd, {
    stdio: "inherit",
    shell: IS_WIN ? process.env.ComSpec ?? "cmd.exe" : "/bin/sh",
  });
}

function bin(name: string, fallback: string) {
  try {
    execSync(IS_WIN ? `where ${name}` : `which ${name}`, { stdio: "ignore" });
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

function buildHeroReel(ff: string) {
  const segments = getHeroReelClips()
    .map((clip) => join(OUT_DIR, clip.heroFile!))
    .filter((path) => existsSync(path));

  if (segments.length < 2) {
    console.warn("\n⚠ Need at least 2 segments to build hero reel. Run segment fetch first.");
    return;
  }

  const listPath = join(TMP, "reel-concat.txt");
  const listBody = segments
    .map((p) => {
      const normalized = p.replace(/\\/g, "/").replace(/'/g, "'\\''");
      return `file '${normalized}'`;
    })
    .join("\n");
  writeFileSync(listPath, listBody, { encoding: "utf8" });

  const dest = join(OUT_DIR, HERO_REEL_FILENAME);
  console.log(`\n→ Stitching ${segments.length} clips → ${HERO_REEL_FILENAME}`);

  run(
    `"${ff}" -y -f concat -safe 0 -i "${listPath}" -vf "${VF}" -an -movflags +faststart -c:v libx264 -preset fast -crf 21 "${dest}"`,
  );
}

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const FF = bin("ffmpeg", "/opt/homebrew/bin/ffmpeg");

for (const clip of getClipsToFetch()) {
  if (clip.id.startsWith("local-")) {
    console.log(`\n→ ${clip.heroFile} (skip fetch — use existing file in public/videos/clutch/)`);
    continue;
  }
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

buildHeroReel(FF);

console.log(`\n✓ Hero reel ready: public/videos/clutch/${HERO_REEL_FILENAME}`);
