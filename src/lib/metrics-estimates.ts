import type { SweatRateZone } from "@/data/hydration-lab";

/** Typical sweat sodium ranges (mg per liter of sweat) for educational estimates. */
export function estimateSodiumLossMg(fluidLossLiters: number, zone: SweatRateZone): number {
  const mgPerLiter = zone === "high" ? 950 : zone === "low" ? 550 : 750;
  return Math.round(Math.max(0, fluidLossLiters) * mgPerLiter);
}

export function estimateSodiumLossMgFromProfile(fluidLossOz: number, sweatLevel: string): number {
  const liters = (fluidLossOz / 33.814) * 0.85;
  const zone: SweatRateZone =
    sweatLevel === "heavy" ? "high" : sweatLevel === "light" ? "low" : "moderate";
  return estimateSodiumLossMg(liters, zone);
}
