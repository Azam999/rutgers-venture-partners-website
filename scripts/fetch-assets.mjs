#!/usr/bin/env node
/**
 * One-time migration: copy every image the old rutgersvip.com uses into this repo,
 * sized for the web, so the new site never hotlinks the old one.
 *
 *   npm run fetch-assets
 *
 * 1. Reads the old homepage HTML and collects every local image path it references,
 *    including the ones hidden behind Next's `/_next/image?url=…` optimizer (that
 *    endpoint only answers at certain widths, so we always fetch the plain path).
 * 2. Downloads each file. Anything other than a 200 image response aborts the run.
 * 3. Writes web-ready copies:
 *      public/headshots/      600×750 WebP, 4:5 centre crop
 *      public/club-gallery/   1600px-wide WebP
 *      public/vip-gallery/    1600px-wide WebP
 *      public/partners/       cream-on-transparent PNG, so mismatched logo files
 *                             (white boxes, black boxes, a 3D render) read as one set
 *
 * The crest is not taken from the old site (its copy was low-res): the club's master
 * file is public/logo.png, and scripts/build-logo.mjs makes the icons from it.
 *
 * The old site lists more photos than the new one shows (former analysts, a 15-photo
 * club carousel). All of them are mirrored so the club can swap photos by editing
 * content/*.ts after the old site is gone.
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OLD_SITE = "https://www.rutgersvip.com";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const CREAM = [0xf5, 0xf1, 0xe4];

// If the old page yields fewer than this many files per folder, its markup has
// changed. Stop instead of shipping a half-empty site.
const MIN_COUNT = { headshots: 20, partners: 11, "club-gallery": 6, "vip-gallery": 6 };

// How to pull a single-colour mask out of each partner logo file.
//   alpha          file already has transparency; use its shape
//   dark-on-light  ink on a white box; distance from white becomes opacity
//   light-on-dark  white ink on a black box; brightness becomes opacity
//   warm-on-blue   Redbeard's orange render on a cyan gradient; red-minus-blue
//                  separates the mark (and its white wordmark) from the backdrop
const PARTNER_TREATMENT = {
  "a16z.png": "alpha",
  "azollaventures.png": "alpha",
  "kp.png": "alpha",
  "base10.png": "dark-on-light",
  "firstround.png": "dark-on-light",
  "jj.jpg": "dark-on-light",
  "morgancreek.png": "dark-on-light",
  "nvpcapital.png": "dark-on-light",
  "reach.jpg": "dark-on-light",
  "norwest.png": "light-on-dark",
  "rbv.jpeg": "warm-on-blue",
};

// ---------------------------------------------------------------------------

const html = await fetchOk(`${OLD_SITE}/`).then((res) => res.text());
const sets = groupByFolder(extractImagePaths(html));

for (const [folder, min] of Object.entries(MIN_COUNT)) {
  const found = sets.get(folder)?.length ?? 0;
  if (found < min) fail(`Expected at least ${min} images in /${folder}/ on ${OLD_SITE}, found ${found}.`);
}
for (const [folder, paths] of sets) {
  if (!(folder in MIN_COUNT)) console.log(`· skipping ${paths.join(", ")} (not used by the new site)`);
}

await mirror("headshots", sets.get("headshots"), async (buf, name) => ({
  name: `${name}.webp`,
  data: await sharp(buf).rotate().resize(600, 750, { fit: "cover" }).webp({ quality: 80 }).toBuffer(),
}));

for (const folder of ["club-gallery", "vip-gallery"]) {
  await mirror(folder, sets.get(folder), async (buf, name) => ({
    name: `${name}.webp`,
    data: await sharp(buf)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toBuffer(),
  }));
}

await mirror("partners", sets.get("partners"), async (buf, name, file) => {
  const treatment = PARTNER_TREATMENT[file];
  if (!treatment) fail(`No logo treatment for partners/${file}; add it to PARTNER_TREATMENT.`);
  return { name: `${name}.png`, data: await monochromeLogo(buf, treatment) };
});

console.log("\nDone. Partner logo sizes for content/partners.ts are listed above.");

// ---------------------------------------------------------------------------

function extractImagePaths(page) {
  const found = new Set();
  // Optimizer URLs: /_next/image?url=%2Fheadshots%2Fisaac-howe.jpg&amp;w=640&amp;q=95
  for (const [, encoded] of page.matchAll(/\/_next\/image\?url=([^&"'\s]+)/g)) {
    found.add(decodeURIComponent(encoded));
  }
  // Plain references: src="/unicorn.svg"
  for (const [, plain] of page.matchAll(/(?:src|href)="(\/[^"?#]+\.(?:png|jpe?g|webp|gif|svg))"/gi)) {
    found.add(plain);
  }
  return [...found].filter((p) => p.startsWith("/") && !p.startsWith("//"));
}

function groupByFolder(paths) {
  const sets = new Map();
  for (const p of paths.sort()) {
    const parts = p.split("/").filter(Boolean);
    const folder = parts.length > 1 ? parts[0] : "(root)";
    sets.set(folder, [...(sets.get(folder) ?? []), p]);
  }
  return sets;
}

async function mirror(folder, paths, convert) {
  const outDir = path.join(PUBLIC, folder);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  console.log(`\n/${folder}/ (${paths.length} files)`);

  const buffers = await mapLimit(paths, 6, download);
  for (const [i, src] of paths.entries()) {
    const file = path.basename(src);
    const name = path.parse(file).name.toLowerCase();
    const out = await convert(buffers[i], name, file);
    await writeFile(path.join(outDir, out.name), out.data);
    const { width, height } = await sharp(out.data).metadata();
    console.log(`  ✓ ${folder}/${out.name}`.padEnd(44) + `${width}×${height}`.padEnd(11) + kb(out.data));
  }
}

async function monochromeLogo(buf, treatment) {
  const { data, info } = await sharp(buf)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const opacity = Buffer.alloc(info.width * info.height);
  for (let px = 0; px < opacity.length; px++) {
    const [r, g, b, a] = data.subarray(px * 4, px * 4 + 4);
    const alpha = a / 255;
    let ink;
    if (treatment === "alpha") {
      ink = alpha;
    } else if (treatment === "dark-on-light") {
      // Composite onto white first, then measure how far the pixel is from white.
      const darkest = Math.min(r, g, b) * alpha + 255 * (1 - alpha);
      ink = ramp(255 - darkest, 24, 170);
    } else if (treatment === "light-on-dark") {
      ink = ramp(Math.max(r, g, b) * alpha, 24, 200);
    } else if (treatment === "warm-on-blue") {
      ink = ramp(r - b, -105, -25) * alpha;
    } else {
      fail(`Unknown logo treatment "${treatment}".`);
    }
    opacity[px] = Math.round(ink * 255);
  }

  const box = inkBounds(opacity, info.width, info.height);
  return sharp(solidWithAlpha(CREAM, opacity, info.width, info.height), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extract(box)
    .resize({ width: 480, height: 200, fit: "inside", withoutEnlargement: true })
    .png({ palette: true, colours: 256, dither: 0, compressionLevel: 9 })
    .toBuffer();
}

// ---------------------------------------------------------------------------

async function fetchOk(url) {
  const res = await fetch(url);
  if (res.status !== 200) fail(`GET ${url} returned ${res.status} ${res.statusText}`);
  return res;
}

async function download(src) {
  const url = OLD_SITE + encodeURI(src);
  const res = await fetchOk(url);
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) fail(`GET ${url} returned "${type}", not an image`);
  return Buffer.from(await res.arrayBuffer());
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function ramp(value, lo, hi) {
  return Math.min(1, Math.max(0, (value - lo) / (hi - lo)));
}

function solidWithAlpha([r, g, b], opacity, width, height) {
  const out = Buffer.alloc(width * height * 4);
  for (let px = 0; px < width * height; px++) {
    out[px * 4] = r;
    out[px * 4 + 1] = g;
    out[px * 4 + 2] = b;
    out[px * 4 + 3] = opacity[px];
  }
  return out;
}

function inkBounds(opacity, width, height) {
  let left = width, top = height, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (opacity[y * width + x] > 10) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) fail("Logo came out empty; check its treatment.");
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

function kb(buf) {
  return `${(buf.length / 1024).toFixed(0)} KB`;
}

function fail(message) {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}
