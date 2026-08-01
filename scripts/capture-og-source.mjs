/**
 * Re-shoots the hero screenshot that generate-og.mjs turns into the social
 * share card. Run this whenever the hero changes, otherwise link previews keep
 * advertising an old version of the site.
 *
 * Usage: start the app (npm run dev), then `npm run og:capture`.
 */
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE_URL = process.env.OG_CAPTURE_URL ?? "http://localhost:8080";
const OUT_PATH = path.join(process.cwd(), "src", "assets", "og-preview-screenshot.png");

// 1440x792 renders the real desktop layout; the 2x scale downsamples to a
// crisp 1920x1056, the size generate-og.mjs expects.
const VIEWPORT = { width: 1440, height: 792 };
const OUTPUT = { width: 1920, height: 1056 };

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  // Pins the carousel to the first slide and skips entry animations, so the
  // shot is identical every run instead of depending on timing.
  reducedMotion: "reduce",
});

// The chatbot widget has no place in a share card.
await page.route("**staging-cdn.progressarc.io**", (route) => route.abort());

await page.goto(BASE_URL, { waitUntil: "networkidle" });

await page.addStyleTag({
  content: `
    [aria-label="Chat on WhatsApp"],
    [aria-label="Scroll to top"],
    #progressarc-chat, .progressarc-widget { display: none !important; }
  `,
});

await page.waitForFunction(() => {
  const images = [...document.querySelectorAll("#hero img")];
  return images.length > 0 && images.every((img) => img.complete && img.naturalWidth > 0);
});
await page.waitForTimeout(600);

const buffer = await page.locator("#hero").screenshot();
await browser.close();

await sharp(buffer)
  .resize(OUTPUT.width, OUTPUT.height, { fit: "cover" })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(OUT_PATH);

console.log(`Captured ${OUT_PATH} at ${OUTPUT.width}x${OUTPUT.height}`);
