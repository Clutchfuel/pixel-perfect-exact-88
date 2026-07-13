export const ATHLETE_TYPES = [
  "Runner",
  "Basketball",
  "Strength",
  "CrossFit",
  "HYROX",
  "Cycling",
  "General Fitness",
  "Weekend Warrior",
] as const;

export type AthleteType = (typeof ATHLETE_TYPES)[number];
