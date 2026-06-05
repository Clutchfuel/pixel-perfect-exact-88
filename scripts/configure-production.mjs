#!/usr/bin/env node
/**
 * Production deploy helper for Cloudflare Workers.
 * Prerequisites: `bunx wrangler login` and a populated `.dev.vars`.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const DEV_VARS = ".dev.vars";
const SECRET_KEYS = [
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "LEADS_TO_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "ERROR_WEBHOOK_URL",
];

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: false, ...opts });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

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

function wrangler(args) {
  run("bunx", ["wrangler", ...args]);
}

function patchWranglerKvIds(prodId, previewId) {
  const path = "wrangler.jsonc";
  let text = readFileSync(path, "utf8");
  const before = text;
  text = text.replace(/"id": "[a-f0-9]{32}"/, `"id": "${prodId}"`);
  text = text.replace(/"preview_id": "[a-f0-9]{32}"/, `"preview_id": "${previewId}"`);
  if (text !== before) {
    writeFileSync(path, text);
    console.log("Updated wrangler.jsonc with RATE_LIMIT_KV namespace IDs.");
  }
}

console.log("Checking Wrangler auth…");
const whoami = spawnSync("bunx", ["wrangler", "whoami"], { encoding: "utf8" });
if (whoami.status !== 0 || /not authenticated/i.test(whoami.stdout + whoami.stderr)) {
  console.error("Run `bunx wrangler login` first, then re-run this script.");
  process.exit(1);
}

console.log("\nCreating KV namespace (if needed)…");
const kvList = spawnSync("bunx", ["wrangler", "kv", "namespace", "list"], { encoding: "utf8" });
let prodId;
let previewId;
if (kvList.status === 0) {
  const ids = [...kvList.stdout.matchAll(/"id"\s*:\s*"([a-f0-9]{32})"/g)].map((m) => m[1]);
  if (ids.length >= 2) {
    prodId = ids[0];
    previewId = ids[1];
    console.log(`Found existing KV namespaces: prod=${prodId}, preview=${previewId}`);
  }
}

if (!prodId) {
  console.log("Creating RATE_LIMIT_KV production namespace…");
  const prod = spawnSync("bunx", ["wrangler", "kv", "namespace", "create", "RATE_LIMIT_KV"], {
    encoding: "utf8",
  });
  prodId = prod.stdout.match(/id = "([a-f0-9]{32})"/)?.[1];
  console.log("Creating RATE_LIMIT_KV preview namespace…");
  const preview = spawnSync(
    "bunx",
    ["wrangler", "kv", "namespace", "create", "RATE_LIMIT_KV", "--preview"],
    { encoding: "utf8" },
  );
  previewId = preview.stdout.match(/id = "([a-f0-9]{32})"/)?.[1];
}

if (prodId && previewId) {
  patchWranglerKvIds(prodId, previewId);
} else {
  console.warn("\nCould not resolve KV namespace IDs — update wrangler.jsonc manually.");
}

if (!existsSync(DEV_VARS)) {
  console.error(`\n${DEV_VARS} not found. Run \`bun run setup\` and fill in production values.`);
  process.exit(1);
}

const vars = parseDevVars(DEV_VARS);
const missing = SECRET_KEYS.filter((k) => k !== "ERROR_WEBHOOK_URL" && !vars[k]);
if (missing.length > 0) {
  console.warn(`\nWarning: missing in ${DEV_VARS}: ${missing.join(", ")}`);
  console.warn("Set RESEND_API_KEY and paired Turnstile keys before production deploy.");
}

console.log("\nUploading Worker secrets from .dev.vars…");
for (const key of SECRET_KEYS) {
  const value = vars[key];
  if (!value) continue;
  console.log(`  → ${key}`);
  const result = spawnSync("bunx", ["wrangler", "secret", "put", key], {
    input: value,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(`Failed to set secret ${key}`);
    process.exit(1);
  }
}

console.log("\nDeploying Worker…");
wrangler(["deploy"]);

console.log("\nRunning production env verify…");
run("node", ["scripts/verify-production-env.mjs"]);

console.log("\nProduction configure complete.");
