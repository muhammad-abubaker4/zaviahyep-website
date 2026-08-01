import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "src", "assets", "og-preview-screenshot.png");
const ASSETS_DIR = path.join(ROOT, "public", "assets");
// og-share.jpg is what the meta tags point at. The other two are legacy paths
// that are already public URLs, so they get refreshed rather than left stale.
const OUTPUTS = [
  path.join(ASSETS_DIR, "og-share.jpg"),
  path.join(ROOT, "public", "og-image.jpg"),
  path.join(ROOT, "public", "og-preview.jpg"),
];

// Anchored to the top: the source is taller than the 1.91:1 card, and a centred
// crop shaves the navbar off. Trimming the empty space below the hero instead.
const resized = sharp(SOURCE_PATH).resize(1200, 630, {
  fit: "cover",
  position: "top",
});

await fs.mkdir(ASSETS_DIR, { recursive: true });

const jpeg = resized.clone().jpeg({ quality: 86, progressive: true, mozjpeg: true });

for (const output of OUTPUTS) {
  await jpeg.toFile(output);
  console.log(`Generated ${output}`);
}
