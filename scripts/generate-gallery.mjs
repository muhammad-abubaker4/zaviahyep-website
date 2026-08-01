import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Generates responsive WebP variants for every gallery photo plus a manifest of
 * intrinsic dimensions and blur placeholders. The manifest lets the grid reserve
 * the correct aspect ratio before an image loads, which is what keeps the masonry
 * layout from shifting.
 *
 * Run with `npm run gallery` after dropping new photos into an album folder.
 */

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, "src", "assets");
const MANIFEST = path.join(ROOT, "src", "data", "galleryManifest.json");

/** Album folders under src/assets that hold photos. */
const FOLDERS = ["gallery", "tahafuz-manzil", "sessions"];

/**
 * Must stay in sync with the glob in src/data/galleryAlbums.ts. Any other
 * width generated here is emitted to disk but never imported, so it becomes
 * dead weight in the repo.
 */
const WIDTHS = [640, 1280, 1920];
const SOURCE_RE = /\.(jpe?g|png)$/i;
const VARIANT_RE = /-\d+w\.(webp|jpg)$/i;

async function blurPlaceholder(file) {
  const buffer = await sharp(file)
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function processFolder(folder) {
  const dir = path.join(ASSETS, folder);
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    console.warn(`Skipping ${folder}: folder not found`);
    return [];
  }

  const sources = entries.filter((f) => SOURCE_RE.test(f) && !VARIANT_RE.test(f)).sort();
  const records = [];

  for (const name of sources) {
    const file = path.join(dir, name);
    const image = sharp(file);
    const { width, height } = await image.metadata();
    const base = name.replace(SOURCE_RE, "");

    for (const target of WIDTHS) {
      // Never upscale: a 1280px screenshot gains nothing from a 1920w variant.
      if (width < target && target !== WIDTHS[0]) continue;
      const out = path.join(dir, `${base}-${target}w.webp`);
      try {
        await fs.access(out);
        continue;
      } catch {
        // not generated yet
      }
      await sharp(file)
        .resize({ width: Math.min(target, width), withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(out);
    }

    records.push({
      folder,
      file: name,
      width,
      height,
      blur: await blurPlaceholder(file),
    });
  }

  /**
   * Sweep variants this script no longer produces: wrong width (earlier versions
   * emitted arbitrary widths and a JPEG fallback per photo), or orphaned because
   * the source photo was deleted. The glob in galleryAlbums.ts is width-based,
   * so any leftover variant still gets bundled even with no source behind it.
   */
  const keep = new Set(WIDTHS.map((w) => `${w}w.webp`));
  const sourceBases = new Set(sources.map((name) => name.replace(SOURCE_RE, "")));
  let removed = 0;
  for (const name of entries) {
    const variant = name.match(/^(.*)-(\d+w\.(?:webp|jpg))$/i);
    if (!variant) continue;
    const [, base, suffix] = variant;
    if (keep.has(suffix.toLowerCase()) && sourceBases.has(base)) continue;
    await fs.unlink(path.join(dir, name));
    removed += 1;
  }

  console.log(`${folder}: ${records.length} photos${removed ? `, pruned ${removed} stale variants` : ""}`);
  return records;
}

const all = [];
for (const folder of FOLDERS) {
  all.push(...(await processFolder(folder)));
}

const manifest = {};
for (const record of all) {
  manifest[`${record.folder}/${record.file}`] = {
    width: record.width,
    height: record.height,
    blur: record.blur,
  };
}

await fs.writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${Object.keys(manifest).length} entries to ${path.relative(ROOT, MANIFEST)}`);
