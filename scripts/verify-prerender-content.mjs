import fs from "node:fs";
import path from "node:path";
import { publicRoutes } from "./lib/routes.mjs";

/**
 * Post-build Soft-404 guard. Reads dist HTML for every sitemap/public route and
 * asserts crawlers receive real page bodies (not empty #root shells).
 *
 * Run: node scripts/verify-prerender-content.mjs
 * (also invoked at the end of a successful prerender when wired from package.json)
 */

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://zaviah.org";

function readRouteHtml(route) {
  const file =
    route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`);
  if (!fs.existsSync(file)) return { file, missing: true, html: "" };
  return { file, missing: false, html: fs.readFileSync(file, "utf8") };
}

const problems = [];
const rows = [];

for (const route of publicRoutes()) {
  const { file, missing, html } = readRouteHtml(route);
  const expectedCanonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;

  if (missing) {
    problems.push(`${route}: missing ${path.relative(ROOT, file)}`);
    continue;
  }

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? "";
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  const rootMatch = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i);
  const rootHtml = rootMatch?.[1] ?? "";
  const hasH1 = /<h1[\s>]/i.test(html);
  const thin = rootHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length < 80;
  const soft404Shell = rootHtml.trim().length === 0;
  const looksLike404 = /page not found/i.test(rootHtml);

  if (!title) problems.push(`${route}: missing title`);
  if (!description) problems.push(`${route}: missing description`);
  if (canonical !== expectedCanonical) {
    problems.push(`${route}: canonical ${canonical} != ${expectedCanonical}`);
  }
  if (/noindex/i.test(robots)) problems.push(`${route}: unexpected noindex`);
  if (soft404Shell) problems.push(`${route}: empty #root (Soft 404 shell)`);
  if (!hasH1) problems.push(`${route}: missing <h1> in prerendered HTML`);
  if (thin) problems.push(`${route}: body text too thin for indexing`);
  if (looksLike404) problems.push(`${route}: body looks like 404 template`);

  // Invisible motion leftovers — Soft 404 risk even with text in the DOM.
  const opacityZeros = (html.match(/opacity:\s*0/gi) || []).length;
  if (opacityZeros > 5) {
    // Allow a few decorative cases; fail when primary content is clearly hidden.
    const rootMatch = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i);
    const root = rootMatch?.[1] ?? "";
    // Rough: if more than half of substantial text nodes sit under opacity:0 ancestors,
    // the verifier already catches thin visible content via a simpler heuristic below.
    const hiddenHeavy = opacityZeros >= 8 && root.length > 1000;
    if (hiddenHeavy) {
      problems.push(
        `${route}: ${opacityZeros} opacity:0 styles remain in prerendered HTML (crawler-invisible)`,
      );
    }
  }
  rows.push({
    route,
    title,
    canonical,
    rootChars: rootHtml.length,
    hasH1,
  });
}

const notFound = path.join(DIST, "404.html");
if (!fs.existsSync(notFound)) {
  problems.push("missing dist/404.html");
} else {
  const html = fs.readFileSync(notFound, "utf8");
  if (!/noindex/i.test(html)) problems.push("404.html should be noindex");
  if (/rel="canonical"/i.test(html)) problems.push("404.html must not declare a canonical");
  if (!/<h1[\s>]/i.test(html)) problems.push("404.html missing <h1>");
}

console.log("Prerender content verification:");
for (const row of rows) {
  console.log(
    `  ${row.route.padEnd(32)} h1=${row.hasH1 ? "yes" : "NO "} body=${String(row.rootChars).padStart(6)}  ${row.title}`,
  );
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`\nOK — ${rows.length} public routes have non-empty prerendered bodies.`);
