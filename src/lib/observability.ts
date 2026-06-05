import { getEnv } from "@/lib/env";

type ErrorContext = Record<string, unknown>;

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack, name: error.name };
  }
  return { message: String(error) };
}

export function reportError(error: unknown, context?: ErrorContext): void {
  const payload = {
    service: "clutchfuel-website",
    level: "error" as const,
    ts: new Date().toISOString(),
    ...serializeError(error),
    ...context,
  };

  console.error(JSON.stringify(payload));

  const webhook = getEnv("ERROR_WEBHOOK_URL");
  if (!webhook) return;

  void fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    /* webhook delivery is best-effort */
  });
}
