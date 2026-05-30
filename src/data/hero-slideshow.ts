import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";

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

/**
 * Homepage hero — real high-intensity clutch moments (~6s each).
 * Segments sourced via scripts/fetch-clutch-videos.mjs (yt-dlp).
 */
export const heroClutchMoments: ClutchMoment[] = [
  {
    id: "photo-finish",
    label: "Last-second pass",
    stakes: "Final stride · place on the line",
    sport: "Run club",
    video: "/videos/clutch/photo-finish.mp4",
    poster: imageSets.sportRunning,
    alt: "Runner sprinting past a rival in the final meters at a parkrun finish line",
    sourceIds: "la8Ml7hg1Es",
  },
  {
    id: "pr-attempt",
    label: "Holds off rival",
    stakes: "Worlds podium · one move left",
    sport: "Hyrox",
    video: "/videos/clutch/pr-attempt.mp4",
    poster: imageSets.sportHyrox,
    alt: "HYROX elite athlete holding off a charging rival at Chicago Worlds",
    sourceIds: "5s_DDfNRo0c",
  },
  {
    id: "last-station",
    label: "HYROX photo finish",
    stakes: "Finish line · result locked in",
    sport: "Hyrox",
    video: "/videos/clutch/last-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athletes lunging across the HYROX finish line in a dead-heat photo finish",
    sourceIds: "PYTjfSUscT0",
  },
  {
    id: "finish-line",
    label: "Title on the line",
    stakes: "World champion · heavy station",
    sport: "Hyrox",
    video: "/videos/clutch/finish-line.mp4",
    poster: imageSets.sportHyrox,
    alt: "Linda Meier surging through a decisive station moment at HYROX Chicago Worlds",
    sourceIds: "GlENBVDgb2k",
  },
  {
    id: "surge-pace",
    label: "Closest finish ever",
    stakes: "Dead heat · lean decides it",
    sport: "Run club",
    video: "/videos/clutch/surge-pace.mp4",
    poster: imageSets.sportRunning,
    alt: "Two runners dipping at the line in the closest sprint finish imaginable",
    sourceIds: "CRR5R7b6Kn0",
  },
];
