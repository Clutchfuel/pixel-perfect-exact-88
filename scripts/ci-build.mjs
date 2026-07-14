/**
 * Production build for Cloudflare Workers Builds.
 * Ensures VITE_SITE_URL is always set (dashboard vars are easy to miss).
 * After vite build, merge D1/KV from repo wrangler.jsonc into Nitro's generated config
 * (Nitro currently copies KV but drops d1_databases).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (!process.env.VITE_SITE_URL) {
  process.env.VITE_SITE_URL = "https://clutchfuel.com";
  console.log("[ci-build] VITE_SITE_URL defaulted to https://clutchfuel.com");
}

if (!process.env.CI) {
  process.env.CI = "true";
  console.log("[ci-build] CI=true (nitro cloudflare-module outside Lovable sandbox)");
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    env: process.env,
    shell: true,
    cwd: root,
  });
  return result.status ?? 1;
}

const buildStatus = run("npx", ["vite", "build"]);
if (buildStatus !== 0) process.exit(buildStatus);

// Use the same runtime that launched this script (node on CF Builds, bun locally).
const mergeStatus = run(process.execPath, [join(root, "scripts", "merge-wrangler-bindings.mjs")]);
if (mergeStatus !== 0) process.exit(mergeStatus);

const assertStatus = run(process.execPath, [
  join(root, "scripts", "assert-leads-db-binding.mjs"),
]);
process.exit(assertStatus);
