import { getEnv } from "@/lib/env";

/** True for production builds outside CI (CI smoke tests skip email intentionally). */
export function isProductionRuntime(): boolean {
  if (getEnv("CI") === "true") return false;
  return import.meta.env.PROD;
}
