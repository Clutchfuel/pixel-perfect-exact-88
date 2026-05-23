import aboutTeamAvif from "./about-team.avif";
import aboutTeamWebp from "./about-team.webp";
import aboutTeamJpg from "./about-team.jpg";
import insightsHeroAvif from "./insights-hero.avif";
import insightsHeroWebp from "./insights-hero.webp";
import insightsHeroJpg from "./insights-hero.jpg";
import platformHeroAvif from "./platform-hero.avif";
import platformHeroWebp from "./platform-hero.webp";
import platformHeroJpg from "./platform-hero.jpg";
import sweatRateHeroAvif from "./sweat-rate-hero.avif";
import sweatRateHeroWebp from "./sweat-rate-hero.webp";
import sweatRateHeroJpg from "./sweat-rate-hero.jpg";
import systemHeroAvif from "./system-hero.avif";
import systemHeroWebp from "./system-hero.webp";
import systemHeroJpg from "./system-hero.jpg";
import athleteSweatAvif from "./athlete-sweat.avif";
import athleteSweatWebp from "./athlete-sweat.webp";
import athleteSweatJpg from "./athlete-sweat.jpg";
import sportBasketballAvif from "./sport-basketball.avif";
import sportBasketballWebp from "./sport-basketball.webp";
import sportBasketballJpg from "./sport-basketball.jpg";
import sportRunningAvif from "./sport-running.avif";
import sportRunningWebp from "./sport-running.webp";
import sportRunningJpg from "./sport-running.jpg";
import sportHyroxAvif from "./sport-hyrox.avif";
import sportHyroxWebp from "./sport-hyrox.webp";
import sportHyroxJpg from "./sport-hyrox.jpg";
import sportGymAvif from "./sport-gym.avif";
import sportGymWebp from "./sport-gym.webp";
import sportGymJpg from "./sport-gym.jpg";
import heroDesktopAvif from "./hero-desktop.avif";
import heroDesktopWebp from "./hero-desktop.webp";
import heroDesktopJpg from "./hero-desktop.jpg";
import heroMobileAvif from "./hero-mobile.avif";
import heroMobileWebp from "./hero-mobile.webp";
import heroMobileJpg from "./hero-mobile.jpg";
import heroClutchFootballAvif from "./hero-clutch-football.avif";
import heroClutchFootballWebp from "./hero-clutch-football.webp";
import heroClutchFootballJpg from "./hero-clutch-football.jpg";
import heroClutchSoccerAvif from "./hero-clutch-soccer.avif";
import heroClutchSoccerWebp from "./hero-clutch-soccer.webp";
import heroClutchSoccerJpg from "./hero-clutch-soccer.jpg";

export type ImageSet = {
  avif: string;
  webp: string;
  fallback: string;
};

export const imageSets = {
  aboutTeam: { avif: aboutTeamAvif, webp: aboutTeamWebp, fallback: aboutTeamJpg },
  insightsHero: { avif: insightsHeroAvif, webp: insightsHeroWebp, fallback: insightsHeroJpg },
  platformHero: { avif: platformHeroAvif, webp: platformHeroWebp, fallback: platformHeroJpg },
  sweatRateHero: { avif: sweatRateHeroAvif, webp: sweatRateHeroWebp, fallback: sweatRateHeroJpg },
  systemHero: { avif: systemHeroAvif, webp: systemHeroWebp, fallback: systemHeroJpg },
  athleteSweat: { avif: athleteSweatAvif, webp: athleteSweatWebp, fallback: athleteSweatJpg },
  sportBasketball: {
    avif: sportBasketballAvif,
    webp: sportBasketballWebp,
    fallback: sportBasketballJpg,
  },
  sportRunning: { avif: sportRunningAvif, webp: sportRunningWebp, fallback: sportRunningJpg },
  sportHyrox: { avif: sportHyroxAvif, webp: sportHyroxWebp, fallback: sportHyroxJpg },
  sportGym: { avif: sportGymAvif, webp: sportGymWebp, fallback: sportGymJpg },
  heroDesktop: { avif: heroDesktopAvif, webp: heroDesktopWebp, fallback: heroDesktopJpg },
  heroMobile: { avif: heroMobileAvif, webp: heroMobileWebp, fallback: heroMobileJpg },
  heroClutchFootball: {
    avif: heroClutchFootballAvif,
    webp: heroClutchFootballWebp,
    fallback: heroClutchFootballJpg,
  },
  heroClutchSoccer: {
    avif: heroClutchSoccerAvif,
    webp: heroClutchSoccerWebp,
    fallback: heroClutchSoccerJpg,
  },
} as const satisfies Record<string, ImageSet>;

export const sportImageBySlug: Record<string, ImageSet> = {
  basketball: imageSets.sportBasketball,
  running: imageSets.sportRunning,
  hyrox: imageSets.sportHyrox,
  gym: imageSets.sportGym,
};
