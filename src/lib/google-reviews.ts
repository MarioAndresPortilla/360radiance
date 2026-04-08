// Google reviews — hybrid live + static loader.
//
// This module is the single source of truth for review data on the site.
// It supports two delivery modes that complement each other:
//
//   1. **Live (Option 1)** — when both `GOOGLE_PLACES_API_KEY` and
//      `GOOGLE_PLACE_ID` env vars are set, `getGoogleReviews()` calls the
//      Places API (new) at request time. The fetch is cached by Next.js for
//      30 minutes via `next.revalidate` so new reviews appear on the site
//      within ~30 min of being posted on Google — effectively "live" from a
//      visitor's perspective without burning quota or violating Google's
//      30-day TOS cap on cached reviews. On-demand purges are still possible
//      via `revalidateTag` against the `google-reviews` tag.
//
//   2. **Static (Option 3)** — `scripts/sync-google-reviews.mjs` is a
//      manual-run script that hits the same Places API endpoint and writes
//      the normalized result into `src/data/google-reviews.json`. When the
//      live env vars are missing or the live fetch fails, the loader falls
//      back to that JSON file. This means the site can render real reviews
//      even on a build environment without API access (or before the API
//      key is provisioned).
//
// Resolution order on every server render:
//   live API → static JSON → empty (UI falls back to hand-curated TESTIMONIALS)
//
// The Places API (new) only returns the **5 most recent** reviews. That is a
// Google quota limit, not ours.

import staticReviews from '@/data/google-reviews.json';

export type GoogleReview = {
  authorName: string;
  authorPhotoUrl?: string;
  authorProfileUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
};

export type GoogleReviewsData = {
  reviews: GoogleReview[];
  rating: number | null;
  totalReviews: number | null;
  fetchedAt: string | null;
};

export const EMPTY_REVIEWS: GoogleReviewsData = {
  reviews: [],
  rating: null,
  totalReviews: null,
  fetchedAt: null,
};

const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';
const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews';
const REVALIDATE_SECONDS = 60 * 30; // 30 minutes — near-live; new reviews
                                    // surface on the site without a redeploy.
export const REVIEWS_CACHE_TAG = 'google-reviews';

// Raw shape returned by the Places API (new) — only the fields we care about.
type RawPlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    name?: string;
    relativePublishTimeDescription?: string;
    rating?: number;
    text?: { text?: string; languageCode?: string };
    originalText?: { text?: string; languageCode?: string };
    publishTime?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
};

function normalize(raw: RawPlacesResponse): GoogleReviewsData {
  const reviews: GoogleReview[] = (raw.reviews ?? [])
    .map((r): GoogleReview | null => {
      const text = r.text?.text ?? r.originalText?.text ?? '';
      const authorName = r.authorAttribution?.displayName ?? 'Google reviewer';
      if (!text || !r.rating) return null;
      return {
        authorName,
        authorPhotoUrl: r.authorAttribution?.photoUri,
        authorProfileUrl: r.authorAttribution?.uri,
        rating: r.rating,
        text,
        relativeTime: r.relativePublishTimeDescription ?? '',
        publishTime: r.publishTime ?? '',
      };
    })
    .filter((r): r is GoogleReview => r !== null);

  return {
    reviews,
    rating: raw.rating ?? null,
    totalReviews: raw.userRatingCount ?? null,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Fetch reviews live from the Google Places API. Returns null on any failure
 * (missing env vars, network error, non-2xx response, malformed payload) so
 * callers can fall back to the static JSON without throwing.
 */
async function fetchLiveReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`${PLACES_API_BASE}/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: [REVIEWS_CACHE_TAG] },
    });
    if (!res.ok) {
      console.error('[google-reviews] Places API non-OK response:', res.status, await res.text().catch(() => ''));
      return null;
    }
    const raw = (await res.json()) as RawPlacesResponse;
    return normalize(raw);
  } catch (err) {
    console.error('[google-reviews] Places API fetch failed:', err);
    return null;
  }
}

/**
 * Read the static JSON snapshot written by `scripts/sync-google-reviews.mjs`.
 * The file always exists (a placeholder is committed) but may have an empty
 * `reviews` array if the script has not been run yet.
 */
function getStaticReviews(): GoogleReviewsData {
  // The JSON file is committed with the same shape as GoogleReviewsData, so
  // this cast is safe as long as the schema in scripts/sync-google-reviews.mjs
  // matches the type defined above.
  return staticReviews as GoogleReviewsData;
}

/**
 * Resolve Google reviews for server-side rendering. Tries live API first,
 * falls back to the static JSON, falls back to empty. Never throws.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const live = await fetchLiveReviews();
  if (live && live.reviews.length > 0) return live;

  const snapshot = getStaticReviews();
  if (snapshot.reviews.length > 0) return snapshot;

  return EMPTY_REVIEWS;
}

/** True when we have at least one real Google review to render. */
export function hasGoogleReviews(data: GoogleReviewsData): boolean {
  return data.reviews.length > 0;
}
