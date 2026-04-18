// Submits sitemap URLs to IndexNow so Bing/Yandex re-crawl promptly.
//
// Two modes:
//   --all                         → submit every URL in the sitemap (full refresh)
//   --since-days N (default: 14)  → submit only URLs with <lastmod> within N days
//
// Streaming-style submissions (only recently changed URLs) are what Bing asks
// for in their webmaster guidelines — batch dumps of the whole sitemap waste
// quota and reduce signal trust. The full refresh is still available via --all
// for manual first-runs or recovery after prolonged content drift.
//
// The key file must already be live at `${HOST}/${KEY}.txt` (see public/) —
// IndexNow verifies ownership by fetching keyLocation before accepting urlList.
//
// Exit codes: 0 success, 1 error, 2 nothing-to-submit (treated as success by CI).

const KEY = '0ced7db550694d8f947782a276acf0e3';
const HOST = '360radianceskincare.com';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

function parseArgs(argv) {
  const args = { all: false, sinceDays: 14 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') args.all = true;
    else if (a === '--since-days') args.sinceDays = Number(argv[++i]);
    else if (a.startsWith('--since-days=')) args.sinceDays = Number(a.split('=')[1]);
  }
  if (!Number.isFinite(args.sinceDays) || args.sinceDays <= 0) {
    throw new Error(`invalid --since-days value: ${args.sinceDays}`);
  }
  return args;
}

async function fetchSitemapEntries() {
  const res = await fetch(SITEMAP_URL, { headers: { 'user-agent': 'indexnow-submit' } });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  // Extract each <url>…</url> block so we can pair <loc> with <lastmod>.
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const entries = blocks.map((block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
    return loc ? { loc, lastmod } : null;
  }).filter(Boolean);
  if (entries.length === 0) throw new Error('no <url> entries found in sitemap');
  return entries;
}

function filterByAge(entries, sinceDays) {
  const cutoff = Date.now() - sinceDays * 24 * 60 * 60 * 1000;
  return entries.filter((e) => {
    if (!e.lastmod) return false;
    const t = Date.parse(e.lastmod);
    return Number.isFinite(t) && t >= cutoff;
  });
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION, { headers: { 'user-agent': 'indexnow-submit' } });
  if (!res.ok) throw new Error(`key file not reachable (${res.status}) at ${KEY_LOCATION}`);
  const body = (await res.text()).trim();
  if (body !== KEY) throw new Error(`key file content mismatch at ${KEY_LOCATION}`);
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

(async () => {
  const args = parseArgs(process.argv.slice(2));
  console.log(`→ verifying key file at ${KEY_LOCATION}`);
  await verifyKeyFile();
  console.log(`→ fetching sitemap ${SITEMAP_URL}`);
  const entries = await fetchSitemapEntries();
  const selected = args.all ? entries : filterByAge(entries, args.sinceDays);
  const mode = args.all ? 'all' : `changed in last ${args.sinceDays}d`;
  console.log(`→ ${selected.length}/${entries.length} URLs match mode: ${mode}`);
  if (selected.length === 0) {
    console.log('← nothing to submit, exiting');
    process.exit(2);
  }
  const urlList = selected.map((e) => e.loc);
  const { status, body } = await submit(urlList);
  console.log(`← IndexNow ${status}${body ? ` — ${body}` : ''}`);
  if (status !== 200 && status !== 202) process.exit(1);
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
