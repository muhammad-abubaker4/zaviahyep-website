import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PATH = path.join(ROOT, "src", "assets", "og-preview-screenshot.png");
const OUT_PATH = path.join(ROOT, "public", "og-preview.png");

await sharp(SOURCE_PATH)
  .resize(1200, 630, {
    fit: "cover",
    position: "centre",
  })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(OUT_PATH);

console.log(`Generated ${OUT_PATH} from ${SOURCE_PATH}`);
