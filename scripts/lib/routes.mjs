import fs from "node:fs";
import path from "node:path";

/**
 * Single source of truth for "every public URL this site serves", derived from
 * the router rather than hand-listed. The sitemap and the prerenderer both read
 * it, so the two can never disagree about which pages exist.
 */

const ROOT = process.cwd();
const APP = "src/App.tsx";

/**
 * Where the slugs for each dynamic segment come from. Keyed by the exact route
 * pattern so that adding a dynamic route to App.tsx without registering a
 * source fails the build instead of silently dropping those pages from both
 * the sitemap and the prerender.
 */
const DYNAMIC_SOURCES = {
  "/get-involved/:slug": { file: "src/data/opportunities.ts", label: "opportunity" },
  "/gallery/:slug": { file: "src/data/galleryAlbums.ts", label: "gallery album" },
};

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

/** Route patterns exactly as declared in the `<Routes>` block. */
function routePatterns() {
  const patterns = [...read(APP).matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  if (patterns.length === 0) {
    throw new Error(`routes: no <Route path="..."> found in ${APP}; the router markup changed`);
  }
  return patterns;
}

/**
 * Pulls `slug: "..."` out of a data module. These are plain object literals so
 * a regex is enough, but an empty result means the shape changed — and a
 * silently truncated route list is worse than a failed build.
 */
function readSlugs(relativePath, label) {
  const slugs = [...read(relativePath).matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
  const unique = [...new Set(slugs)];
  if (unique.length === 0) {
    throw new Error(`routes: found no ${label} slugs in ${relativePath}`);
  }
  return unique;
}

/**
 * Every crawlable path, with dynamic segments expanded. Excludes the `*`
 * catch-all, which is the 404 and is handled separately.
 */
export function publicRoutes() {
  const routes = [];

  for (const pattern of routePatterns()) {
    if (pattern === "*") continue;

    if (!pattern.includes(":")) {
      routes.push(pattern);
      continue;
    }

    const source = DYNAMIC_SOURCES[pattern];
    if (!source) {
      throw new Error(
        `routes: dynamic route "${pattern}" has no slug source. ` +
          `Register it in DYNAMIC_SOURCES in scripts/lib/routes.mjs.`,
      );
    }

    const prefix = pattern.slice(0, pattern.indexOf(":"));
    for (const slug of readSlugs(source.file, source.label)) {
      routes.push(`${prefix}${slug}`);
    }
  }

  return [...new Set(routes)];
}
