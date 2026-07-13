import sharp from "sharp";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";

const svg = readFileSync("public/favicon.svg");

async function out(file, size) {
  await sharp(svg).resize(size, size).png().toFile(file);
  console.log("wrote", file, size);
}

await out("public/favicon-16x16.png", 16);
await out("public/favicon-32x32.png", 32);
await out("public/apple-touch-icon.png", 180);
await out("public/icon-192.png", 192);
await out("public/icon-512.png", 512);

const sizes = [16, 32, 48];
const images = [];
for (const s of sizes) {
  const buf = await sharp(svg).resize(s, s).png().toBuffer();
  images.push({ size: s, buf });
}

const headerSize = 6 + 16 * images.length;
let offset = headerSize;
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
const parts = [];
images.forEach((img, i) => {
  const o = 6 + i * 16;
  header.writeUInt8(img.size, o);
  header.writeUInt8(img.size, o + 1);
  header.writeUInt8(0, o + 2);
  header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4);
  header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(img.buf.length, o + 8);
  header.writeUInt32LE(offset, o + 12);
  offset += img.buf.length;
  parts.push(img.buf);
});
writeFileSync("public/favicon.ico", Buffer.concat([header, ...parts]));
console.log("wrote public/favicon.ico");
