import type { ImageSet } from "@/assets/image-sets";
import { imageSets } from "@/assets/image-sets";

/** One beat in the 30s “moment before” hero — ~3s each. */
export type PreparationScene = {
  id: string;
  image: ImageSet;
  alt: string;
};

/** Scene mix: ~40% HYROX, ~40% community, ~20% hybrid endurance prep — no clutch finishes. */
export const HERO_PREPARATION_SCENES: PreparationScene[] = [
  {
    id: "hyrox-prep",
    image: imageSets.sportHyrox,
    alt: "HYROX athlete chalking hands and adjusting gear before stations — quiet focus before the work",
  },
  {
    id: "group-run",
    image: imageSets.insightsHero,
    alt: "Mixed group run — diverse everyday athletes warming up together before the set",
  },
  {
    id: "hyrox-sled-train",
    image: imageSets.systemHero,
    alt: "HYROX sled push in the training box — power and discipline, not race day",
  },
  {
    id: "coach-huddle",
    image: imageSets.aboutTeam,
    alt: "Coach briefing athletes — Hyrox crew and run club guidance before training",
  },
  {
    id: "hyrox-box-prep",
    image: imageSets.sportGym,
    alt: "Functional athletes wrapping up before group Hyrox training — shared floor, shared standards",
  },
  {
    id: "run-club-dawn",
    image: imageSets.heroDesktop,
    alt: "Run club at dawn — athletes tying in together before the group sets off",
  },
  {
    id: "sweat-profile-prep",
    image: imageSets.sweatRateHero,
    alt: "Hybrid athlete reviewing sweat readiness before a long Hyrox-style session",
  },
  {
    id: "hydrate-together",
    image: imageSets.athleteSweat,
    alt: "Training partners filling bottles together — hydration as a shared pre-session ritual",
  },
  {
    id: "pace-groups",
    image: imageSets.sportRunning,
    alt: "Runners in pace groups stretching and warming up — preparation, not the finish line",
  },
  {
    id: "crew-check-in",
    image: imageSets.heroMobile,
    alt: "Athletes checking in before community training — laces tight, crew ready to prepare",
  },
];

export const HERO_SCENE_DURATION_MS = 3000;
export const HERO_SCENE_CROSSFADE_MS = 900;

export const HERO_PREPARATION_ALT =
  "Hyrox athletes, run clubs, and training crews preparing together — stations, sled work, coach huddles, and shared hydration. Performance starts with preparation.";
