#!/usr/bin/env node
// Manual Google reviews sync (Option 3).
//
// Pulls the most recent reviews for the configured Place ID via the
// Google Places API (new) and writes a normalized snapshot to
// `src/data/google-reviews.json`. Commit the resulting file so the static
// snapshot is shipped with the build.
//
// Usage:
//   1. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in `.env.local`
//      (or export them in your shell).
//   2. Run: `npm run sync:reviews`
//   3. Inspect the diff in `src/data/google-reviews.json`.
//   4. Commit the updated JSON file.
//
// Notes:
//   - The Places API only returns the **5 most recent** reviews; that is a
//     Google limit, not a script limit.
//   - Re-run this script whenever you want to refresh the static snapshot.
//   - The runtime loader (`src/lib/google-reviews.ts`) prefers live API
//     results over the static JSON when both are available, so this script
//     is primarily for build-time and offline-friendly snapshots.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT, '.env.local');
const OUTPUT_FILE = path.join(ROOT, 'src', 'data', 'google-reviews.json');

const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';
const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews';

/**
 * Minimal `.env.local` parser. Supports `KEY=value` and `KEY="value"`,
 * ignores blank lines and `#` comments. We avoid pulling in `dotenv` so the
 * script has zero dependencies and can be run with plain Node.
 */
async function loadDotenv() {
  try {
    const raw = await fs.readFile(ENV_FILE, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Don't override existing process env (shell wins).
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    // No .env.local — fall back to process.env entirely.
  }
}

function normalize(raw) {
  const reviews = (raw.reviews ?? [])
    .map((r) => {
      const text = r.text?.text ?? r.originalText?.text ?? '';
      const authorName = r.authorAttribution?.displayName ?? 'Google reviewer';
      if (!text || !r.rating) return null;
      return {
        authorName,
        authorPhotoUrl: r.authorAttribution?.photoUri ?? undefined,
        authorProfileUrl: r.authorAttribution?.uri ?? undefined,
        rating: r.rating,
        text,
        relativeTime: r.relativePublishTimeDescription ?? '',
        publishTime: r.publishTime ?? '',
      };
    })
    .filter(Boolean);

  return {
    reviews,
    rating: raw.rating ?? null,
    totalReviews: raw.userRatingCount ?? null,
    fetchedAt: new Date().toISOString(),
  };
}

async function main() {
  await loadDotenv();

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error('\n  ✗ Missing env vars.');
    console.error('    Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env.local');
    console.error('    or export them in your shell, then re-run.\n');
    process.exit(1);
  }

  console.log(`\n  ↻ Fetching Google reviews for place ${placeId}...`);

  let res;
  try {
    res = await fetch(`${PLACES_API_BASE}/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
    });
  } catch (err) {
    console.error('\n  ✗ Network error calling Places API:', err.message, '\n');
    process.exit(1);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`\n  ✗ Places API returned ${res.status} ${res.statusText}`);
    if (body) console.error('    ' + body.slice(0, 500).replace(/\n/g, '\n    '));
    console.error('');
    process.exit(1);
  }

  const raw = await res.json();
  const data = normalize(raw);

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');

  console.log(`  ✓ Wrote ${data.reviews.length} reviews to ${path.relative(ROOT, OUTPUT_FILE)}`);
  if (data.rating != null && data.totalReviews != null) {
    console.log(`    Average rating: ${data.rating} (${data.totalReviews} total reviews on Google)`);
  }
  console.log('    Commit the file to ship the snapshot.\n');
}

main().catch((err) => {
  console.error('\n  ✗ Unexpected error:', err);
  process.exit(1);
});
