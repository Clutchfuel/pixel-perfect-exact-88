/**
 * Nitro/Cloudflare generates .output/server/wrangler.json and may omit D1/KV
 * from the repo wrangler.jsonc. Merge critical bindings so Workers Builds keep LEADS_DB.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "wrangler.jsonc");
const outputWrangler = join(root, ".output", "server", "wrangler.json");
const distWrangler = join(root, "dist", "server", "wrangler.json");
const deployConfigPath = join(root, ".wrangler", "deploy", "config.json");

const targets = [
  outputWrangler,
  join(root, ".output", "server", "wrangler.jsonc"),
  distWrangler,
  join(root, "dist", "server", "wrangler.jsonc"),
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
      const prev = byBinding.get(binding.binding);
      // Always prefer repo wrangler.jsonc as source of truth for binding IDs.
      if (JSON.stringify(prev) !== JSON.stringify(binding)) {
        byBinding.set(binding.binding, binding);
        changed = true;
      }
    }
    target[key] = [...byBinding.values()];
  }

  for (const key of ["account_id", "name"]) {
    if (source[key] && target[key] !== source[key]) {
      target[key] = source[key];
      changed = true;
    }
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
    } else {
      console.log(`[merge-wrangler] already complete → ${targetPath}`);
    }
    mergedAny = true;
  } catch (error) {
    console.warn(`[merge-wrangler] failed ${targetPath}:`, error);
  }
}

// Always rewrite Nitro's deploy redirect so wrangler uses the merged .output config.
const preferred = existsSync(outputWrangler)
  ? outputWrangler
  : existsSync(distWrangler)
    ? distWrangler
    : null;

if (preferred) {
  mkdirSync(dirname(deployConfigPath), { recursive: true });
  const redirect = {
    configPath: relative(dirname(deployConfigPath), preferred).replace(/\\/g, "/"),
    kv_namespaces: source.kv_namespaces ?? [],
    d1_databases: source.d1_databases ?? [],
    account_id: source.account_id,
    name: source.name,
  };
  writeFileSync(deployConfigPath, `${JSON.stringify(redirect, null, 2)}\n`);
  console.log(`[merge-wrangler] wrote deploy redirect → ${deployConfigPath}`);
  console.log(`[merge-wrangler] configPath=${redirect.configPath}`);
  mergedAny = true;
}

if (!mergedAny) {
  console.warn(
    "[merge-wrangler] no generated wrangler.json found yet (ok if this runs before vite build)",
  );
}
