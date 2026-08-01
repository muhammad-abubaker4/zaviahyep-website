import { chromium } from "playwright";

/**
 * Smoke-tests every route against a production preview: console errors, failed
 * network requests, broken images, missing alt text and dead internal links.
 *
 * Usage: npx vite preview --port 4173, then `node scripts/check-routes.mjs`.
 */

const BASE = process.env.BASE_URL ?? "http://localhost:4173";

const ROUTES = [
  "/",
  "/about",
  "/gallery",
  "/gallery/tahafuz-manzil",
  "/gallery/kp-assembly-visit",
  "/gallery/online-sessions",
  "/get-involved",
  "/get-involved/member",
  "/get-involved/volunteer",
  "/get-involved/mentor",
  "/get-involved/ambassador",
  "/get-involved/core-team",
  "/get-involved/partnerships",
  "/founder",
  "/co-founder",
  "/core-members",
  "/guest-speakers",
  "/partners",
  "/privacy",
  "/terms",
  "/this-route-does-not-exist",
];

const browser = await chromium.launch({ channel: "chrome" });
const results = [];
const internalLinks = new Set();

for (const route of ROUTES) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`);
  });

  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Scroll through so lazy sections mount and lazy images request.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  const audit = await page.evaluate(() => {
    const images = [...document.images];
    return {
      title: document.title,
      h1: document.querySelectorAll("h1").length,
      images: images.length,
      broken: images
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
      missingAlt: images.filter((img) => !img.hasAttribute("alt")).length,
      links: [...document.querySelectorAll("a[href]")]
        .map((a) => a.getAttribute("href"))
        .filter((href) => href && href.startsWith("/")),
      hasMain: Boolean(document.getElementById("main-content")),
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  audit.links.forEach((l) => internalLinks.add(l.split("#")[0]));

  results.push({ route, consoleErrors, failedRequests, ...audit });
  await context.close();
}

await browser.close();

let failures = 0;
console.log("route".padEnd(36) + "imgs  h1  errors  failed  broken  noalt");
for (const r of results) {
  const bad =
    r.consoleErrors.length || r.failedRequests.length || r.broken.length || r.missingAlt || !r.title;
  if (bad) failures += 1;
  console.log(
    (bad ? "✗ " : "✓ ") +
      r.route.padEnd(34) +
      String(r.images).padStart(4) +
      String(r.h1).padStart(4) +
      String(r.consoleErrors.length).padStart(8) +
      String(r.failedRequests.length).padStart(8) +
      String(r.broken.length).padStart(8) +
      String(r.missingAlt).padStart(7) +
      (r.overflow ? "  H-OVERFLOW" : ""),
  );
  r.consoleErrors.slice(0, 3).forEach((e) => console.log("      console: " + e.slice(0, 160)));
  r.failedRequests.slice(0, 3).forEach((e) => console.log("      request: " + e.slice(0, 160)));
  r.broken.slice(0, 3).forEach((e) => console.log("      broken img: " + e.slice(0, 160)));
}

const unknown = [...internalLinks].filter(
  (l) => !ROUTES.includes(l) && !l.startsWith("/docs/") && !l.startsWith("/assets/"),
);
console.log("\nlinked internal paths not covered by ROUTES:", unknown.length ? unknown : "none");
console.log(failures === 0 ? "\nALL ROUTES CLEAN" : `\n${failures} route(s) with problems`);
process.exit(failures === 0 ? 0 : 1);
