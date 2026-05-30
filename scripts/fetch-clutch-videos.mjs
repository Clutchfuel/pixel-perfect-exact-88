#!/usr/bin/env node
/**
 * Download and trim elite endurance clutch hero videos from Mixkit.
 *
 * Mixkit CDN requires Referer header or downloads return 403.
 * License: https://mixkit.co/license/#videoFree
 *
 * Usage: node scripts/fetch-clutch-videos.mjs
 *
 * Rubric (all four must pass):
 * - High stakes: outcome still in doubt (place, PR, finish, cutoff)
 * - Pressure/scarcity: final meters, last reps, visible clock
 * - Individual accountability: one athlete's action decides the result
 * - Elite intensity: max effort, race context, heavy implements — reject jogs/warm-ups
 *
 * Backups if primary fails QA: 32809, 40742, 52088, 52104, 49046
 */

import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const OUT_DIR = join(ROOT, "public/videos/clutch");
const TMP = join(ROOT, ".tmp/clutch-dl");

const VF = "scale=1280:-2,unsharp=3:3:0.6:3:3:0.0";

/** @type {{ id: string; start: number; dur: number; out: string; note: string }[]} */
const CLIPS = [
  {
    id: "587",
    start: 4.0,
    dur: 3.0,
    out: "photo-finish.mp4",
    note: "PASS — Sprinter attacking hurdles on race track (elite heat)",
  },
  {
    id: "32792",
    start: 2.5,
    dur: 3.0,
    out: "pr-attempt.mp4",
    note: "PASS — Woman running fast on track, redline stride",
  },
  {
    id: "52108",
    start: 5.0,
    dur: 3.0,
    out: "last-station.mp4",
    note: "PASS — Burpee broad jumps, Hyrox station max effort",
  },
  {
    id: "7358",
    start: 3.0,
    dur: 3.0,
    out: "finish-line.mp4",
    note: "PASS — Heavy sled drive, grinding functional station",
  },
  {
    id: "33130",
    start: 4.0,
    dur: 3.0,
    out: "surge-pace.mp4",
    note: "PASS — Athlete pushing hard in rain, gritty solo effort",
  },
];

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function ffmpeg() {
  try {
    execSync("which ffmpeg", { stdio: "ignore" });
    return "ffmpeg";
  } catch {
    return "/opt/homebrew/bin/ffmpeg";
  }
}

function ffprobe() {
  try {
    execSync("which ffprobe", { stdio: "ignore" });
    return "ffprobe";
  } catch {
    return "/opt/homebrew/bin/ffprobe";
  }
}

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const FF = ffmpeg();
const PROBE = ffprobe();

for (const clip of CLIPS) {
  const src = join(TMP, `${clip.id}.mp4`);
  const url = `https://assets.mixkit.co/videos/${clip.id}/${clip.id}-720.mp4`;

  console.log(`\n→ ${clip.out} (${clip.note})`);
  run(`curl -fsSL -H "Referer: https://mixkit.co/" -A "Mozilla/5.0" -o "${src}" "${url}"`);

  const duration = execSync(
    `"${PROBE}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${src}"`,
    { encoding: "utf8" },
  ).trim();
  console.log(`  source ${clip.id}: ${duration}s`);

  const dest = join(OUT_DIR, clip.out);
  run(
    `"${FF}" -y -ss ${clip.start} -i "${src}" -t ${clip.dur} -vf "${VF}" -an -movflags +faststart -c:v libx264 -preset fast -crf 21 "${dest}"`,
  );
}

for (const legacy of [
  "hyrox-sled.mp4",
  "hyrox-run.mp4",
  "hyrox-station.mp4",
  "run-club-pack.mp4",
  "run-club-stride.mp4",
]) {
  try {
    rmSync(join(OUT_DIR, legacy));
  } catch {
    /* already gone */
  }
}

console.log("\n✓ Elite clutch hero videos ready in public/videos/clutch/");
