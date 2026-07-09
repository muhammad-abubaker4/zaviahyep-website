import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "src", "assets", "og-preview-screenshot.png");
const JPG_PATH = path.join(ROOT, "public", "og-image.jpg");
const PNG_PATH = path.join(ROOT, "public", "og-preview.png");

const resized = sharp(SOURCE_PATH).resize(1200, 630, {
  fit: "cover",
  position: "centre",
});

await resized.clone().jpeg({ quality: 86, progressive: true, mozjpeg: true }).toFile(JPG_PATH);
await resized
  .clone()
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(PNG_PATH);

console.log(`Generated ${JPG_PATH} and ${PNG_PATH}`);
