import type { DiagnosticResult } from "@/lib/diagnostic-result";
import { teamLeadText, userClutchScoreHtml, userClutchScoreText } from "@/lib/email-templates";
import { getEnv } from "@/lib/env";
import { isProductionRuntime } from "@/lib/is-production";
import { reportError } from "@/lib/observability";
import { turnstileEnabled, turnstileMisconfigured, turnstileSecretKey } from "@/lib/turnstile";

type LeadType = "contact" | "newsletter" | "clutch-score";

async function sendResend(opts: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
}) {
  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey) {
    if (isProductionRuntime()) {
      throw new Error("RESEND_API_KEY not configured");
    }
    console.info("[leads] RESEND_API_KEY not set — skipping email", opts);
    return { ok: true as const, skipped: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      ...(opts.html ? { html: opts.html } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error: ${res.status} ${body}`);
  }

  return { ok: true as const, skipped: false };
}

function mailFrom() {
  return getEnv("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
}

function teamInbox() {
  return getEnv("LEADS_TO_EMAIL") ?? "hello@clutchfuel.com";
}

export async function sendLeadEmail(type: LeadType, payload: Record<string, unknown>) {
  const subject =
    type === "contact"
      ? "ClutchFuel contact form"
      : type === "newsletter"
        ? "ClutchFuel newsletter signup"
        : "New Clutch Score result";

  return sendResend({
    from: mailFrom(),
    to: [teamInbox()],
    subject,
    text: teamLeadText(type, payload),
  });
}

export async function sendClutchScoreEmails(email: string, result: DiagnosticResult) {
  const teamPayload = {
    email,
    score: result.score,
    opportunity: result.opportunityLabel,
    goal: result.goalLabel,
    firstClutchMove: result.firstClutchMove.title,
    recommendedProduct: result.recommendedProductSlug,
  };

  await sendResend({
    from: mailFrom(),
    to: [teamInbox()],
    subject: "New Clutch Score result",
    text: teamLeadText("clutch-score", teamPayload),
  });

  await sendResend({
    from: mailFrom(),
    to: [email],
    subject: `Your Clutch Score: ${result.score} — ${result.opportunityLabel}`,
    text: userClutchScoreText(email, result),
    html: userClutchScoreHtml(email, result),
  });

  return { ok: true as const };
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  if (turnstileMisconfigured()) {
    reportError(new Error("Turnstile misconfigured: site key set without secret"));
    return false;
  }

  if (!turnstileEnabled()) return true;

  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: turnstileSecretKey(), response: token }),
  });

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
