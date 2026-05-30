/**
 * TanStack Start preview expects dist/server/server.js but the Cloudflare
 * build emits dist/server/index.js (custom entry via src/server.ts).
 */
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const index = join("dist", "server", "index.js");
const server = join("dist", "server", "server.js");

if (!existsSync(index)) {
  console.warn("[postbuild] skip: dist/server/index.js not found");
  process.exit(0);
}

copyFileSync(index, server);
console.info("[postbuild] dist/server/index.js → dist/server/server.js");
