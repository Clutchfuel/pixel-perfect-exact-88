import { getEnv } from "@/lib/env";
import { resolveTurnstileConfig } from "@/lib/turnstile-config";

export { resolveTurnstileConfig } from "@/lib/turnstile-config";

export function turnstileSiteKey(): string {
  return import.meta.env.VITE_TURNSTILE_SITE_KEY ?? getEnv("VITE_TURNSTILE_SITE_KEY") ?? "";
}

export function turnstileSecretKey(): string {
  return getEnv("TURNSTILE_SECRET_KEY") ?? "";
}

/** Site key present without a matching secret — treat as misconfiguration. */
export function turnstileMisconfigured(): boolean {
  return resolveTurnstileConfig(turnstileSiteKey(), turnstileSecretKey()).misconfigured;
}

/** Both keys configured — widget shown and server verification enforced. */
export function turnstileEnabled(): boolean {
  return resolveTurnstileConfig(turnstileSiteKey(), turnstileSecretKey()).enabled;
}
