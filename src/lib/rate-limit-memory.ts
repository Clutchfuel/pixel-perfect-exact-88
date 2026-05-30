const buckets = new Map<string, { count: number; resetAt: number }>();

export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 5;

export function isRateLimitedMemory(
  key: string,
  windowMs = RATE_LIMIT_WINDOW_MS,
  maxRequests = RATE_LIMIT_MAX_REQUESTS,
): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) return true;
  entry.count += 1;
  return false;
}

export function resetMemoryRateLimits(): void {
  buckets.clear();
}
