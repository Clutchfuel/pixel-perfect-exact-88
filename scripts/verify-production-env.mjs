#!/usr/bin/env node
/**
 * Pre-deploy checklist for Lovable or Cloudflare Workers.
 *
 * Usage:
 *   node scripts/verify-production-env.mjs           # read .dev.vars
 *   node scripts/verify-production-env.mjs --strict  # exit 1 on warnings too
 */
import { readFileSync, existsSync } from "node:fs";

const STRICT = process.argv.includes("--strict");
const DEV_VARS = ".dev.vars";
const PLACEHOLDER_KV = "00000000000000000000000000000000";

function parseDevVars(path) {
  const vars = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (value.length > 0) vars[key] = value;
  }
  return vars;
}

function issue(severity, message) {
  return { severity, message };
}

const issues = [];

if (!existsSync(DEV_VARS)) {
  console.error(`Missing ${DEV_VARS}. Run: bun run setup`);
  process.exit(1);
}

const vars = parseDevVars(DEV_VARS);
const siteKey = vars.VITE_TURNSTILE_SITE_KEY ?? "";
const secretKey = vars.TURNSTILE_SECRET_KEY ?? "";

if (!vars.VITE_SITE_URL) {
  issues.push(issue("error", "VITE_SITE_URL is required for canonical URLs and emails"));
}

if (!vars.RESEND_API_KEY) {
  issues.push(issue("error", "RESEND_API_KEY is required for production lead email"));
} else {
  if (!vars.RESEND_FROM_EMAIL) {
    issues.push(issue("warn", "RESEND_FROM_EMAIL should be a verified Resend sender"));
  }
  if (!vars.LEADS_TO_EMAIL) {
    issues.push(issue("warn", "LEADS_TO_EMAIL should point to your team inbox"));
  }
}

if (siteKey && !secretKey) {
  issues.push(issue("error", "VITE_TURNSTILE_SITE_KEY without TURNSTILE_SECRET_KEY"));
} else if (!siteKey || !secretKey) {
  issues.push(
    issue(
      "warn",
      "Turnstile keys not fully set — forms rely on in-memory rate limits only (weak on Lovable)",
    ),
  );
}

if (!vars.ERROR_WEBHOOK_URL) {
  issues.push(
    issue(
      "warn",
      "ERROR_WEBHOOK_URL unset — add a Slack/Discord/PagerDuty webhook for worker/SSR errors",
    ),
  );
}

if (existsSync("wrangler.jsonc")) {
  const wrangler = readFileSync("wrangler.jsonc", "utf8");
  if (wrangler.includes(PLACEHOLDER_KV)) {
    issues.push(
      issue(
        "warn",
        "wrangler.jsonc still has placeholder RATE_LIMIT_KV IDs — run bun run configure:production before Workers deploy",
      ),
    );
  }
}

if (vars.VITE_HERO_VIDEO_CDN) {
  console.log(`Hero video CDN: ${vars.VITE_HERO_VIDEO_CDN}`);
} else {
  issues.push(
    issue(
      "warn",
      "VITE_HERO_VIDEO_CDN unset — host hero MP4s locally (bun run videos:fetch) or on R2/CDN",
    ),
  );
}

console.log("\nProduction environment checklist\n");

let exitCode = 0;
for (const { severity, message } of issues) {
  const icon = severity === "error" ? "✗" : "○";
  console.log(`  ${icon} [${severity}] ${message}`);
  if (severity === "error") exitCode = 1;
  if (severity === "warn" && STRICT) exitCode = 1;
}

if (exitCode === 0) {
  console.log("\nAll required checks passed.");
  console.log(
    "\nLovable: Project → Settings → Environment — mirror keys from .dev.vars (server keys without VITE_ prefix).",
  );
  console.log("Cloudflare: bun run configure:production (KV + secrets + deploy).\n");
} else {
  console.log("\nFix errors above, then re-run with --strict before go-live.\n");
}

process.exit(exitCode);
