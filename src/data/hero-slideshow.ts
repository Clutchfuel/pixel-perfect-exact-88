import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";

export type ClutchMoment = {
  id: string;
  label: string;
  sport: string;
  video: string;
  poster: ImageSet;
  alt: string;
  /** Mixkit clip IDs (trimmed to peak moment in public/videos/clutch/) */
  sourceIds?: string;
};

/**
 * Homepage hero — Hyrox + run club clutch moments (~2.5–3s each).
 * Stock: Mixkit Free License (https://mixkit.co/license/#videoFree)
 */
export const heroClutchMoments: ClutchMoment[] = [
  {
    id: "hyrox-sled",
    label: "Sled drive",
    sport: "Hyrox",
    video: "/videos/clutch/hyrox-sled.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete driving forward through a heavy Hyrox sled push",
    sourceIds: "42555+42556",
  },
  {
    id: "hyrox-run",
    label: "Between stations",
    sport: "Hyrox",
    video: "/videos/clutch/hyrox-run.mp4",
    poster: imageSets.sportHyrox,
    alt: "Runner surging between Hyrox stations at race pace",
    sourceIds: "609",
  },
  {
    id: "hyrox-station",
    label: "Station surge",
    sport: "Hyrox",
    video: "/videos/clutch/hyrox-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete exploding through a max-effort Hyrox station",
    sourceIds: "40246",
  },
  {
    id: "run-club-pack",
    label: "Pack pace",
    sport: "Run club",
    video: "/videos/clutch/run-club-pack.mp4",
    poster: imageSets.sportRunning,
    alt: "Run club athletes holding pace together in a clutch moment",
    sourceIds: "2916",
  },
  {
    id: "run-club-stride",
    label: "Final kick",
    sport: "Run club",
    video: "/videos/clutch/run-club-stride.mp4",
    poster: imageSets.sportRunning,
    alt: "Runner unleashing an explosive finishing stride at the front of the pack",
    sourceIds: "609",
  },
];
