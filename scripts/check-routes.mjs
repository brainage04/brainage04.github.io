/* global fetch, console, AbortSignal */
// Requests every page of the built site from `astro preview` and from `astro dev`, and fails when a page does not
// return 200 or renders an error overlay. Run `npm run build` first: the page list comes from `dist`, so it covers
// every Astro route (including dynamic ones) and every public HTML file, which is also requested by its directory URL.
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join, relative, sep } from 'node:path';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import { dev, preview } from 'astro';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(root, 'dist');
const publicDir = join(root, 'public');
const missingRoute = '/route-check-missing-page/';
const errorMarkers = /vite-error-overlay|astro-error-overlay|FailedToFetchRemoteImageDimensions/;

async function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)).split(sep).join('/'));
}

/** URLs as the site links them: `x/index.html` is `/x/`, except Astro's `x.html` routes, which have no slash. */
function pageUrls(file, isPublic) {
  if (file === '404.html') return [];
  if (!file.endsWith('/index.html') && file !== 'index.html') return [`/${file}`];

  const directory = `/${file.slice(0, -'index.html'.length)}`;
  const url = directory.endsWith('.html/') ? directory.slice(0, -1) : directory;
  return isPublic ? [url, `/${file}`] : [url];
}

async function routes() {
  if (!existsSync(join(distDir, 'index.html'))) {
    throw new Error('dist/index.html is missing; run `npm run build` first.');
  }
  const publicPages = new Set(await htmlFiles(publicDir));
  const files = new Set([...(await htmlFiles(distDir)), ...publicPages]);
  return [...new Set([...files].flatMap((file) => pageUrls(file, publicPages.has(file))))].sort();
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function check(origin, url, expectedStatus = 200) {
  try {
    const response = await fetch(new URL(url, origin), { signal: AbortSignal.timeout(60_000) });
    const body = await response.text();
    if (response.status !== expectedStatus) return `${response.status} (expected ${expectedStatus})`;
    if (errorMarkers.test(body)) return 'error overlay in the response';
    return undefined;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

async function checkServer(label, start, urls) {
  const port = await freePort();
  const server = await start(port);
  const origin = `http://127.0.0.1:${port}`;
  const failures = [];

  try {
    for (const url of urls) {
      const failure = await check(origin, url);
      console.log(`${failure ? 'FAIL' : 'ok  '} ${label} ${url}${failure ? `: ${failure}` : ''}`);
      if (failure) failures.push(`${label} ${url}: ${failure}`);
    }
    const missing = await check(origin, missingRoute, 404);
    console.log(`${missing ? 'FAIL' : 'ok  '} ${label} ${missingRoute} (404 page)${missing ? `: ${missing}` : ''}`);
    if (missing) failures.push(`${label} ${missingRoute}: ${missing}`);
  } finally {
    await server.stop();
  }
  return failures;
}

const urls = await routes();
const serverConfig = (port) => ({ root, logLevel: 'warn', server: { host: '127.0.0.1', port } });
const failures = [
  ...(await checkServer('preview', (port) => preview(serverConfig(port)), urls)),
  ...(await checkServer('dev', (port) => dev(serverConfig(port)), urls)),
];

if (failures.length > 0) {
  console.error(`\n${failures.length} route check(s) failed:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`\nAll ${urls.length} routes and the 404 page work in preview and dev.`);
process.exit(0);
