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
  /** Mixkit clip IDs (trimmed to peak moment in public/videos/clutch/) */
  sourceIds?: string;
};

/**
 * Homepage hero — endurance clutch moments (~3s each).
 * Stock: Mixkit Free License (https://mixkit.co/license/#videoFree)
 */
export const heroClutchMoments: ClutchMoment[] = [
  {
    id: "photo-finish",
    label: "Photo finish",
    stakes: "Final meters · place on the line",
    sport: "Run club",
    video: "/videos/clutch/photo-finish.mp4",
    poster: imageSets.sportRunning,
    alt: "Two runners surging side by side in the final meters of a track race",
    sourceIds: "32813",
  },
  {
    id: "pr-attempt",
    label: "PR attempt",
    stakes: "PR attempt · no margin left",
    sport: "Hyrox",
    video: "/videos/clutch/pr-attempt.mp4",
    poster: imageSets.sportHyrox,
    alt: "Sprinter launching off the blocks while a coach calls time on the clock",
    sourceIds: "32800",
  },
  {
    id: "last-station",
    label: "Last station",
    stakes: "Final station · clock still running",
    sport: "Hyrox",
    video: "/videos/clutch/last-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete attacking the final wall-ball reps with the finish in sight",
    sourceIds: "52104",
  },
  {
    id: "finish-line",
    label: "Cross the line",
    stakes: "Finish line · result locked in",
    sport: "Run club",
    video: "/videos/clutch/finish-line.mp4",
    poster: imageSets.sportRunning,
    alt: "Competitor driving toward the finish line in a head-to-head race",
    sourceIds: "49046",
  },
  {
    id: "surge-pace",
    label: "Breakaway surge",
    stakes: "Surge to hold pace · one move left",
    sport: "Run club",
    video: "/videos/clutch/surge-pace.mp4",
    poster: imageSets.sportRunning,
    alt: "Runner unleashing a solo surge on a stadium track",
    sourceIds: "589",
  },
];
