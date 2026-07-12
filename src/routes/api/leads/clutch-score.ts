import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { buildDiagnosticResult } from "@/lib/diagnostic-result";
import { sendClutchScoreEmails, verifyTurnstile } from "@/lib/leads";
import { persistClutchScoreLead } from "@/lib/leads-db";
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

        if (await isRateLimited(rateLimitKey(request, email))) {
          return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
        }

        const result = buildDiagnosticResult(answers);

        try {
          await persistClutchScoreLead({
            email,
            answersJson: JSON.stringify(answers),
            score: result.score,
            opportunity: result.opportunity,
            goal: result.goal,
            firstClutchMove: result.firstClutchMove.title,
            marketingConsent: true,
            source: "clutch-score",
            userAgent: request.headers.get("user-agent") ?? undefined,
          });
          await sendClutchScoreEmails(email, result);
          return Response.json({ ok: true, result });
        } catch {
          return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
        }
      },
    },
  },
});
