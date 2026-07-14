/**
 * Fail the Cloudflare deploy if LEADS_DB is missing from the config wrangler will use.
 * Nitro generates .output/server/wrangler.json and historically dropped d1_databases.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const candidates = [
  join(root, ".output", "server", "wrangler.json"),
  join(root, "dist", "server", "wrangler.json"),
];

function hasLeadsDb(path) {
  const raw = readFileSync(path, "utf8");
  const json = JSON.parse(raw);
  return Array.isArray(json.d1_databases)
    ? json.d1_databases.some((d) => d && d.binding === "LEADS_DB" && d.database_id)
    : false;
}

const found = candidates.filter((p) => existsSync(p));
if (found.length === 0) {
  console.error("[assert-leads-db] No generated wrangler.json found under .output/server or dist/server");
  process.exit(1);
}

const missing = found.filter((p) => !hasLeadsDb(p));
if (missing.length > 0) {
  console.error("[assert-leads-db] LEADS_DB missing from:");
  for (const p of missing) console.error(`  - ${p}`);
  console.error("Run scripts/merge-wrangler-bindings.mjs after vite build.");
  process.exit(1);
}

for (const p of found) {
  console.log(`[assert-leads-db] OK ${p}`);
}
