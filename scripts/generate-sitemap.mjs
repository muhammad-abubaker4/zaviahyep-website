import fs from "node:fs";
import path from "node:path";
import { publicRoutes } from "./lib/routes.mjs";

/**
 * Builds public/sitemap.xml from the app's own route table so the URL list
 * cannot drift from the router. Previously this was hand-maintained XML, which
 * silently went stale every time an album or opportunity was added.
 *
 * Runs from `prebuild`, so the file is on disk before Vite copies public/.
 */

const ROOT = process.cwd();
const SITE_URL = "https://zaviah.org";
const OUT = path.join(ROOT, "public", "sitemap.xml");

/**
 * Crawl hints per path. Anything not listed falls back to DEFAULT_RANK, so a
 * new route still lands in the sitemap without needing an entry here.
 */
const DEFAULT_RANK = { changefreq: "monthly", priority: "0.7" };
const RANKS = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/get-involved": { changefreq: "weekly", priority: "0.95" },
  "/about": { changefreq: "monthly", priority: "0.9" },
  "/gallery": { changefreq: "weekly", priority: "0.9" },
  "/founder": { changefreq: "monthly", priority: "0.8" },
  "/co-founder": { changefreq: "monthly", priority: "0.8" },
  "/core-members": { changefreq: "monthly", priority: "0.8" },
  "/guest-speakers": { changefreq: "monthly", priority: "0.8" },
  "/partners": { changefreq: "monthly", priority: "0.8" },
  "/privacy": { changefreq: "yearly", priority: "0.4" },
  "/terms": { changefreq: "yearly", priority: "0.4" },
};

/**
 * Newest content change across the source tree. Build time would churn
 * `lastmod` on every deploy and teach crawlers to ignore it.
 */
function lastContentChange() {
  let newest = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else newest = Math.max(newest, fs.statSync(full).mtimeMs);
    }
  };
  walk(path.join(ROOT, "src"));
  return new Date(newest).toISOString().slice(0, 10);
}

const lastmod = lastContentChange();

function rankFor(route) {
  if (RANKS[route]) return RANKS[route];
  // Opportunity detail pages outrank the generic default; albums stay at 0.7.
  if (route.startsWith("/get-involved/")) return { changefreq: "monthly", priority: "0.9" };
  return DEFAULT_RANK;
}

const urls = publicRoutes().map((route) => ({ path: route, ...rankFor(route) }));

const body = urls
  .map(
    ({ path: route, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

fs.writeFileSync(
  OUT,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  "utf8",
);

console.log(`Wrote ${urls.length} URLs to ${path.relative(ROOT, OUT)} (lastmod ${lastmod})`);
