import { getEnv } from "@/lib/env";
import { isProductionRuntime } from "@/lib/is-production";
import { reportError } from "@/lib/observability";
import { turnstileEnabled, turnstileMisconfigured, turnstileSiteKey } from "@/lib/turnstile";

export type ProductionIssue = {
  severity: "error" | "warn";
  code: string;
  message: string;
};

let audited = false;

export function collectProductionIssues(): ProductionIssue[] {
  const issues: ProductionIssue[] = [];

  if (turnstileMisconfigured()) {
    issues.push({
      severity: "error",
      code: "turnstile_misconfigured",
      message: "VITE_TURNSTILE_SITE_KEY is set without TURNSTILE_SECRET_KEY",
    });
  }

  if (isProductionRuntime()) {
    if (!getEnv("RESEND_API_KEY")) {
      issues.push({
        severity: "error",
        code: "resend_missing",
        message: "RESEND_API_KEY is required in production lead capture",
      });
    }

    if (!turnstileEnabled()) {
      issues.push({
        severity: "warn",
        code: "turnstile_disabled",
        message:
          "Turnstile is off in production — enable VITE_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY to reduce form spam",
      });
    }

    if (!getEnv("ERROR_WEBHOOK_URL")) {
      issues.push({
        severity: "warn",
        code: "error_webhook_missing",
        message:
          "ERROR_WEBHOOK_URL is unset — SSR/worker errors only go to console logs (Slack/PagerDuty webhook recommended)",
      });
    }
  }

  if (turnstileSiteKey().length > 0 && !getEnv("RESEND_API_KEY") && isProductionRuntime()) {
    issues.push({
      severity: "warn",
      code: "resend_with_turnstile",
      message: "Turnstile is on but RESEND_API_KEY is missing — verified leads cannot be emailed",
    });
  }

  return issues;
}

/** Log production misconfiguration once per Worker isolate (skipped in dev/CI). */
export function auditProductionConfigOnce(): void {
  if (audited || !isProductionRuntime()) return;
  audited = true;

  for (const issue of collectProductionIssues()) {
    if (issue.severity === "error") {
      reportError(new Error(issue.message), { source: "production-config", code: issue.code });
    } else {
      console.warn(`[production-config] ${issue.code}: ${issue.message}`);
    }
  }
}
