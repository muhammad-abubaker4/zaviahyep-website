import galleryHeroTop from "@/gallery/1.jpeg";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** WebP responsive srcset when available */
  srcSet?: string;
  sizes?: string;
};

function captionFromPath(path: string): string | undefined {
  const match = path.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return undefined;
  const [, year, month] = match;
  const monthName = new Date(Number(year), Number(month) - 1).toLocaleString("en", { month: "short" });
  return `Community moment — ${monthName} ${year}`;
}

function heroAltFromPath(path: string, index: number): string {
  const file = path.split("/").pop()?.toLowerCase() ?? "";
  if (file.includes("bg-1") || file.includes("bg-2") || file.startsWith("1.")) {
    return "Zaviah youth visiting the Khyber Pakhtunkhwa Assembly in Peshawar";
  }
  if (file.includes("00.51.26") || file.includes("00.51.27")) {
    return "Zaviah community members gathered at a youth empowerment session";
  }
  if (file.includes("00.53.30")) {
    return "Zaviah students and mentors during an educational visit";
  }
  return `Zaviah community highlight ${index + 1}`;
}

function galleryAltFromPath(path: string, index: number): string {
  const caption = captionFromPath(path);
  if (caption) return `Zaviah ${caption.toLowerCase()}`;
  const file = path.split("/").pop()?.toLowerCase() ?? "";
  if (file.startsWith("2.")) {
    return "Zaviah youth empowerment event photo";
  }
  return `Zaviah community gallery photo ${index + 1}`;
}

function basenameWithoutExt(filePath: string) {
  const file = filePath.split("/").pop() ?? "";
  return file.replace(/\.(jpe?g|png|webp)$/i, "");
}

function buildWebpSrcSet(
  jpegPath: string,
  webpModules: Record<string, string>,
  widths: number[],
): string | undefined {
  const base = basenameWithoutExt(jpegPath);
  const parts: string[] = [];
  for (const width of widths) {
    const match = Object.entries(webpModules).find(([modulePath]) =>
      modulePath.endsWith(`/${base}-${width}w.webp`),
    );
    if (match) parts.push(`${match[1]} ${width}w`);
  }
  return parts.length > 0 ? parts.join(", ") : undefined;
}

/** Full-width image at the top of the Gallery page (`src/gallery/1.jpeg`). */
export const galleryHeroImage: GalleryImage = {
  src: galleryHeroTop,
  alt: "Zaviah youth at an educational visit to the Khyber Pakhtunkhwa Assembly, Peshawar",
  sizes: "100vw",
};

const changingPicModules = import.meta.glob("../assets/Changing-pic/*.{jpeg,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const changingPicWebpModules = import.meta.glob("../assets/Changing-pic/*-*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** Hero background slideshow: every image in `src/assets/Changing-pic/`. */
export const heroBackgroundSlides: GalleryImage[] = Object.entries(changingPicModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    src,
    alt: heroAltFromPath(path, index),
    srcSet: buildWebpSrcSet(path, changingPicWebpModules, [960, 1600]),
    sizes: "(max-width: 1024px) 100vw, 58vw",
  }));

const galleryFolderModules = import.meta.glob("../assets/gallery/*.{jpeg,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const galleryWebpModules = import.meta.glob("../assets/gallery/*-*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** Masonry grid on Gallery page: all files in `src/assets/gallery/` except `1.jpeg` (reserved for hero). */
export const galleryGridImages: GalleryImage[] = Object.entries(galleryFolderModules)
  .filter(([path]) => !path.endsWith("/gallery/1.jpeg"))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    src,
    alt: galleryAltFromPath(path, index),
    caption: captionFromPath(path),
    srcSet: buildWebpSrcSet(path, galleryWebpModules, [640, 1280]),
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  }));
