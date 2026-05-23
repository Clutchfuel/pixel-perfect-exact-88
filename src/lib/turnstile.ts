import { getEnv } from "@/lib/env";

export function turnstileSiteKey(): string {
  return import.meta.env.VITE_TURNSTILE_SITE_KEY ?? getEnv("VITE_TURNSTILE_SITE_KEY") ?? "";
}

export function turnstileEnabled(): boolean {
  return turnstileSiteKey().length > 0;
}
