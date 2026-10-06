#!/usr/bin/env node
/**
 * Builds every crest asset the site uses from the club's master logo, public/logo.png
 * (the full crest on a transparent background). After replacing that file with a
 * sharper export, run:
 *
 *   npm run logo
 *
 * Outputs:
 *   public/logo/crest.webp      landing screen, full size, lossless
 *   public/logo/crest-160.webp  nav and footer
 *   app/apple-icon.png          full crest on black, for phone home screens
 *   app/opengraph-image.png     full crest on black, for link previews
 *   app/favicon.ico, app/icon.png
 *                               just the red centre disc with the unicorn: at tab size
 *                               the ring lettering turns to noise, the unicorn doesn't
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "public", "logo.png");
const LOGO_DIR = path.join(ROOT, "public", "logo");
const APP = path.join(ROOT, "app");

const source = await readFile(SOURCE).catch(() => fail(`Missing ${path.relative(ROOT, SOURCE)}.`));
const { width, height, hasAlpha } = await sharp(source).metadata();
if (width !== height) fail(`logo.png should be square; it is ${width}×${height}.`);
if (!hasAlpha) fail("logo.png should have a transparent background.");

const emblem = await centreDisc(source);
const resize = (input, size) => sharp(input).resize(size, size, { kernel: "lanczos3" });
const onBlack = async (input, [canvasW, canvasH], size) =>
  sharp({ create: { width: canvasW, height: canvasH, channels: 4, background: "#000" } })
    .composite([{ input: await resize(input, size).png().toBuffer(), gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();

await mkdir(LOGO_DIR, { recursive: true });
const outputs = [
  [path.join(LOGO_DIR, "crest.webp"), await sharp(source).webp({ lossless: true, effort: 6 }).toBuffer()],
  [path.join(LOGO_DIR, "crest-160.webp"), await resize(source, 160).webp({ lossless: true }).toBuffer()],
  [path.join(APP, "apple-icon.png"), await onBlack(source, [180, 180], 168)],
  [path.join(APP, "opengraph-image.png"), await onBlack(source, [1200, 630], 470)],
  [path.join(APP, "icon.png"), await resize(emblem, 192).png({ compressionLevel: 9 }).toBuffer()],
  [
    path.join(APP, "favicon.ico"),
    ico(await Promise.all([16, 32, 48].map(async (s) => [s, await resize(emblem, s).png().toBuffer()]))),
  ],
];

console.log(`From ${path.relative(ROOT, SOURCE)} (${width}×${height}):`);
for (const [file, data] of outputs) {
  await writeFile(file, data);
  console.log(`  ✓ ${path.relative(ROOT, file)}`.padEnd(34) + `${(data.length / 1024).toFixed(0)} KB`);
}

// ---------------------------------------------------------------------------

// Crops the crest to its solid red centre disc. The disc edge is found by walking
// outward from the centre until a ring of pixels is no longer mostly red.
async function centreDisc(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const size = info.width;
  const centre = (size - 1) / 2;
  const isRed = (i) => data[i] > 150 && data[i + 1] < 70 && data[i + 2] < 70 && data[i + 3] > 200;

  let edge = 0;
  for (let r = Math.round(size * 0.2); r < size / 2; r++) {
    let red = 0;
    const samples = 720;
    for (let k = 0; k < samples; k++) {
      const a = (k / samples) * 2 * Math.PI;
      const x = Math.round(centre + r * Math.cos(a));
      const y = Math.round(centre + r * Math.sin(a));
      if (isRed((y * size + x) * 4)) red++;
    }
    if (red / samples < 0.5) {
      edge = r;
      break;
    }
  }
  if (edge < size * 0.25) fail("Couldn't find the crest's red centre disc; check logo.png.");

  const radius = edge - 1;
  const side = radius * 2 + 2;
  const left = Math.round(centre - radius - 1);
  const mask = Buffer.from(
    `<svg width="${side}" height="${side}"><circle cx="${side / 2}" cy="${side / 2}" r="${radius}" fill="#fff"/></svg>`,
  );
  return sharp(input)
    .extract({ left, top: left, width: side, height: side })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

// Minimal .ico writer: a directory of PNG images, which every current browser reads.
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = Buffer.alloc(16 * images.length);
  let offset = header.length + entries.length;
  images.forEach(([size, data], i) => {
    entries.writeUInt8(size, i * 16);
    entries.writeUInt8(size, i * 16 + 1);
    entries.writeUInt16LE(1, i * 16 + 4);
    entries.writeUInt16LE(32, i * 16 + 6);
    entries.writeUInt32LE(data.length, i * 16 + 8);
    entries.writeUInt32LE(offset, i * 16 + 12);
    offset += data.length;
  });
  return Buffer.concat([header, entries, ...images.map(([, data]) => data)]);
}

function fail(message) {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}
