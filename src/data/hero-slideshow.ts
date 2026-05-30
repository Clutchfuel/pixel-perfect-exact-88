import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";

export type ClutchMoment = {
  id: string;
  label: string;
  /** Short stakes line — what’s on the line when time/scarcity matter */
  stakes?: string;
  sport: string;
  video: string;
  poster: ImageSet;
  alt: string;
  /** YouTube source video ID (trimmed segment in public/videos/clutch/) */
  sourceIds?: string;
};

/**
 * Homepage hero — real clutch moments from HYROX Worlds, parkrun, and elite track (~6s each).
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
    label: "Wall ball grind",
    stakes: "Final station · everything left",
    sport: "Hyrox",
    video: "/videos/clutch/last-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete grinding through wall balls in an all-out HYROX station finish",
    sourceIds: "QLW6RcR-F6I",
  },
  {
    id: "finish-line",
    label: "Sled surge",
    stakes: "Heavy station · move it or lose it",
    sport: "Hyrox",
    video: "/videos/clutch/finish-line.mp4",
    poster: imageSets.sportHyrox,
    alt: "Linda Meier surging through a sled pull at HYROX Chicago Worlds",
    sourceIds: "GlENBVDgb2k",
  },
  {
    id: "surge-pace",
    label: "Photo finish",
    stakes: "Elite heat · lean at the line",
    sport: "Run club",
    video: "/videos/clutch/surge-pace.mp4",
    poster: imageSets.sportRunning,
    alt: "Sprinters dipping at the line in a dead-heat track finish",
    sourceIds: "nmM8NNlMDjc",
  },
];
