import fs from "node:fs/promises";
import path from "node:path";
import { preview } from "vite";
import { chromium } from "playwright";
import { publicRoutes } from "./lib/routes.mjs";

/**
 * Build-time metadata prerendering.
 *
 * The app is a client-rendered SPA, so every URL used to serve the same
 * index.html: crawlers that do not execute JavaScript saw the homepage's title,
 * description and Open Graph tags on every page. Link previews on WhatsApp,
 * LinkedIn, Slack and X were therefore identical no matter what was shared.
 *
 * This runs the real app in a headless browser against the production build,
 * reads the metadata PageMeta wrote into the document, and stamps it onto a
 * copy of Vite's original index.html for that route. No SSR, no runtime server,
 * no framework change.
 *
 * The body is deliberately not saved. Shipping the rendered markup was measured
 * and rejected: `createRoot` discards #root and rebuilds it, which reset the
 * hero LCP candidate and cost ~860ms under a 4x CPU throttle. Hydrating the
 * snapshot would avoid that, but framer-motion's settled inline styles never
 * match the `initial` values React paints on mount, so the page would flash
 * transparent. Social crawlers only need the head anyway; Google executes JS.
 *
 * The original shell is also kept intact on purpose. Serialising the live
 * document would bake in every `modulepreload` the browser discovered while
 * loading lazy sections, and those 15 extra preloads competed with the hero
 * image for bandwidth — same LCP regression, different cause.
 *
 * Runs from `npm run build`, after `vite build`.
 */

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SHELL = path.join(DIST, "index.html");
const PORT = 4179;

/** Third parties have no business being baked into static HTML. */
const BLOCKED = ["progressarc.io", "plausible.io"];

/**
 * A route is done when React has mounted and PageMeta has written this page's
 * canonical into the head. Waiting on the canonical specifically is what
 * guarantees we never read one route while the previous route's metadata is
 * still in the document.
 */
const RENDER_TIMEOUT_MS = 30_000;

/** Mirrors pageUrl() in src/lib/site.ts. */
const SITE_URL = "https://zaviah.org";
const canonicalFor = (route) => (route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);

/** `/` writes dist/index.html; `/a/b` writes dist/a/b/index.html. */
const outputFor = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch {
    // Playwright's own build isn't downloaded everywhere; fall back to system Chrome.
    return await chromium.launch({ channel: "chrome" });
  }
}

/**
 * Pull the tags PageMeta (and the static shell) leave in the live document.
 * Only these are copied onto the Vite shell — nothing else from the rendered
 * page is allowed to leak into the written HTML.
 */
async function extractMeta(context, url, { expectCanonical }) {
  const page = await context.newPage();
  const errors = [];
  const isBlockedNoise = (u) => BLOCKED.some((host) => u.includes(host));

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    if (isBlockedNoise(msg.location()?.url ?? "")) return;
    errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: RENDER_TIMEOUT_MS });

    await page.waitForFunction(
      (expected) => {
        const root = document.getElementById("root");
        if (!root || root.childElementCount === 0) return false;
        if (!expected) return document.title.length > 0;
        const canonical = document.querySelector('link[rel="canonical"]');
        return canonical?.getAttribute("href") === expected;
      },
      expectCanonical,
      { timeout: RENDER_TIMEOUT_MS },
    );

    const meta = await page.evaluate(() => {
      const content = (attr, key) =>
        document.querySelector(`meta[${attr}="${key}"]`)?.getAttribute("content") ?? null;

      return {
        title: document.title,
        description: content("name", "description"),
        robots: content("name", "robots"),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        og: {
          title: content("property", "og:title"),
          description: content("property", "og:description"),
          type: content("property", "og:type"),
          url: content("property", "og:url"),
          site_name: content("property", "og:site_name"),
          image: content("property", "og:image"),
          "image:secure_url": content("property", "og:image:secure_url"),
          "image:width": content("property", "og:image:width"),
          "image:height": content("property", "og:image:height"),
          "image:alt": content("property", "og:image:alt"),
          locale: content("property", "og:locale"),
        },
        twitter: {
          card: content("name", "twitter:card"),
          site: content("name", "twitter:site"),
          url: content("name", "twitter:url"),
          title: content("name", "twitter:title"),
          description: content("name", "twitter:description"),
          image: content("name", "twitter:image"),
          "image:alt": content("name", "twitter:image:alt"),
        },
        jsonLd: document.getElementById("page-jsonld")?.textContent ?? null,
      };
    });

    return { meta, errors };
  } finally {
    await page.close();
  }
}

/** Escape attribute values so a title containing `"` cannot break the tag. */
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

/**
 * Stamp route metadata onto Vite's original shell. Replaces existing tags of
 * the same name/property in place so ordering (and therefore preload priority)
 * stays exactly as Vite emitted it.
 */
function applyMeta(shell, meta, { dropCanonical = false } = {}) {
  let html = shell;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);

  const setName = (name, content) => {
    if (content == null) return;
    const tag = `<meta name="${name}" content="${esc(content)}" />`;
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`, "i");
    html = re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
  };

  const setProperty = (property, content) => {
    if (content == null) return;
    const tag = `<meta property="${property}" content="${esc(content)}" />`;
    const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`, "i");
    html = re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
  };

  setName("description", meta.description);
  setName("robots", meta.robots);

  for (const [key, value] of Object.entries(meta.og)) {
    if (dropCanonical && key === "url") continue;
    setProperty(`og:${key}`, value);
  }
  for (const [key, value] of Object.entries(meta.twitter)) {
    if (dropCanonical && key === "url") continue;
    setName(`twitter:${key}`, value);
  }

  if (dropCanonical) {
    html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/i, "");
  } else if (meta.canonical) {
    const tag = `<link rel="canonical" href="${esc(meta.canonical)}" />`;
    html = /<link\s+rel="canonical"[^>]*>/i.test(html)
      ? html.replace(/<link\s+rel="canonical"[^>]*>/i, tag)
      : html.replace("</head>", `    ${tag}\n  </head>`);
  }

  // Page-specific JSON-LD from PageMeta. The Organization schema already in the
  // shell stays; this adds (or replaces) the per-page block beside it.
  html = html.replace(/\s*<script id="page-jsonld"[^>]*>[\s\S]*?<\/script>/i, "");
  if (meta.jsonLd) {
    const tag = `<script id="page-jsonld" type="application/ld+json">${meta.jsonLd}</script>`;
    html = html.replace("</head>", `    ${tag}\n  </head>`);
  }

  return html;
}

const shell = await fs.readFile(SHELL, "utf8");
const routes = publicRoutes();
const server = await preview({
  preview: { port: PORT, strictPort: true, host: "127.0.0.1", open: false },
});
const base = `http://127.0.0.1:${PORT}`;

const browser = await launchBrowser();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await context.route("**/*", (route) => {
  const url = route.request().url();
  return BLOCKED.some((host) => url.includes(host)) ? route.abort() : route.continue();
});

const failures = [];
const pages = [];

try {
  for (const route of routes) {
    const { meta, errors } = await extractMeta(context, `${base}${route}`, {
      expectCanonical: canonicalFor(route),
    });

    if (errors.length) failures.push(`${route}: ${errors.join(" | ")}`);

    const html = applyMeta(shell, meta);
    const out = outputFor(route);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html, "utf8");
    pages.push({ route, html });
    console.log(`  ${route.padEnd(32)} -> ${path.relative(ROOT, out)}`);
  }

  /*
   * Catch-all, saved as dist/404.html. Netlify serves that file with a real
   * 404 status for any path with no file behind it, which turns the old soft
   * 404 (200 + homepage shell) into a correct one. Canonical / og:url are
   * omitted: a 404 should not claim to be a specific URL.
   */
  const sentinel = "/__prerender_404__";
  const { meta } = await extractMeta(context, `${base}${sentinel}`, { expectCanonical: null });
  const notFound = applyMeta(shell, meta, { dropCanonical: true });

  if (notFound.includes(sentinel)) {
    throw new Error("prerender: sentinel path leaked into dist/404.html");
  }

  await fs.writeFile(path.join(DIST, "404.html"), notFound, "utf8");
  console.log(`  ${"(404 catch-all)".padEnd(32)} -> dist/404.html`);
} finally {
  await context.close();
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error(`\nprerender: console errors on ${failures.length} route(s):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

/*
 * The whole point of this step is that each file carries its own metadata, so
 * assert it against the written HTML rather than trusting the browser. Shared
 * titles or a stale canonical would silently undo the work, and the symptom
 * (every link preview looking identical) only shows up once it is live.
 */
const pick = (html, re) => html.match(re)?.[1] ?? null;

const meta = pages.map(({ route, html }) => ({
  route,
  title: pick(html, /<title>([^<]*)<\/title>/),
  description: pick(html, /<meta name="description" content="([^"]*)"/i),
  canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
  ogUrl: pick(html, /<meta property="og:url" content="([^"]*)"/i),
  ogTitle: pick(html, /<meta property="og:title" content="([^"]*)"/i),
  twitterTitle: pick(html, /<meta name="twitter:title" content="([^"]*)"/i),
  hasJsonLd: html.includes('id="page-jsonld"'),
  // Guard against the LCP regression: lazy-route modulepreloads must never
  // leak into the written shell.
  extraPreloads: [...html.matchAll(/<link rel="modulepreload"[^>]*>/g)].length,
}));

const shellPreloads = [...shell.matchAll(/<link rel="modulepreload"[^>]*>/g)].length;
const problems = [];

for (const page of meta) {
  const expected = canonicalFor(page.route);
  for (const field of ["title", "description", "ogTitle", "twitterTitle"]) {
    if (!page[field]) problems.push(`${page.route}: missing ${field}`);
  }
  if (page.canonical !== expected) {
    problems.push(`${page.route}: canonical is ${page.canonical}, expected ${expected}`);
  }
  if (page.ogUrl !== expected) {
    problems.push(`${page.route}: og:url is ${page.ogUrl}, expected ${expected}`);
  }
  if (!page.hasJsonLd) problems.push(`${page.route}: no page-specific JSON-LD`);
  if (page.extraPreloads !== shellPreloads) {
    problems.push(
      `${page.route}: modulepreload count ${page.extraPreloads} != shell ${shellPreloads}`,
    );
  }
}

for (const field of ["title", "description", "canonical"]) {
  const byValue = new Map();
  for (const page of meta) {
    byValue.set(page[field], [...(byValue.get(page[field]) ?? []), page.route]);
  }
  for (const [value, sharedBy] of byValue) {
    if (sharedBy.length > 1) {
      problems.push(`duplicate ${field} across ${sharedBy.join(", ")}: "${value}"`);
    }
  }
}

if (problems.length) {
  console.error(`\nprerender: ${problems.length} metadata problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  `\nPrerendered ${pages.length} routes + 404.html — every page has a unique title, ` +
    `description and canonical, plus its own JSON-LD.`,
);
