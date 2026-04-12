// GET /api/google-reviews
//
// Thin JSON wrapper around `getGoogleReviews()` for client-side consumers
// (e.g. a future "Refresh reviews" button or a third-party widget that polls
// our origin instead of Google's). The SSR pages call `getGoogleReviews()`
// directly inside their server components — they do **not** go through this
// route — so request volume here is expected to be near-zero.
//
// Caching note: the underlying `fetch` to the Places API uses
// `next.revalidate = 86400`, so even if this route is hit on every request
// the upstream Google call only happens once per 24 hours per deployment.

import { getGoogleReviews } from '@/lib/google-reviews';

export const revalidate = 1800; // 30 min ISR — matches getGoogleReviews cache

export async function GET() {
  const data = await getGoogleReviews();
  return Response.json(data);
}
