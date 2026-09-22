import fs from "node:fs/promises";
import path from "node:path";
import { preview } from "vite";
import { chromium } from "playwright";
import { publicRoutes } from "./lib/routes.mjs";

/**
 * Build-time HTML prerendering for SEO and social crawlers.
 *
 * History: we previously stamped only <head> metadata onto an empty SPA shell.
 * That left `#root` empty, so Google Live URL Inspection classified valid routes
 * (e.g. /about) as Soft 404 despite HTTP 200 + correct canonicals.
 *
 * We now also serialize `#root` innerHTML after React has painted page-specific
 * content (including lazy routes). The client hydrates that markup via
 * hydrateRoot so users keep interactivity without discarding the first paint.
 *
 * Flat files (`dist/about.html`) remain intentional: Netlify serves them at
 * `/about` with HTTP 200 and does not 301 to a trailing slash.
 */

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SHELL = path.join(DIST, "index.html");
const PORT = 4179;

/** Third parties have no business being baked into static HTML. */
const BLOCKED = ["progressarc.io", "plausible.io"];

const RENDER_TIMEOUT_MS = 30_000;
const SITE_URL = "https://zaviah.org";
const canonicalFor = (route) => (route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);

const outputFor = (route) =>
  route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`);

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ channel: "chrome" });
  }
}

async function extractPage(context, url, { expectCanonical }) {
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

    // Lazy routes paint an H1 after their chunk loads — wait for it so Soft 404
    // crawlers see real page copy, not a Suspense fallback.
    await page.waitForFunction(
      () => {
        const h1 = document.querySelector("h1");
        return !!(h1 && h1.textContent && h1.textContent.trim().length > 2);
      },
      { timeout: RENDER_TIMEOUT_MS },
    );

    // Allow remaining lazy sections to settle; analytics hosts are already blocked.
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});

    const meta = await page.evaluate(() => {
      const content = (attr, key) =>
        document.querySelector(`meta[${attr}="${key}"]`)?.getAttribute("content") ?? null;

      const root = document.getElementById("root");
      const rootHtml = root?.innerHTML ?? "";
      const h1 = document.querySelector("h1")?.textContent?.trim() ?? "";

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
        rootHtml,
        h1,
        rootTextLength: (root?.innerText ?? "").replace(/\s+/g, " ").trim().length,
      };
    });

    return { meta, errors };
  } finally {
    await page.close();
  }
}

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

/**
 * Stamp route metadata + body onto Vite's original shell.
 * Keeps modulepreload / asset ordering from the Vite emit.
 */
function applyPage(shell, meta, { dropCanonical = false, route = "/" } = {}) {
  let html = shell;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);

  // Inner pages must not inherit the homepage hero image preload (LCP-only).
  if (route !== "/") {
    html = html.replace(/\s*<link[^>]*\srel="preload"[^>]*\sas="image"[^>]*>/gi, "");
  }

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

  for (const [key, value] of Object.entries(meta.og ?? {})) {
    if (dropCanonical && key === "url") continue;
    setProperty(`og:${key}`, value);
  }
  for (const [key, value] of Object.entries(meta.twitter ?? {})) {
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

  html = html.replace(/\s*<script id="page-jsonld"[^>]*>[\s\S]*?<\/script>/i, "");
  if (meta.jsonLd) {
    const tag = `<script id="page-jsonld" type="application/ld+json">${meta.jsonLd}</script>`;
    html = html.replace("</head>", `    ${tag}\n  </head>`);
  }

  if (meta.rootHtml) {
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${meta.rootHtml}</div>`,
    );
    html = html.replace(/<html\s+lang="en"/i, `<html lang="en" data-prerendered="true"`);
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
const captured = [];

try {
  for (const route of routes) {
    const { meta, errors } = await extractPage(context, `${base}${route}`, {
      expectCanonical: canonicalFor(route),
    });

    if (errors.length) failures.push(`${route}: ${errors.join(" | ")}`);
    captured.push({ route, meta });
    console.log(
      `  captured ${route.padEnd(28)} body ~${meta.rootTextLength} chars, h1="${meta.h1}"`,
    );
  }

  const sentinel = "/__prerender_404__";
  const { meta: notFoundMeta, errors: notFoundErrors } = await extractPage(
    context,
    `${base}${sentinel}`,
    { expectCanonical: null },
  );
  if (notFoundErrors.length) failures.push(`404: ${notFoundErrors.join(" | ")}`);
  captured.push({ route: sentinel, meta: notFoundMeta, is404: true });
} finally {
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error(`\nprerender: ${failures.length} runtime error(s):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

/*
 * Write AFTER closing the preview server. Writing about.html into dist/ while
 * Vite preview was still running caused later routes to load that file, hydrate,
 * and throw React #418/#423 from Framer Motion style mismatches.
 */
const written = [];
for (const page of captured) {
  if (page.is404) {
    const html = applyPage(shell, page.meta, { dropCanonical: true, route: page.route });
    if (html.includes("/__prerender_404__")) {
      throw new Error("prerender: sentinel path leaked into dist/404.html");
    }
    await fs.writeFile(path.join(DIST, "404.html"), html, "utf8");
    console.log(`  ${"(404 catch-all)".padEnd(32)} -> dist/404.html`);
    continue;
  }

  const html = applyPage(shell, page.meta, { route: page.route });
  const out = outputFor(page.route);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html, "utf8");
  written.push({ route: page.route, html, meta: page.meta });
  console.log(`  ${page.route.padEnd(32)} -> ${path.relative(ROOT, out)}`);
}

const pick = (html, re) => html.match(re)?.[1] ?? null;

const metaSummary = written.map(({ route, html, meta }) => ({
  route,
  title: pick(html, /<title>([^<]*)<\/title>/),
  description: pick(html, /<meta name="description" content="([^"]*)"/i),
  canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
  ogUrl: pick(html, /<meta property="og:url" content="([^"]*)"/i),
  ogTitle: pick(html, /<meta property="og:title" content="([^"]*)"/i),
  twitterTitle: pick(html, /<meta name="twitter:title" content="([^"]*)"/i),
  hasJsonLd: html.includes('id="page-jsonld"'),
  hasH1: /<h1[\s>]/i.test(html),
  rootTextLength: meta.rootTextLength,
  h1: meta.h1,
  looksLike404: /page not found/i.test(meta.h1),
  extraPreloads: [...html.matchAll(/<link rel="modulepreload"[^>]*>/g)].length,
}));

const shellPreloads = [...shell.matchAll(/<link rel="modulepreload"[^>]*>/g)].length;
const problems = [];

for (const page of metaSummary) {
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
  if (!page.hasH1) problems.push(`${page.route}: prerendered HTML missing <h1>`);
  if (page.rootTextLength < 80) {
    problems.push(`${page.route}: body text too thin (${page.rootTextLength} chars)`);
  }
  if (page.looksLike404) {
    problems.push(`${page.route}: prerendered body looks like a 404 page`);
  }
  if (page.extraPreloads !== shellPreloads) {
    problems.push(
      `${page.route}: modulepreload count ${page.extraPreloads} != shell ${shellPreloads}`,
    );
  }
}

for (const field of ["title", "description", "canonical"]) {
  const byValue = new Map();
  for (const page of metaSummary) {
    byValue.set(page[field], [...(byValue.get(page[field]) ?? []), page.route]);
  }
  for (const [value, sharedBy] of byValue) {
    if (sharedBy.length > 1) {
      problems.push(`duplicate ${field} across ${sharedBy.join(", ")}: "${value}"`);
    }
  }
}

if (problems.length) {
  console.error(`\nprerender: ${problems.length} metadata/content problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  `\nPrerendered ${written.length} routes + 404.html — unique head metadata, ` +
    `non-empty body HTML with H1, and no Soft-404 shells.`,
);
