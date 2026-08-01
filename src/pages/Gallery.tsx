import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import AlbumCard from "@/components/gallery/AlbumCard";
import AlbumSpotlight from "@/components/gallery/AlbumSpotlight";
import {
  albumCategories,
  featuredAlbum,
  galleryAlbums,
  galleryTotals,
  otherAlbums,
  type AlbumCategory,
} from "@/data/galleryAlbums";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const galleryJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
]);

type Filter = AlbumCategory | "All";

const Gallery = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filters: Filter[] = useMemo(() => ["All", ...albumCategories], []);

  const visibleAlbums = useMemo(() => {
    const pool = filter === "All" ? otherAlbums : galleryAlbums;
    return filter === "All" ? pool : pool.filter((album) => album.category === filter);
  }, [filter]);

  const showSpotlight = filter === "All" && featuredAlbum;

  const stats = [
    { value: galleryTotals.albums, label: "Albums" },
    { value: galleryTotals.photos, label: "Moments captured" },
    { value: galleryTotals.onlineSessions, label: "Session glimpses" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Gallery"
        description="Photo albums from Zaviah events, educational visits, community outreach, and live online mentorship sessions across Pakistan."
        path="/gallery"
        jsonLd={galleryJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-primary pb-14 pt-28 text-primary-foreground sm:pb-16 sm:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.08),_transparent_55%)]"
            aria-hidden
          />
          <div className="container relative mx-auto max-w-3xl px-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">
              Community
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Gallery</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/70 sm:text-base">
              Every visit, session, and celebration, grouped into albums so you can follow the story
              rather than scroll a wall of photos.
            </p>

            <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-4"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold sm:text-3xl">{stat.value}</span>
                    <span className="mt-1 block text-[11px] leading-tight text-primary-foreground/60">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section-padding relative bg-background">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="container relative px-4">
            {showSpotlight && <AlbumSpotlight album={featuredAlbum} />}

            <div
              className={cn("flex flex-wrap justify-center gap-2", showSpotlight ? "mt-14" : "mt-0")}
              role="group"
              aria-label="Filter albums by category"
            >
              {filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={filter === option}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                    filter === option
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <m.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition()}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleAlbums.map((album) => (
                <AlbumCard key={album.slug} album={album} />
              ))}
            </m.div>

            {visibleAlbums.length === 0 && (
              <p className="mt-12 text-center text-sm text-muted-foreground">
                No albums in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
