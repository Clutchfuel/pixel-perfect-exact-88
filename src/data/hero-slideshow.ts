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
    alt: "Athlete driving a heavy sled forward in a Hyrox-style station",
    sourceIds: "7358",
  },
  {
    id: "hyrox-run",
    label: "Between stations",
    sport: "Hyrox",
    video: "/videos/clutch/hyrox-run.mp4",
    poster: imageSets.sportHyrox,
    alt: "Runner surging between Hyrox stations on the track",
    sourceIds: "40754",
  },
  {
    id: "hyrox-station",
    label: "Burpee broad jumps",
    sport: "Hyrox",
    video: "/videos/clutch/hyrox-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete attacking burpee broad jumps in a functional fitness station",
    sourceIds: "52108",
  },
  {
    id: "run-club-pack",
    label: "Pack pace",
    sport: "Run club",
    video: "/videos/clutch/run-club-pack.mp4",
    poster: imageSets.sportRunning,
    alt: "Marathon pack holding pace together on the course",
    sourceIds: "40748",
  },
  {
    id: "run-club-stride",
    label: "Group tempo",
    sport: "Run club",
    video: "/videos/clutch/run-club-stride.mp4",
    poster: imageSets.sportRunning,
    alt: "Run club athletes pushing tempo together on a group run",
    sourceIds: "27850",
  },
];
