import { getRateLimitKv } from "@/lib/env";
import {
  isRateLimitedMemory,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
  resetMemoryRateLimits,
} from "@/lib/rate-limit-memory";

type RateLimitEntry = { count: number; resetAt: number };

async function isRateLimitedKv(kv: KVNamespace, key: string): Promise<boolean> {
  const kvKey = `rl:${key}`;
  const now = Date.now();
  const existing = await kv.get<RateLimitEntry>(kvKey, { type: "json" });

  if (!existing || now > existing.resetAt) {
    const entry: RateLimitEntry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    await kv.put(kvKey, JSON.stringify(entry), {
      expirationTtl: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) + 60,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  const next: RateLimitEntry = { count: existing.count + 1, resetAt: existing.resetAt };
  await kv.put(kvKey, JSON.stringify(next), {
    expirationTtl: Math.ceil((existing.resetAt - now) / 1000) + 60,
  });
  return false;
}

export async function isRateLimited(key: string): Promise<boolean> {
  const kv = getRateLimitKv();
  if (kv) return isRateLimitedKv(kv, key);
  return isRateLimitedMemory(key);
}

export function rateLimitKey(request: Request, email: string): string {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  return `${ip}:${email.toLowerCase()}`;
}

export { resetMemoryRateLimits };
