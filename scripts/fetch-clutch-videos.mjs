#!/usr/bin/env node
/** Wrapper — runs TypeScript fetch script (imports src/data/clutch-clips.ts). */
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const extraArgs = process.argv.slice(2);
const result = spawnSync(
  "node",
  ["scripts/run-ts.mjs", "scripts/fetch-clutch-videos.ts", ...extraArgs],
  {
    cwd: ROOT,
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
