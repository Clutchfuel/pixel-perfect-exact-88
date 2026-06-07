import {
  bathroomOptions,
  conditionOptions,
  durationOptions,
  fluidOptions,
  intensityOptions,
  trainingTypeOptions,
  zoneTagMap,
  type SweatRateZone,
} from "@/data/hydration-lab";
import { estimateSodiumLossMg } from "@/lib/metrics-estimates";

export type HydrationLabMode = "precision" | "quick";

export type PrecisionInput = {
  weightUnit: "lbs" | "kg";
  preWeight: number;
  postWeight: number;
  durationKey: string;
  fluidKey: string;
  bathroomKey: string;
  trainingType: string;
};

export type QuickInput = {
  calories: number;
  durationKey: string;
  conditionKey: string;
  intensityKey: string;
  fluidKey: string;
  trainingType: string;
};

export type HydrationLabResult = {
  mode: HydrationLabMode;
  sweatRateLph: number;
  sweatRateOph: number;
  totalSweatLossL: number;
  sodiumLossMg: number;
  bodyMassLossKg: number | null;
  zone: SweatRateZone;
  shopifyTags: string[];
  modeLabel: string;
};

function lookupHours(key: string): number {
  return durationOptions.find((d) => d.value === key)?.hours ?? 1;
}

function lookupFluidLiters(key: string): number {
  return fluidOptions.find((f) => f.value === key)?.liters ?? 0;
}

function lookupBathroomLiters(key: string): number {
  return bathroomOptions.find((b) => b.value === key)?.liters ?? 0;
}

function weightDeltaToLiters(delta: number, unit: "lbs" | "kg"): number {
  if (unit === "kg") return Math.max(0, delta);
  return Math.max(0, delta * 0.453592);
}

export function classifySweatRate(lph: number): SweatRateZone {
  if (lph < 0.8) return "low";
  if (lph <= 1.5) return "moderate";
  return "high";
}

function trainingTag(type: string): string {
  return trainingTypeOptions.find((t) => t.value === type)?.tag ?? "train_other";
}

function buildTags(opts: {
  mode: HydrationLabMode;
  zone: SweatRateZone;
  trainingType: string;
  conditionKey?: string;
}): string[] {
  const tags = [
    zoneTagMap[opts.zone],
    trainingTag(opts.trainingType),
    opts.mode === "precision" ? "calc_mode_precision" : "calc_mode_quick",
  ];
  if (opts.conditionKey) {
    const envTag = conditionOptions.find((c) => c.value === opts.conditionKey)?.tag;
    if (envTag) tags.push(envTag);
  }
  return tags;
}

export function calculatePrecision(input: PrecisionInput): HydrationLabResult {
  const durationHr = lookupHours(input.durationKey);
  const fluidIntakeL = lookupFluidLiters(input.fluidKey);
  const urineLossL = lookupBathroomLiters(input.bathroomKey);
  const weightLossL = weightDeltaToLiters(input.preWeight - input.postWeight, input.weightUnit);
  const totalSweatLossL = weightLossL + fluidIntakeL - urineLossL;
  const sweatRateLph = durationHr > 0 ? totalSweatLossL / durationHr : 0;
  const roundedLph = Math.round(sweatRateLph * 100) / 100;
  const zone = classifySweatRate(roundedLph);

  return {
    mode: "precision",
    sweatRateLph: roundedLph,
    sweatRateOph: Math.round(roundedLph * 33.814 * 10) / 10,
    totalSweatLossL: Math.round(totalSweatLossL * 100) / 100,
    sodiumLossMg: estimateSodiumLossMg(totalSweatLossL, zone),
    bodyMassLossKg: Math.round(weightLossL * 100) / 100,
    zone,
    shopifyTags: buildTags({
      mode: "precision",
      zone,
      trainingType: input.trainingType,
    }),
    modeLabel: "Built from your training data",
  };
}

export function calculateQuick(input: QuickInput): HydrationLabResult {
  const durationHr = lookupHours(input.durationKey);
  const fluidIntakeL = lookupFluidLiters(input.fluidKey);
  const conditionMod = conditionOptions.find((c) => c.value === input.conditionKey)?.modifier ?? 1;
  const intensityMod = intensityOptions.find((i) => i.value === input.intensityKey)?.modifier ?? 1;

  const baseSweatLoss = (input.calories * 0.75) / 580;
  const adjustedSweatLoss = baseSweatLoss * conditionMod * intensityMod;
  const totalSweatLossL = adjustedSweatLoss + fluidIntakeL;
  const sweatRateLph = durationHr > 0 ? totalSweatLossL / durationHr : 0;
  const roundedLph = Math.round(sweatRateLph * 100) / 100;
  const zone = classifySweatRate(roundedLph);

  return {
    mode: "quick",
    sweatRateLph: roundedLph,
    sweatRateOph: Math.round(roundedLph * 33.814 * 10) / 10,
    totalSweatLossL: Math.round(totalSweatLossL * 100) / 100,
    sodiumLossMg: estimateSodiumLossMg(adjustedSweatLoss, zone),
    bodyMassLossKg: null,
    zone,
    shopifyTags: buildTags({
      mode: "quick",
      zone,
      trainingType: input.trainingType,
      conditionKey: input.conditionKey,
    }),
    modeLabel: "Estimated from your wearable data",
  };
}
