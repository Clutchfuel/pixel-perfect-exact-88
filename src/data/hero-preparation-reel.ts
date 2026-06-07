import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";

/** One beat in the 30s “moment before” hero — ~3s each. */
export type PreparationScene = {
  id: string;
  image: ImageSet;
  alt: string;
};

/** Sports mix target: ~40% HYROX, 25% basketball, 20% combat, 15% running + community. */
export const HERO_PREPARATION_SCENES: PreparationScene[] = [
  {
    id: "run-ritual",
    image: imageSets.heroDesktop,
    alt: "Early morning runner tying shoes before sunrise — quiet ritual before the run",
  },
  {
    id: "hyrox-prep",
    image: imageSets.sportHyrox,
    alt: "HYROX athlete chalking hands and adjusting gear before training",
  },
  {
    id: "basketball-gym",
    image: imageSets.sportBasketball,
    alt: "Basketball player alone in the gym, lacing sneakers before practice",
  },
  {
    id: "hydration",
    image: imageSets.athleteSweat,
    alt: "Athlete filling a water bottle — hydration as part of preparation",
  },
  {
    id: "combat-wraps",
    image: imageSets.sportGym,
    alt: "Combat athlete wrapping hands before training, coach nearby",
  },
  {
    id: "hyrox-sled-train",
    image: imageSets.systemHero,
    alt: "HYROX sled push in training — power and discipline, not race day",
  },
  {
    id: "basketball-practice",
    image: imageSets.platformHero,
    alt: "Basketball player taking a final free throw after practice",
  },
  {
    id: "run-finish-subtle",
    image: imageSets.sportRunning,
    alt: "Everyday runner crossing a finish line — earned, not dramatic",
  },
  {
    id: "coach-connection",
    image: imageSets.aboutTeam,
    alt: "Coach talking with an athlete — community and guidance before performance",
  },
  {
    id: "group-run",
    image: imageSets.insightsHero,
    alt: "Mixed group run — diverse everyday athletes, sweaty, smiling, human",
  },
];

export const HERO_SCENE_DURATION_MS = 3000;
export const HERO_SCENE_CROSSFADE_MS = 900;

export const HERO_PREPARATION_ALT =
  "Everyday athletes preparing — ritual, training, hydration, coach connection, and community. Performance starts with preparation.";
