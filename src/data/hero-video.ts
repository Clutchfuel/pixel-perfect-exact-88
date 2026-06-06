import { imageSets } from "@/assets/image-sets";
import { HERO_REEL_FILENAME } from "@/data/clutch-clips";
import { heroVideoUrl } from "@/lib/media";

/** Single looping homepage hero — built by `bun run videos:fetch` → hero-reel.mp4 */
export const HERO_REEL = {
  src: heroVideoUrl(HERO_REEL_FILENAME),
  poster: imageSets.sportHyrox,
  mobilePoster: imageSets.sportBasketball,
  alt: "Everyday athlete culture — HYROX, run club, basketball, and football clutch moments",
};
