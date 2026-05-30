import { copyFileSync, existsSync } from "node:fs";

const target = ".dev.vars";
const source = ".dev.vars.example";

if (existsSync(target)) {
  console.info(`[setup] ${target} already exists — skipping`);
} else {
  copyFileSync(source, target);
  console.info(`[setup] created ${target} from ${source}`);
}
