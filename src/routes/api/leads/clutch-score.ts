import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculateClutchScore } from "@/lib/clutch-score";
import { sendClutchScoreEmails, verifyTurnstile } from "@/lib/leads";
import { isRateLimited, rateLimitKey } from "@/lib/rate-limit";
import { clutchScoreSubmitSchema } from "@/lib/schemas/leads";
import { turnstileEnabled } from "@/lib/turnstile";

export const Route = createFileRoute("/api/leads/clutch-score")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = clutchScoreSubmitSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
        }

        const { email, answers, turnstileToken } = parsed.data;

        if (turnstileEnabled()) {
          const valid = await verifyTurnstile(turnstileToken);
          if (!valid) {
            return Response.json({ ok: false, error: "Verification failed" }, { status: 403 });
          }
        }

        if (isRateLimited(rateLimitKey(request, email))) {
          return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
        }

        const result = calculateClutchScore(answers);

        try {
          await sendClutchScoreEmails(email, result);
          return Response.json({ ok: true, result });
        } catch {
          return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
        }
      },
    },
  },
});
