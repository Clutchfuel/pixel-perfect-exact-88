import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";
import { getHeroClips, type ClutchClipTag } from "@/data/clutch-clips";
import { heroVideoUrl } from "@/lib/media";

export type ClutchMoment = {
  id: string;
  label: string;
  /** Short stakes line — what's on the line when time/scarcity matter */
  stakes?: string;
  sport: string;
  video: string;
  poster: ImageSet;
  alt: string;
  /** YouTube source video ID (trimmed segment in public/videos/clutch/) */
  sourceIds?: string;
};

const TAG_SPORT: Record<ClutchClipTag, string> = {
  HYROX: "Hyrox",
  "Run Club": "Run club",
  Endurance: "Endurance",
  Track: "Track",
  Basketball: "Basketball",
  Football: "Football",
  Combat: "UFC",
};

const TAG_POSTER: Record<ClutchClipTag, ImageSet> = {
  HYROX: imageSets.sportHyrox,
  "Run Club": imageSets.sportRunning,
  Endurance: imageSets.sportRunning,
  Track: imageSets.sportRunning,
  Basketball: imageSets.sportBasketball,
  Football: imageSets.heroClutchFootball,
  Combat: imageSets.sportGym,
};

/** Hero copy keyed by YouTube ID — derived from ClutchClips titles. */
const HERO_COPY: Record<string, { label: string; stakes: string; alt: string }> = {
  "5s_DDfNRo0c": {
    label: "Holds off rival",
    stakes: "Worlds podium · one move left",
    alt: "Wenisch holding off McIntyre at HYROX 2025 Worlds Men",
  },
  GlENBVDgb2k: {
    label: "Title on the line",
    stakes: "World champion · on the line",
    alt: "Linda Meier taking the HYROX 2025 Worlds Women title",
  },
  PYTjfSUscT0: {
    label: "HYROX photo finish",
    stakes: "Finish line · result locked in",
    alt: "Athletes lunging across the HYROX finish line in a dead-heat photo finish",
  },
  Nat2v24yvMU: {
    label: "Viral sprint finish",
    stakes: "Final meters · all-out kick",
    alt: "Tommy Fury's viral parkrun sprint to the line",
  },
  la8Ml7hg1Es: {
    label: "Last-second pass",
    stakes: "Final stride · place on the line",
    alt: "Charlotte passing a rival in the final stride at Tooting parkrun",
  },
  "local-hyrox-station": {
    label: "HYROX — last station",
    stakes: "Final push · finish in sight",
    alt: "Athletes pushing through the last HYROX station",
  },
  "local-hyrox-sled": {
    label: "HYROX — sled drive",
    stakes: "Power through · every meter counts",
    alt: "Athlete driving the HYROX sled toward the line",
  },
  "dCLh-Ug8Fi0": {
    label: "Game-winning shot",
    stakes: "Buzzer · season on the line",
    alt: "Basketball player hitting a game-winning basket",
  },
  pklKb7yYqHo: {
    label: "Touchdown",
    stakes: "End zone · game on the line",
    alt: "Football player scoring a decisive touchdown",
  },
  "3pQ0AWFNdfk": {
    label: "Championship finish",
    stakes: "One moment · everything decided",
    alt: "UFC fighter landing a fight-ending strike",
  },
};

function heroMomentFromClip(clip: ReturnType<typeof getHeroClips>[number]): ClutchMoment {
  const copy = HERO_COPY[clip.id] ?? {
    label: clip.title,
    stakes: "On the line",
    alt: clip.title,
  };
  const file = clip.heroFile!.replace(/\.mp4$/, "");

  return {
    id: file,
    label: copy.label,
    stakes: copy.stakes,
    sport: TAG_SPORT[clip.tag],
    video: heroVideoUrl(clip.heroFile!),
    poster: TAG_POSTER[clip.tag],
    alt: copy.alt,
    sourceIds: clip.id,
  };
}

/**
 * Homepage hero — best 5 clutch moments (~4–6s each).
 * Config + trim windows: src/data/clutch-clips.ts
 * Mp4s: node scripts/fetch-clutch-videos.mjs
 */
export const heroClutchMoments: ClutchMoment[] = getHeroClips().map(heroMomentFromClip);
