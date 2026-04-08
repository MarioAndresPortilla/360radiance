#!/usr/bin/env node
/*
 * Generate brand favicons from the lotus mark.
 *
 * Why this exists: the prior favicon was a 32x32 dark image (the full
 * branded card shrunken down) — at tab/search-result size the lotus was
 * barely visible. Google also recommends favicons that are a multiple of
 * 48px square; 32px PNGs are below that threshold and risk being skipped
 * for search-results favicons.
 *
 * Outputs (overwrites in place):
 *   src/app/favicon.ico   — multi-size ICO (16, 32, 48, 64) with PNG payloads
 *   src/app/icon.png      — 512x512 (multiple of 48; downscaled by browsers)
 *   src/app/apple-icon.png — 180x180 (Apple touch icon standard)
 *
 * Design: gold lotus mark on navy brand background, generous padding so the
 * mark stays recognizable at 16-32px tab sizes. Solid background (not
 * transparent) so the icon reads against light AND dark browser themes.
 *
 * Re-run any time the brand mark changes:
 *   node scripts/generate-favicon.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const appDir = path.join(repoRoot, 'src', 'app');

// Brand colors (mirrors src/app/globals.css):
//   navy:        #2F3269  (background)
//   navy-deep:   #21244F  (background gradient end)
//   gold:        #E7C27E  (lotus primary)
//   gold-light:  #F3D38C  (lotus highlight)
//   gold-dark:   #9F8449  (lotus shadow / stroke)

// Lotus path data extracted from public/logo-horizontal-purple-light.svg.
// We compute placement so the lotus fills 512x512 with ~12% padding.
// Lotus geometry in local coords spans y in [-195, 26] (height 221) and
// x in [-55, 55] (width 110). Height-constrained -> scale = 392/221 ≈ 1.774.
// Translate centers it: tx=256, ty=60 + 195*1.774 ≈ 406.
const LOTUS_SVG_512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2F3269"/>
      <stop offset="100%" stop-color="#21244F"/>
    </linearGradient>
    <linearGradient id="goldOuter" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="#F3D38C"/>
      <stop offset="50%" stop-color="#E7C27E"/>
      <stop offset="100%" stop-color="#9F8449"/>
    </linearGradient>
    <linearGradient id="goldInner" x1="0.3" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="#FFF4C1"/>
      <stop offset="100%" stop-color="#E7C27E"/>
    </linearGradient>
  </defs>
  <!-- Rounded-square brand background -->
  <rect width="512" height="512" rx="96" ry="96" fill="url(#bg)"/>
  <g transform="translate(256,406) scale(1.774)">
    <!-- Outer petals -->
    <path d="M0,-195 C30,-155 50,-100 50,-55 C50,-20 35,5 0,18 C-35,5 -50,-20 -50,-55 C-50,-100 -30,-155 0,-195Z" fill="url(#goldOuter)" stroke="#5A4520" stroke-width="2.5"/>
    <g transform="rotate(-42)"><path d="M0,-175 C28,-138 45,-90 45,-50 C45,-18 32,5 0,16 C-32,5 -45,-18 -45,-50 C-45,-90 -28,-138 0,-175Z" fill="url(#goldOuter)" stroke="#5A4520" stroke-width="2.5"/></g>
    <g transform="rotate(42)"><path d="M0,-175 C28,-138 45,-90 45,-50 C45,-18 32,5 0,16 C-32,5 -45,-18 -45,-50 C-45,-90 -28,-138 0,-175Z" fill="url(#goldOuter)" stroke="#5A4520" stroke-width="2.5"/></g>
    <g transform="rotate(-80)"><path d="M0,-160 C25,-125 40,-82 40,-45 C40,-15 28,8 0,16 C-28,8 -40,-15 -40,-45 C-40,-82 -25,-125 0,-160Z" fill="url(#goldOuter)" stroke="#5A4520" stroke-width="2.5"/></g>
    <g transform="rotate(80)"><path d="M0,-160 C25,-125 40,-82 40,-45 C40,-15 28,8 0,16 C-28,8 -40,-15 -40,-45 C-40,-82 -25,-125 0,-160Z" fill="url(#goldOuter)" stroke="#5A4520" stroke-width="2.5"/></g>
    <!-- Inner petals -->
    <path d="M0,-135 C20,-105 32,-68 32,-38 C32,-12 22,6 0,14 C-22,6 -32,-12 -32,-38 C-32,-68 -20,-105 0,-135Z" fill="url(#goldInner)" stroke="#7A5A28" stroke-width="2" opacity="0.95"/>
    <g transform="rotate(-42)"><path d="M0,-120 C18,-95 28,-62 28,-35 C28,-10 20,6 0,12 C-20,6 -28,-10 -28,-35 C-28,-62 -18,-95 0,-120Z" fill="url(#goldInner)" stroke="#7A5A28" stroke-width="2" opacity="0.92"/></g>
    <g transform="rotate(42)"><path d="M0,-120 C18,-95 28,-62 28,-35 C28,-10 20,6 0,12 C-20,6 -28,-10 -28,-35 C-28,-62 -18,-95 0,-120Z" fill="url(#goldInner)" stroke="#7A5A28" stroke-width="2" opacity="0.92"/></g>
    <g transform="rotate(-80)"><path d="M0,-105 C16,-82 24,-55 24,-30 C24,-8 16,6 0,12 C-16,6 -24,-8 -24,-30 C-24,-55 -16,-82 0,-105Z" fill="url(#goldInner)" stroke="#7A5A28" stroke-width="2" opacity="0.9"/></g>
    <g transform="rotate(80)"><path d="M0,-105 C16,-82 24,-55 24,-30 C24,-8 16,6 0,12 C-16,6 -24,-8 -24,-30 C-24,-55 -16,-82 0,-105Z" fill="url(#goldInner)" stroke="#7A5A28" stroke-width="2" opacity="0.9"/></g>
    <!-- Center jewel -->
    <circle cx="0" cy="14" r="12" fill="url(#goldInner)" stroke="#5A4520" stroke-width="2.8"/>
    <circle cx="0" cy="14" r="6.5" fill="url(#goldOuter)" stroke="#3D2A10" stroke-width="1.8"/>
  </g>
</svg>`;

/**
 * Build a multi-image .ico file from PNG buffers. We embed each PNG directly
 * in the ICO container (modern Vista+ format) — every browser since 2007
 * supports PNG-in-ICO, and it's far smaller than BMP at the same fidelity.
 * See: https://en.wikipedia.org/wiki/ICO_(file_format)
 */
function buildIco(pngs) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = pngs.length;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const directory = Buffer.alloc(dirEntrySize * numImages);
  pngs.forEach((png, i) => {
    const base = i * dirEntrySize;
    // 0/0 width/height encodes 256; otherwise actual size
    directory.writeUInt8(png.size >= 256 ? 0 : png.size, base + 0);
    directory.writeUInt8(png.size >= 256 ? 0 : png.size, base + 1);
    directory.writeUInt8(0, base + 2); // Color count (0 = no palette)
    directory.writeUInt8(0, base + 3); // Reserved
    directory.writeUInt16LE(1, base + 4); // Color planes
    directory.writeUInt16LE(32, base + 6); // Bits per pixel (RGBA)
    directory.writeUInt32LE(png.buffer.length, base + 8);
    directory.writeUInt32LE(offset, base + 12);
    offset += png.buffer.length;
  });

  return Buffer.concat([header, directory, ...pngs.map((p) => p.buffer)]);
}

async function main() {
  console.log('Rendering 512x512 master from SVG…');
  const master512 = await sharp(Buffer.from(LOTUS_SVG_512))
    .png({ compressionLevel: 9 })
    .toBuffer();

  // icon.png — Next.js auto-serves this at /icon.png with proper sizes attr.
  // 512x512 is well above Google's 48px-multiple requirement and downscales
  // cleanly for any browser tab / search result favicon slot.
  const iconPath = path.join(appDir, 'icon.png');
  await fs.writeFile(iconPath, master512);
  console.log(`  wrote ${path.relative(repoRoot, iconPath)} (512x512)`);

  // apple-icon.png — Apple touch icon standard size.
  const appleIconPath = path.join(appDir, 'apple-icon.png');
  const apple = await sharp(master512).resize(180, 180).png({ compressionLevel: 9 }).toBuffer();
  await fs.writeFile(appleIconPath, apple);
  console.log(`  wrote ${path.relative(repoRoot, appleIconPath)} (180x180)`);

  // favicon.ico — multi-size ICO with 16/32/48/64 PNG-encoded entries.
  // 48 satisfies Google's "multiple of 48" guidance; 16/32 are the classic
  // browser tab sizes; 64 keeps it sharp on hi-DPI Windows taskbars.
  console.log('Building multi-size favicon.ico…');
  const sizes = [16, 32, 48, 64];
  const pngs = await Promise.all(
    sizes.map(async (size) => ({
      size,
      buffer: await sharp(master512).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
    })),
  );
  const ico = buildIco(pngs);
  const icoPath = path.join(appDir, 'favicon.ico');
  await fs.writeFile(icoPath, ico);
  console.log(`  wrote ${path.relative(repoRoot, icoPath)} (${sizes.join('/')})`);

  console.log('\nDone. Re-run after any logo change.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
