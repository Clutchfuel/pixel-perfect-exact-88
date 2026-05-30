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
 * Homepage hero — elite endurance clutch moments (~3s each).
 * Stock: Mixkit Free License (https://mixkit.co/license/#videoFree)
 */
export const heroClutchMoments: ClutchMoment[] = [
  {
    id: "photo-finish",
    label: "Hurdle attack",
    stakes: "Elite heat · one stride decides it",
    sport: "Run club",
    video: "/videos/clutch/photo-finish.mp4",
    poster: imageSets.sportRunning,
    alt: "Elite sprinter launching over a hurdle at full race speed on the track",
    sourceIds: "587",
  },
  {
    id: "pr-attempt",
    label: "Redline pace",
    stakes: "PR attempt · no margin left",
    sport: "Hyrox",
    video: "/videos/clutch/pr-attempt.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete hammering redline pace on the track in a max-effort time trial",
    sourceIds: "32792",
  },
  {
    id: "last-station",
    label: "Burpee broad jumps",
    stakes: "Final station · everything left",
    sport: "Hyrox",
    video: "/videos/clutch/last-station.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete exploding through burpee broad jumps at a brutal functional race station",
    sourceIds: "52108",
  },
  {
    id: "finish-line",
    label: "Sled drive",
    stakes: "Heavy station · move it or lose it",
    sport: "Hyrox",
    video: "/videos/clutch/finish-line.mp4",
    poster: imageSets.sportHyrox,
    alt: "Athlete grinding through a heavy sled push under maximum effort",
    sourceIds: "7358",
  },
  {
    id: "surge-pace",
    label: "All-conditions push",
    stakes: "Redline effort · no excuses",
    sport: "Run club",
    video: "/videos/clutch/surge-pace.mp4",
    poster: imageSets.sportRunning,
    alt: "Athlete pushing through a punishing outdoor workout in the rain",
    sourceIds: "33130",
  },
];
