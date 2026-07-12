import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { persistFeedback } from "@/lib/leads-db";
import { isRateLimited, rateLimitKey } from "@/lib/rate-limit";
import { feedbackSchema } from "@/lib/schemas/leads";

export const Route = createFileRoute("/api/leads/feedback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = feedbackSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
        }

        const data = parsed.data;
        const rateKey = rateLimitKey(request, data.accuracy);

        if (await isRateLimited(rateKey)) {
          return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
        }

        try {
          await persistFeedback({
            accuracy: data.accuracy,
            resonated: data.resonated,
            missing: data.missing,
            recommend: data.recommend,
            score: data.score,
            opportunity: data.opportunity,
            firstMove: data.firstMove,
            answersJson: data.answers ? JSON.stringify(data.answers) : undefined,
          });
          return Response.json({ ok: true });
        } catch {
          return Response.json({ ok: false, error: "Failed to save" }, { status: 500 });
        }
      },
    },
  },
});
