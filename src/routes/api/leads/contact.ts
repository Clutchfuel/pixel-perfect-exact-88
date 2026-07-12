import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sendLeadEmail, verifyTurnstile } from "@/lib/leads";
import { persistSimpleLead } from "@/lib/leads-db";
import { isRateLimited, rateLimitKey } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/schemas/leads";
import { turnstileEnabled } from "@/lib/turnstile";

export const Route = createFileRoute("/api/leads/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
        }

        const { name, email, message, turnstileToken } = parsed.data;

        if (turnstileEnabled()) {
          const valid = await verifyTurnstile(turnstileToken);
          if (!valid) {
            return Response.json({ ok: false, error: "Verification failed" }, { status: 403 });
          }
        }

        if (await isRateLimited(rateLimitKey(request, email))) {
          return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
        }

        try {
          await persistSimpleLead({
            type: "contact",
            email,
            payloadJson: JSON.stringify({ name, message }),
            marketingConsent: true,
            source: "contact",
          });
          await sendLeadEmail("contact", { name, email, message });
          return Response.json({ ok: true });
        } catch {
          return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
        }
      },
    },
  },
});
