/**
 * Nitro/Cloudflare generates .output/server/wrangler.json and may omit D1/KV
 * from the repo wrangler.jsonc. Merge critical bindings so Workers Builds keep LEADS_DB.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "wrangler.jsonc");
const targets = [
  join(root, ".output", "server", "wrangler.json"),
  join(root, ".output", "server", "wrangler.jsonc"),
  join(root, "dist", "server", "wrangler.json"),
  join(root, "dist", "server", "wrangler.jsonc"),
  join(root, ".wrangler", "deploy", "config.json"),
];

function stripJsonc(raw) {
  return raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/,\s*([\]}])/g, "$1");
}

function loadJsonc(path) {
  return JSON.parse(stripJsonc(readFileSync(path, "utf8")));
}

function mergeBindings(target, source) {
  let changed = false;
  for (const key of ["kv_namespaces", "d1_databases", "r2_buckets", "services"]) {
    const from = source[key];
    if (!Array.isArray(from) || from.length === 0) continue;
    const existing = Array.isArray(target[key]) ? target[key] : [];
    const byBinding = new Map(
      existing
        .filter((b) => b && typeof b.binding === "string")
        .map((b) => [b.binding, b]),
    );
    for (const binding of from) {
      if (!binding?.binding) continue;
      if (!byBinding.has(binding.binding)) {
        byBinding.set(binding.binding, binding);
        changed = true;
      }
    }
    target[key] = [...byBinding.values()];
  }

  if (source.account_id && !target.account_id) {
    target.account_id = source.account_id;
    changed = true;
  }
  if (source.name && !target.name) {
    target.name = source.name;
    changed = true;
  }
  return changed;
}

if (!existsSync(sourcePath)) {
  console.warn("[merge-wrangler] skip: wrangler.jsonc missing");
  process.exit(0);
}

const source = loadJsonc(sourcePath);
let mergedAny = false;

for (const targetPath of targets) {
  if (!existsSync(targetPath)) continue;
  try {
    const target = JSON.parse(readFileSync(targetPath, "utf8"));
    if (mergeBindings(target, source)) {
      writeFileSync(targetPath, `${JSON.stringify(target, null, 2)}\n`);
      console.log(`[merge-wrangler] merged bindings → ${targetPath}`);
      mergedAny = true;
    } else {
      console.log(`[merge-wrangler] already complete → ${targetPath}`);
      mergedAny = true;
    }
  } catch (error) {
    console.warn(`[merge-wrangler] failed ${targetPath}:`, error);
  }
}

if (!mergedAny) {
  console.warn(
    "[merge-wrangler] no generated wrangler.json found yet (ok if this runs before vite build)",
  );
}
