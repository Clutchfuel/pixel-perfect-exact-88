import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/assets");

const files = (await readdir(assetsDir)).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const input = path.join(assetsDir, file);
  const base = file.replace(/\.jpg$/, "");
  const webpOut = path.join(assetsDir, `${base}.webp`);
  const avifOut = path.join(assetsDir, `${base}.avif`);

  await sharp(input).webp({ quality: 82 }).toFile(webpOut);
  await sharp(input).avif({ quality: 65 }).toFile(avifOut);

  console.log(`optimized ${file}`);
}

console.log(`done — ${files.length} images`);
