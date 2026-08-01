import manifest from "@/data/galleryManifest.json";

export type AlbumCategory = "Educational Visits" | "Community Outreach" | "Online Sessions";

export type GalleryPhoto = {
  /** Original source filename, stable across builds unlike the hashed `src`. */
  id: string;
  /** Largest generated WebP variant, used as the plain `src`. */
  src: string;
  srcSet: string;
  width: number;
  height: number;
  blur?: string;
  alt: string;
  caption?: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  category: AlbumCategory;
  /** ISO date, used for sorting and schema.org */
  date: string;
  dateLabel: string;
  location?: string;
  summary: string;
  /** On-ground photography vs screen captures from online sessions. */
  kind: "onground" | "online";
  /**
   * Pins this album to the spotlight. Set explicitly rather than by date, because
   * the ongoing sessions album would otherwise always sort newest and win.
   */
  featured?: boolean;
  cover: GalleryPhoto;
  photos: GalleryPhoto[];
};

type ManifestEntry = { width: number; height: number; blur?: string };
const dimensions = manifest as Record<string, ManifestEntry>;

/**
 * Only the generated WebP variants are imported, never the original camera
 * files. Keeping originals out of the graph is what stops the build from
 * emitting a full-size copy of every photo. The explicit width list matters
 * too: a looser `*-*w.webp` pattern would pull in every stray width left
 * behind by older runs of the generator and ship them unused.
 */
const webpModules = {
  gallery: import.meta.glob("../assets/gallery/*-{640,1280,1920}w.webp", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  "tahafuz-manzil": import.meta.glob("../assets/tahafuz-manzil/*-{640,1280,1920}w.webp", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
  sessions: import.meta.glob("../assets/sessions/*-{640,1280,1920}w.webp", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
};

type Folder = keyof typeof webpModules;

type Variants = Array<{ width: number; url: string }>;

/**
 * Groups the flat glob result by photo. Portrait shots narrower than 1280px
 * only ever get a 640w variant, so the largest available width — not a fixed
 * one — has to become the `src`.
 */
function variantsByBase(folder: Folder): Map<string, Variants> {
  const grouped = new Map<string, Variants>();
  for (const [modulePath, url] of Object.entries(webpModules[folder])) {
    const name = modulePath.split("/").pop() ?? "";
    const match = name.match(/^(.*)-(\d+)w\.webp$/);
    if (!match) continue;
    const [, base, width] = match;
    const list = grouped.get(base) ?? [];
    list.push({ width: Number(width), url });
    grouped.set(base, list);
  }
  for (const list of grouped.values()) list.sort((a, b) => a.width - b.width);
  return grouped;
}

type AlbumSpec = Omit<GalleryAlbum, "cover" | "photos"> & {
  folder: Folder;
  /** Filename used as the album cover, also promoted to first position. */
  coverFile: string;
  /** Photo alt text template; `n` is the 1-based position. */
  altFor: (n: number, total: number) => string;
  /** Optional captions for notable photos, keyed by filename. */
  captions?: Record<string, string>;
};

const albumSpecs: AlbumSpec[] = [
  {
    slug: "tahafuz-manzil",
    title: "Tahafuz Manzil Foster Home",
    category: "Community Outreach",
    date: "2026-07-25",
    dateLabel: "25 July 2026",
    location: "Lahore",
    featured: true,
    summary:
      "Zaviah visited Tahafuz Manzil Foster Home to celebrate our first year of impact alongside the children who remind us why this work matters. An afternoon of games, conversation, and a cake cut together.",
    kind: "onground",
    folder: "tahafuz-manzil",
    coverFile: "WhatsApp Image 2026-07-31 at 22.12.58.jpeg",
    altFor: (n, total) =>
      `Zaviah team and children at Tahafuz Manzil Foster Home celebrating one year of impact, photo ${n} of ${total}`,
    captions: {
      "WhatsApp Image 2026-07-31 at 22.12.58.jpeg":
        "The Zaviah team with the children of Tahafuz Manzil",
      "WhatsApp Image 2026-07-31 at 22.14.09.jpeg": "One year of impact, marked together",
    },
  },
  {
    slug: "kp-assembly-visit",
    title: "Educational Visit to Khyber Pakhtunkhwa Assembly",
    category: "Educational Visits",
    date: "2026-03-30",
    dateLabel: "30 March 2026",
    location: "Peshawar",
    summary:
      "Students stepped inside the Khyber Pakhtunkhwa Provincial Assembly in Peshawar to see how legislation is debated and passed, turning civics from a textbook chapter into something they had stood in the middle of.",
    kind: "onground",
    folder: "gallery",
    coverFile: "1.jpeg",
    altFor: (n, total) =>
      `Zaviah students during the educational visit to the Khyber Pakhtunkhwa Assembly in Peshawar, photo ${n} of ${total}`,
  },
  {
    slug: "online-sessions",
    title: "Online Mentorship Sessions",
    category: "Online Sessions",
    date: "2026-07-30",
    dateLabel: "Ongoing",
    summary:
      "Our mentorship runs live and online, which means a student in any city can join. These are glimpses from sessions on careers, confidence, and self development, hosted with mentors and partner organizations.",
    kind: "online",
    folder: "sessions",
    coverFile: "WhatsApp Image 2026-07-31 at 22.29.15.jpeg",
    altFor: (n, total) => `Glimpse from a live Zaviah online mentorship session, photo ${n} of ${total}`,
  },
];

function buildAlbum(spec: AlbumSpec): GalleryAlbum {
  const grouped = variantsByBase(spec.folder);

  /** Variants are named `<base>-<width>w.webp`; the manifest keys the original. */
  const originalByBase = new Map<string, string>();
  for (const key of Object.keys(dimensions)) {
    const [folder, file] = [key.slice(0, key.indexOf("/")), key.slice(key.indexOf("/") + 1)];
    if (folder !== spec.folder) continue;
    originalByBase.set(file.replace(/\.(jpe?g|png)$/i, ""), file);
  }

  type Entry = { variants: Variants; file: string };
  const entries: Entry[] = [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([base, variants]) => ({ variants, file: originalByBase.get(base) ?? base }))
    .filter((entry) => dimensions[`${spec.folder}/${entry.file}`]);

  const ordered = [
    ...entries.filter((entry) => entry.file === spec.coverFile),
    ...entries.filter((entry) => entry.file !== spec.coverFile),
  ];

  const total = ordered.length;
  const photos: GalleryPhoto[] = ordered.map((entry, index) => {
    const dims = dimensions[`${spec.folder}/${entry.file}`];
    const largest = entry.variants[entry.variants.length - 1];
    return {
      id: entry.file,
      src: largest.url,
      srcSet: entry.variants.map((v) => `${v.url} ${v.width}w`).join(", "),
      width: dims?.width ?? 1600,
      height: dims?.height ?? 1200,
      blur: dims?.blur,
      alt: spec.altFor(index + 1, total),
      caption: spec.captions?.[entry.file],
    };
  });

  return {
    slug: spec.slug,
    title: spec.title,
    category: spec.category,
    date: spec.date,
    dateLabel: spec.dateLabel,
    location: spec.location,
    summary: spec.summary,
    kind: spec.kind,
    featured: spec.featured,
    cover: photos[0],
    photos,
  };
}

/** Newest first. */
export const galleryAlbums: GalleryAlbum[] = albumSpecs
  .map(buildAlbum)
  .filter((album) => album.photos.length > 0)
  .sort((a, b) => b.date.localeCompare(a.date));

/** The album given spotlight treatment at the top of the Gallery page. */
export const featuredAlbum: GalleryAlbum | undefined =
  galleryAlbums.find((album) => album.featured) ?? galleryAlbums[0];

export const otherAlbums: GalleryAlbum[] = galleryAlbums.filter(
  (album) => album.slug !== featuredAlbum?.slug,
);

export const albumCategories: AlbumCategory[] = Array.from(
  new Set(galleryAlbums.map((album) => album.category)),
);

export function findAlbum(slug: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.slug === slug);
}

export const galleryTotals = {
  albums: galleryAlbums.length,
  photos: galleryAlbums.reduce((sum, album) => sum + album.photos.length, 0),
  onlineSessions: galleryAlbums
    .filter((album) => album.kind === "online")
    .reduce((sum, album) => sum + album.photos.length, 0),
};

