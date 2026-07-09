import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "src", "assets", "og-preview-screenshot.png");
const ASSETS_DIR = path.join(ROOT, "public", "assets");
const JPG_PATH = path.join(ASSETS_DIR, "og-share.jpg");
const ROOT_JPG_PATH = path.join(ROOT, "public", "og-image.jpg");

const resized = sharp(SOURCE_PATH).resize(1200, 630, {
  fit: "cover",
  position: "centre",
});

await fs.mkdir(ASSETS_DIR, { recursive: true });

const jpeg = resized.clone().jpeg({ quality: 86, progressive: true, mozjpeg: true });

await jpeg.toFile(JPG_PATH);
await jpeg.toFile(ROOT_JPG_PATH);

console.log(`Generated ${JPG_PATH} and ${ROOT_JPG_PATH}`);
