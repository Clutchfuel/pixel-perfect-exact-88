import type { QuickEstimateAnswers } from "@/data/calculator";
import type { QuizAnswers } from "@/data/clutch-score";

const SWEAT_RATE_BASE_LHR = { light: 0.9, moderate: 1.3, heavy: 1.7 } as const;

function durationMinutesFromQuick(duration: string): number {
  const map: Record<string, number> = { "30": 30, "45": 45, "60": 60, "90": 90 };
  return map[duration] ?? 60;
}

/** Calories per minute → 0–100 intensity proxy (supporting signal only). */
export function caloriesIntensityBoost(caloriesBurned: number, durationMinutes: number): number {
  if (caloriesBurned <= 0 || durationMinutes <= 0) return 0;
  const perMin = caloriesBurned / durationMinutes;
  if (perMin >= 12) return 8;
  if (perMin >= 9) return 5;
  if (perMin >= 6) return 2;
  return 0;
}

export function estimateSessionIntensity(opts: {
  sweatLevel: string;
  trainingLoad?: string;
  intensity?: string;
  caloriesBurned?: number;
  durationMinutes?: number;
}): number {
  const loadMap: Record<string, number> = { light: 45, moderate: 62, heavy: 78 };
  const intensityMap: Record<string, number> = { low: 40, moderate: 62, high: 82 };
  const sweatMap: Record<string, number> = { light: 50, moderate: 65, heavy: 80 };

  let base = 55;
  if (opts.trainingLoad) base = loadMap[opts.trainingLoad] ?? base;
  if (opts.intensity) base = intensityMap[opts.intensity] ?? base;
  base = base * 0.6 + (sweatMap[opts.sweatLevel] ?? 65) * 0.4;

  const calBoost =
    opts.caloriesBurned && opts.durationMinutes
      ? caloriesIntensityBoost(opts.caloriesBurned, opts.durationMinutes)
      : 0;

  return Math.max(0, Math.min(100, Math.round(base + calBoost)));
}

export function estimateSweatRateLhr(opts: {
  sweatLevel: string;
  environment?: string;
  intensity?: string;
  caloriesBurned?: number;
  durationMinutes?: number;
}): number {
  const base = SWEAT_RATE_BASE_LHR[opts.sweatLevel as keyof typeof SWEAT_RATE_BASE_LHR] ?? 1.3;
  let envMult = 1;
  if (opts.environment === "hot") envMult = 1.15;
  else if (opts.environment === "mixed") envMult = 1.05;

  let intensityMult = 1;
  if (opts.intensity === "high") intensityMult = 1.12;
  else if (opts.intensity === "low") intensityMult = 0.92;

  const calMult =
    opts.caloriesBurned && opts.durationMinutes
      ? 1 + caloriesIntensityBoost(opts.caloriesBurned, opts.durationMinutes) / 100
      : 1;

  return Math.round(base * envMult * intensityMult * calMult * 10) / 10;
}

export function estimateFluidLossOz(opts: {
  sweatRateLhr: number;
  durationMinutes: number;
}): number {
  const liters = opts.sweatRateLhr * (opts.durationMinutes / 60);
  const oz = liters * 33.814;
  return Math.round(oz / 5) * 5;
}

export function quickEstimateToQuizAnswers(quick: QuickEstimateAnswers): QuizAnswers {
  const sportEnv: Record<string, string> = {
    basketball: "mixed",
    running: "mixed",
    hyrox: "hot",
    gym: "indoor",
    cycling: "mixed",
    other: "mixed",
  };
  const intensityLoad: Record<string, string> = {
    low: "light",
    moderate: "moderate",
    high: "heavy",
  };
  const intensityGoal: Record<string, string> = {
    low: "recovery",
    moderate: "endurance",
    high: "performance",
  };

  return {
    bodyType: "average",
    trainingLoad: intensityLoad[quick.intensity] ?? "moderate",
    sweatLevel: quick.sweatLevel,
    environment: sportEnv[quick.sport] ?? "mixed",
    goal: intensityGoal[quick.intensity] ?? "endurance",
  };
}

export function quickEstimateDurationMinutes(quick: QuickEstimateAnswers): number {
  return durationMinutesFromQuick(quick.duration);
}

export function hydrationFeelingAdjustment(feeling: string): number {
  if (feeling === "depleted") return -4;
  if (feeling === "good") return 2;
  return 0;
}
