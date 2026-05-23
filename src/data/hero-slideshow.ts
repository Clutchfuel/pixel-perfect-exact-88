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
 * Homepage hero — peak clutch moments (~2–3s each).
 * Stock: Mixkit Free License (https://mixkit.co/license/#videoFree)
 */
export const heroClutchMoments: ClutchMoment[] = [
  {
    id: "basketball",
    label: "Nothing but net",
    sport: "Basketball",
    video: "/videos/clutch/basketball.mp4",
    poster: imageSets.sportBasketball,
    alt: "Basketball player drains a clutch shot",
    sourceIds: "44449",
  },
  {
    id: "football",
    label: "Touchdown catch",
    sport: "Football",
    video: "/videos/clutch/football.mp4",
    poster: imageSets.heroClutchFootball,
    alt: "Quarterback throws a touchdown pass that is caught in the end zone",
    sourceIds: "42555+42556",
  },
  {
    id: "soccer",
    label: "Bicycle kick goal",
    sport: "Soccer",
    video: "/videos/clutch/soccer.mp4",
    poster: imageSets.heroClutchSoccer,
    alt: "Soccer player scores with an overhead bicycle kick",
    sourceIds: "2916",
  },
  {
    id: "running",
    label: "Explosive stride",
    sport: "Track",
    video: "/videos/clutch/running.mp4",
    poster: imageSets.sportRunning,
    alt: "Sprinter driving through a slow-motion stride on the track",
    sourceIds: "609",
  },
  {
    id: "hybrid",
    label: "Max-effort jump",
    sport: "Hybrid",
    video: "/videos/clutch/hybrid.mp4",
    poster: imageSets.sportHyrox,
    alt: "CrossFit athlete hitting a max box jump",
    sourceIds: "40246",
  },
];
