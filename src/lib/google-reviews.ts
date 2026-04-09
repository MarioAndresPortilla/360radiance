// Google reviews — live-only loader.
//
// This module is the single source of truth for review data on the site.
// It calls the Google Places API (new) on every server render and caches
// the result for 30 minutes via Next.js's `fetch` cache. New reviews
// surface within ~30 min of being posted on Google without a redeploy.
//
// Failure mode: if the env vars are missing or the fetch fails for any
// reason (rate limit, network blip, malformed payload), the loader
// returns EMPTY_REVIEWS and the consuming UI hides its review section.
// We deliberately do NOT fall back to a static snapshot or hand-curated
// testimonials anymore — Marta wanted only authentic, real-time Google
// reviews on the site.
//
// The Places API (new) only returns the **5 most recent** reviews. That
// is a Google quota limit, not ours.

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
 * Resolve Google reviews for server-side rendering. Hits the live Places
 * API and returns the normalized result. On any failure (missing env
 * vars, non-2xx response, malformed payload, network error) returns
 * EMPTY_REVIEWS so callers degrade gracefully without throwing.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return EMPTY_REVIEWS;

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
      return EMPTY_REVIEWS;
    }
    const raw = (await res.json()) as RawPlacesResponse;
    return normalize(raw);
  } catch (err) {
    console.error('[google-reviews] Places API fetch failed:', err);
    return EMPTY_REVIEWS;
  }
}

/** True when we have at least one real Google review to render. */
export function hasGoogleReviews(data: GoogleReviewsData): boolean {
  return data.reviews.length > 0;
}
