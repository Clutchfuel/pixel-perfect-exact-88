export function leadErrorMessage(
  status: number,
  fallback = "Something went wrong. Try again.",
): string {
  if (status === 429) return "Too many requests — wait a moment and try again.";
  if (status >= 500) return "Server error — try again in a few minutes.";
  return fallback;
}
