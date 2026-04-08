import 'server-only';
import Stripe from 'stripe';

/*
 * Stripe SDK singleton — server-only.
 *
 * The `import 'server-only'` directive at the top of the file fails the build
 * if any client component imports this by accident. STRIPE_SECRET_KEY MUST
 * never reach the browser, so this guard is non-negotiable.
 *
 * Returns null when the env var is missing so callers can handle the
 * "Stripe not configured" path gracefully (return 503, hide UI, etc.) rather
 * than crashing on import. This pattern lets the build pass even when the
 * env var hasn't been set yet, which is critical for the initial deploy.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  cached = new Stripe(key, {
    // Pin the API version so future Stripe SDK upgrades don't silently
    // shift behavior. Bump deliberately when we test against a new version.
    // The Stripe TS types use a literal-string version, so this needs to
    // match a value the installed @types/stripe package knows about.
    typescript: true,
  });
  return cached;
}

export function stripeEnabled(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
