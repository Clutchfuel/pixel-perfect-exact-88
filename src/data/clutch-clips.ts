/**
 * Clutch clip catalog — mirrors ClutchClips.jsx (all 10 sources).
 * heroStart/heroEnd: verified trim window for hero mp4 (see scripts/fetch-clutch-videos.mjs).
 */

export type ClutchClipMode = "whole" | "slice";

export type ClutchClipTag =
  | "HYROX"
  | "Run Club"
  | "Endurance"
  | "Track"
  | "Basketball"
  | "Football"
  | "Combat";

export type ClutchClip = {
  id: string;
  title: string;
  tag: ClutchClipTag;
  mode: ClutchClipMode;
  /** Slice start (seconds) — slice mode, or optional override */
  start?: number;
  /** Slice end (seconds) */
  end?: number;
  /** Verified hero trim when mode is whole but source is longer than ~8s */
  heroStart?: number;
  heroEnd?: number;
  /** Output filename in public/videos/clutch/ when used in hero */
  heroFile?: string;
};

export const clutchClips: ClutchClip[] = [
  {
    id: "Nat2v24yvMU",
    title: "Tommy Fury's viral parkrun sprint finish",
    tag: "Run Club",
    mode: "whole",
    heroFile: "photo-finish.mp4",
  },
  {
    id: "Hvmhfqt0P9M",
    title: "Upton Court parkrun sprint finish",
    tag: "Run Club",
    mode: "whole",
    heroStart: 19,
    heroEnd: 25,
  },
  {
    id: "la8Ml7hg1Es",
    title: "Charlotte's last-second pass at the line — Tooting",
    tag: "Run Club",
    mode: "whole",
    heroStart: 198,
    heroEnd: 204,
    heroFile: "surge-pace.mp4",
  },
  {
    id: "PYTjfSUscT0",
    title: "HYROX photo-finish at the line",
    tag: "HYROX",
    mode: "whole",
    heroStart: 20,
    heroEnd: 26,
    heroFile: "last-station.mp4",
  },
  {
    id: "CRR5R7b6Kn0",
    title: "The closest finish ever — photo finish",
    tag: "Endurance",
    mode: "whole",
    heroStart: 26,
    heroEnd: 32,
  },
  {
    id: "5s_DDfNRo0c",
    title: "Wenisch holds off McIntyre — HYROX 2025 Worlds (Men)",
    tag: "HYROX",
    mode: "slice",
    start: 840,
    end: 846,
    heroFile: "pr-attempt.mp4",
  },
  {
    id: "GlENBVDgb2k",
    title: "Linda Meier takes the title — HYROX 2025 Worlds (Women)",
    tag: "HYROX",
    mode: "slice",
    start: 360,
    end: 366,
    heroFile: "finish-line.mp4",
  },
  {
    id: "vW77ak0aoj0",
    title: "Founder vs. founder — 5K showdown finish",
    tag: "Run Club",
    mode: "slice",
    start: 540,
    end: 546,
  },
  {
    id: "QH4KJ-z-KqY",
    title: "Frantic 1500m kick — Karlsruhe",
    tag: "Track",
    mode: "slice",
    start: 150,
    end: 156,
    heroFile: "run-club-stride.mp4",
  },
  {
    id: "J_HRZcZvKWk",
    title: "Jakob's closing kick — 5000m, Roma 2024",
    tag: "Track",
    mode: "slice",
    start: 720,
    end: 726,
    heroFile: "hyrox-run.mp4",
  },
  {
    id: "local-hyrox-station",
    title: "HYROX — last station push",
    tag: "HYROX",
    mode: "whole",
    heroFile: "hyrox-station.mp4",
    heroStart: 0,
    heroEnd: 6,
  },
  {
    id: "local-hyrox-sled",
    title: "HYROX — sled drive to the line",
    tag: "HYROX",
    mode: "whole",
    heroFile: "hyrox-sled.mp4",
    heroStart: 0,
    heroEnd: 6,
  },
  /** Trim with scripts/fetch-clutch-videos.mjs — swap YouTube id if you prefer another clip */
  {
    id: "dCLh-Ug8Fi0",
    title: "Game-winning basket — buzzer beater",
    tag: "Basketball",
    mode: "whole",
    heroStart: 0,
    heroEnd: 6,
    heroFile: "game-winner-basketball.mp4",
  },
  {
    id: "pklKb7yYqHo",
    title: "Game-winning touchdown",
    tag: "Football",
    mode: "whole",
    heroStart: 0,
    heroEnd: 6,
    heroFile: "touchdown-finish.mp4",
  },
  {
    id: "3pQ0AWFNdfk",
    title: "UFC — championship finish",
    tag: "Combat",
    mode: "whole",
    heroStart: 4,
    heroEnd: 10,
    heroFile: "combat-finish.mp4",
  },
];

/** Homepage hero rotation — big-moment clips across sports (needs hero mp4; see videos:fetch). */
export const HERO_CLIP_IDS = [
  "GlENBVDgb2k",
  "5s_DDfNRo0c",
  "PYTjfSUscT0",
  "local-hyrox-station",
  "dCLh-Ug8Fi0",
  "pklKb7yYqHo",
  "3pQ0AWFNdfk",
  "Nat2v24yvMU",
  "la8Ml7hg1Es",
  "local-hyrox-sled",
] as const;

export function getClutchClipById(id: string): ClutchClip | undefined {
  return clutchClips.find((c) => c.id === id);
}

export function getHeroClips(): ClutchClip[] {
  return HERO_CLIP_IDS.map((id) => getClutchClipById(id)).filter(
    (c): c is ClutchClip => c != null && c.heroFile != null,
  );
}

/** Resolved start/end seconds for hero mp4 download. */
export function heroTrimWindow(
  clip: ClutchClip,
  durationSec: number,
): { start: number; end: number } {
  if (clip.mode === "slice" && clip.start != null && clip.end != null) {
    return { start: clip.start, end: clip.end };
  }
  if (clip.heroStart != null && clip.heroEnd != null) {
    return { start: clip.heroStart, end: clip.heroEnd };
  }
  if (durationSec <= 8) {
    return { start: 0, end: durationSec };
  }
  const len = Math.min(6, durationSec);
  return { start: durationSec - len, end: durationSec };
}
