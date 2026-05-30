import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const script = process.argv[2];
if (!script) {
  console.error("Usage: node scripts/run-ts.mjs <path-to-ts-file>");
  process.exit(1);
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: false });
  return result.status ?? 1;
}

if (spawnSync("bun", ["--version"], { stdio: "ignore" }).status === 0) {
  process.exit(run("bun", [script]));
}

const nodeArgs = ["--experimental-strip-types", script];
process.exit(run(process.execPath, nodeArgs));
