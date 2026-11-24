// Tells Bing, Yandex and the other IndexNow search engines that the site's pages changed, so they
// re-crawl within hours instead of weeks. Run it AFTER a deploy is live:   npm run indexnow
// It submits the URLs in the LIVE sitemap.xml, i.e. exactly the pages that are online.
// public/<key>.txt proves we own the site; the key is public by design.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeSiteUrl } from '../src/utils/siteUrl.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = normalizeSiteUrl(process.argv[2]); // defaults to https://worklancer.org
const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (public/<32 hex characters>.txt) found.');
const key = keyFile.slice(0, -'.txt'.length);
const keyLocation = `${site}/${keyFile}`;

const fail = (msg) => { console.error(msg); process.exit(1); };

const keyRes = await fetch(keyLocation);
if (!keyRes.ok || (await keyRes.text()).trim() !== key) fail(`The key file isn't live at ${keyLocation} yet. Deploy first, then run this again.`);

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) fail(`No URLs found in ${site}/sitemap.xml.`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
});
// 200 = accepted; 202 = accepted while the key is still being checked (normal the first time).
console.log(`IndexNow: submitted ${urlList.length} URLs from ${site} -> HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) fail(await res.text());
