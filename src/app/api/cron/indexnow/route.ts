// Daily Vercel cron → streaming IndexNow submission to Bing/Yandex.
//
// Invoked by Vercel's cron runner (see vercel.json → crons). Reads the live
// sitemap and submits only URLs whose <lastmod> falls within the last 2 days,
// which is the "streaming-style" pattern Bing asks for in their guidelines
// (batch dumps of the whole sitemap waste quota and degrade signal trust).
//
// Authentication: Vercel sends `Authorization: Bearer ${CRON_SECRET}` on cron
// invocations. The route rejects anything else so the endpoint can't be
// triggered by third parties to burn our IndexNow quota.
//
// For a manual full-refresh, run `npm run indexnow` (that script supports
// --all and --since-days flags).

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const KEY = '0ced7db550694d8f947782a276acf0e3';
const HOST = '360radianceskincare.com';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SINCE_DAYS = 2;

async function fetchChangedUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL, {
    headers: { 'user-agent': 'indexnow-cron' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  const cutoff = Date.now() - SINCE_DAYS * 24 * 60 * 60 * 1000;
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  return blocks.flatMap((block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    if (!loc || !lastmod) return [];
    const t = Date.parse(lastmod);
    return Number.isFinite(t) && t >= cutoff ? [loc] : [];
  });
}

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
  }
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const urlList = await fetchChangedUrls();
    if (urlList.length === 0) {
      return NextResponse.json({ submitted: 0, status: 'no-changes' });
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    });
    const body = await res.text();
    return NextResponse.json({
      submitted: urlList.length,
      indexnow_status: res.status,
      indexnow_body: body || null,
    }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
