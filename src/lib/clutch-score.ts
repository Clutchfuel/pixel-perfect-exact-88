import { profiles } from "@/data/home";
import type { QuickEstimateAnswers } from "@/data/calculator";
import type { QuizAnswers } from "@/data/clutch-score";
import {
  caloriesIntensityBoost,
  estimateFluidLossOz,
  estimateSessionIntensity,
  estimateSweatRateLhr,
  hydrationFeelingAdjustment,
  quickEstimateDurationMinutes,
  quickEstimateToQuizAnswers,
} from "@/lib/calculator-metrics";
import { estimateSodiumLossMgFromProfile } from "@/lib/metrics-estimates";

export type SweatProfile =
  | "Balanced Sweater"
  | "High Output Athlete"
  | "Recovery Focused"
  | "Heavy Sweater";

export type ClutchScoreResult = {
  score: number;
  profile: SweatProfile;
  hydrationGuidance: string[];
  recommendedProductSlug: string;
  sessionIntensity: number;
  estimatedSweatRateLhr: number;
  estimatedFluidLossOz: number;
  estimatedSodiumLossMg: number;
  hydrationRecommendation: string;
  caloriesUsed: boolean;
};

export type CalculatorInput =
  | { mode: "full"; answers: QuizAnswers; caloriesBurned?: number }
  | { mode: "quick"; quick: QuickEstimateAnswers; caloriesBurned?: number };

const profileCopy = Object.fromEntries(profiles.cards.map((c) => [c.name, c.copy])) as Record<
  SweatProfile,
  string
>;

const sweatScores = { light: 55, moderate: 72, heavy: 88 } as const;
const loadScores = { light: 58, moderate: 74, heavy: 90 } as const;
const envScores = { indoor: 60, mixed: 72, hot: 86 } as const;
const goalScores = { performance: 82, endurance: 78, recovery: 65 } as const;
const bodyScores = { lighter: 68, average: 74, heavier: 80 } as const;

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function resolveProfile(answers: QuizAnswers): SweatProfile {
  if (answers.goal === "recovery") return "Recovery Focused";
  if (answers.sweatLevel === "heavy" || answers.environment === "hot") return "Heavy Sweater";
  if (answers.trainingLoad === "heavy" || answers.goal === "performance")
    return "High Output Athlete";
  return "Balanced Sweater";
}

const productByProfile: Record<SweatProfile, string> = {
  "Balanced Sweater": "clutch-iso",
  "High Output Athlete": "clutch-flow",
  "Recovery Focused": "clutch-recovery",
  "Heavy Sweater": "clutch-flow",
};

const guidanceByProfile: Record<SweatProfile, string[]> = {
  "Balanced Sweater": [
    "Aim for 16–20 oz of fluid in the 2 hours before training.",
    "Replace roughly 16 oz per hour of moderate-intensity work.",
    "Prioritize sodium (300–500 mg) when sessions exceed 60 minutes.",
  ],
  "High Output Athlete": [
    "Front-load 20–24 oz of fluid 90 minutes before hard sessions.",
    "Target 20–28 oz per hour during high-output training.",
    "Add electrolytes early — don't wait until you feel depleted.",
  ],
  "Recovery Focused": [
    "Rehydrate within 30 minutes post-session with 20 oz + electrolytes.",
    "Keep daily fluid intake steady — recovery starts between sessions.",
    "Prioritize Clutch Recovery within 45 minutes of finishing.",
  ],
  "Heavy Sweater": [
    "Pre-hydrate with 24 oz and 400–600 mg sodium before hot sessions.",
    "Plan for 24–32 oz per hour — weigh yourself to refine your number.",
    "Clutch Flow during training; Recovery within 30 minutes after.",
  ],
};

function scoreLookup<T extends Record<string, number>>(
  map: T,
  key: string,
  fallback: number,
): number {
  return key in map ? map[key as keyof T] : fallback;
}

function assertCompleteAnswers(answers: QuizAnswers): void {
  const required: (keyof QuizAnswers)[] = [
    "bodyType",
    "trainingLoad",
    "sweatLevel",
    "environment",
    "goal",
  ];
  for (const key of required) {
    if (!answers[key]) {
      throw new Error(`Missing quiz answer: ${key}`);
    }
  }
}

function coreHydrationScore(answers: QuizAnswers): number {
  return (
    scoreLookup(sweatScores, answers.sweatLevel, 72) * 0.4 +
    scoreLookup(loadScores, answers.trainingLoad, 74) * 0.25 +
    scoreLookup(envScores, answers.environment, 72) * 0.2 +
    scoreLookup(goalScores, answers.goal, 78) * 0.1 +
    scoreLookup(bodyScores, answers.bodyType, 74) * 0.05
  );
}

function buildHydrationRecommendation(profile: SweatProfile, fluidLossOz: number): string {
  const replace = Math.round(fluidLossOz * 0.75);
  return `Estimated ${fluidLossOz} oz fluid loss this session — aim to replace ~${replace} oz with electrolytes over the next few hours. Profile: ${profile}.`;
}

export function calculateClutchScore(input: CalculatorInput): ClutchScoreResult {
  const answers =
    input.mode === "quick" ? quickEstimateToQuizAnswers(input.quick) : input.answers;

  assertCompleteAnswers(answers);

  let raw = coreHydrationScore(answers);
  const durationMinutes =
    input.mode === "quick"
      ? quickEstimateDurationMinutes(input.quick)
      : input.mode === "full" && input.caloriesBurned
        ? 60
        : 60;

  if (input.caloriesBurned) {
    raw += caloriesIntensityBoost(input.caloriesBurned, durationMinutes);
  }

  if (input.mode === "quick") {
    raw += hydrationFeelingAdjustment(input.quick.hydrationFeeling);
  }

  const profile = resolveProfile(answers);
  const score = clamp(raw);

  if (!Number.isFinite(score)) {
    throw new Error("Invalid clutch score calculation");
  }

  const sessionIntensity = estimateSessionIntensity({
    sweatLevel: answers.sweatLevel,
    trainingLoad: answers.trainingLoad,
    intensity: input.mode === "quick" ? input.quick.intensity : undefined,
    caloriesBurned: input.caloriesBurned,
    durationMinutes,
  });

  const estimatedSweatRateLhr = estimateSweatRateLhr({
    sweatLevel: answers.sweatLevel,
    environment: answers.environment,
    intensity: input.mode === "quick" ? input.quick.intensity : undefined,
    caloriesBurned: input.caloriesBurned,
    durationMinutes,
  });

  const estimatedFluidLossOz = estimateFluidLossOz({
    sweatRateLhr: estimatedSweatRateLhr,
    durationMinutes,
  });

  const estimatedSodiumLossMg = estimateSodiumLossMgFromProfile(
    estimatedFluidLossOz,
    answers.sweatLevel,
  );

  return {
    score,
    profile,
    hydrationGuidance: guidanceByProfile[profile],
    recommendedProductSlug: productByProfile[profile],
    sessionIntensity,
    estimatedSweatRateLhr,
    estimatedFluidLossOz,
    estimatedSodiumLossMg,
    hydrationRecommendation: buildHydrationRecommendation(profile, estimatedFluidLossOz),
    caloriesUsed: Boolean(input.caloriesBurned && input.caloriesBurned > 0),
  };
}

/** @deprecated Use calculateClutchScore({ mode: 'full', answers }) */
export function calculateClutchScoreFromQuiz(
  answers: QuizAnswers,
  caloriesBurned?: number,
): ClutchScoreResult {
  return calculateClutchScore({ mode: "full", answers, caloriesBurned });
}

export function getProfileCopy(profile: SweatProfile): string {
  return profileCopy[profile];
}
