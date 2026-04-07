#!/usr/bin/env node
/*
 * Rasterize the unique blog hero SVGs into JPGs that social platforms (Open
 * Graph, Twitter cards, LinkedIn previews) can render — those clients don't
 * support SVG, so each blog post needs a real raster fallback.
 *
 * Inputs:
 *   public/images/blog/{slug}.svg   — the source vector hero (1600x900)
 *
 * Outputs:
 *   public/images/blog/{slug}.jpg   — 1200x630 OG-sized rasterization
 *
 * Usage:
 *   node scripts/rasterize-blog-images.mjs
 *
 * Notes:
 *   - Sharp comes bundled with Next.js for image optimization, so it's already
 *     installed locally — no extra dependency required.
 *   - 1200x630 is the canonical Open Graph aspect; the source SVGs are 16:9
 *     (1600x900) which is close enough that Sharp's `cover` resize crops a
 *     few pixels off the top and bottom rather than letterboxing.
 *   - Quality is set to 86 — visually clean and keeps each JPG ~30–60KB.
 *   - Re-run any time the SVGs change. The script overwrites without asking.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_IMG_DIR = path.join(ROOT, 'public', 'images', 'blog');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const JPG_QUALITY = 86;

async function main() {
  const entries = await fs.readdir(BLOG_IMG_DIR);
  const svgs = entries.filter((f) => f.endsWith('.svg')).sort();

  if (svgs.length === 0) {
    console.error(`No .svg files found in ${BLOG_IMG_DIR}`);
    process.exit(1);
  }

  console.log(`Rasterizing ${svgs.length} blog SVGs to ${OG_WIDTH}x${OG_HEIGHT} JPG...`);

  for (const svgFile of svgs) {
    const slug = svgFile.replace(/\.svg$/, '');
    const svgPath = path.join(BLOG_IMG_DIR, svgFile);
    const jpgPath = path.join(BLOG_IMG_DIR, `${slug}.jpg`);

    const svgBuffer = await fs.readFile(svgPath);
    const info = await sharp(svgBuffer, { density: 300 })
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'center' })
      .jpeg({ quality: JPG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(jpgPath);

    const sizeKb = (info.size / 1024).toFixed(1);
    console.log(`  ${slug}.jpg  ${info.width}x${info.height}  ${sizeKb}KB`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Rasterize failed:', err);
  process.exit(1);
});
