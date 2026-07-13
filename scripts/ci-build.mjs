/**
 * Production build for Cloudflare Workers Builds.
 * Ensures VITE_SITE_URL is always set (dashboard vars are easy to miss).
 */
import { spawnSync } from "node:child_process";

if (!process.env.VITE_SITE_URL) {
  process.env.VITE_SITE_URL = "https://clutchfuel.com";
  console.log("[ci-build] VITE_SITE_URL defaulted to https://clutchfuel.com");
}

if (!process.env.CI) {
  process.env.CI = "true";
  console.log("[ci-build] CI=true (nitro cloudflare-module outside Lovable sandbox)");
}

const result = spawnSync("npx", ["vite", "build"], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

process.exit(result.status ?? 1);
