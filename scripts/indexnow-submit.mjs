// Submits every URL in the live sitemap to IndexNow so Bing/Yandex re-crawl promptly.
// Usage: npm run indexnow
//
// The key file must already be live at `${HOST}/${KEY}.txt` (see public/) — IndexNow
// verifies ownership by fetching keyLocation before accepting the urlList.

const KEY = '0ced7db550694d8f947782a276acf0e3';
const HOST = '360radianceskincare.com';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { headers: { 'user-agent': 'indexnow-submit' } });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error('no <loc> entries found in sitemap');
  return urls;
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
  console.log(`→ verifying key file at ${KEY_LOCATION}`);
  await verifyKeyFile();
  console.log(`→ fetching sitemap ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`→ submitting ${urls.length} URLs to IndexNow`);
  const { status, body } = await submit(urls);
  console.log(`← IndexNow ${status}${body ? ` — ${body}` : ''}`);
  if (status !== 200 && status !== 202) process.exit(1);
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
