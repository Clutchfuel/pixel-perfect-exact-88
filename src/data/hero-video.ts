import { imageSets } from "@/assets/image-sets";
import { HERO_PREPARATION_ALT, HERO_PREPARATION_SCENES } from "@/data/hero-preparation-reel";

/** Homepage hero — cinematic “moment before” image reel (no clutch-finish footage). */
export const HERO_REEL = {
  /** Legacy mp4 path unused; hero is CSS/motion image reel. */
  src: null as string | null,
  poster: imageSets.sportHyrox,
  mobilePoster: imageSets.heroMobile,
  alt: HERO_PREPARATION_ALT,
  scenes: HERO_PREPARATION_SCENES,
};
