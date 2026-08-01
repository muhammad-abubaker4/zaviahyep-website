import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Images, MapPin, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import Lightbox from "@/components/gallery/Lightbox";
import { findAlbum, galleryAlbums } from "@/data/galleryAlbums";
import { breadcrumbSchema, imageGallerySchema } from "@/lib/schema";

const GalleryAlbum = () => {
  const { slug } = useParams<{ slug: string }>();
  const album = slug ? findAlbum(slug) : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!album) return <Navigate to="/gallery" replace />;

  const position = galleryAlbums.findIndex((entry) => entry.slug === album.slug);
  const nextAlbum = galleryAlbums[(position + 1) % galleryAlbums.length];

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
      { name: album.title, path: `/gallery/${album.slug}` },
    ]),
    imageGallerySchema({
      name: album.title,
      description: album.summary,
      path: `/gallery/${album.slug}`,
      datePublished: album.date,
      images: album.photos.map((photo) => photo.src),
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={album.title}
        description={album.summary}
        path={`/gallery/${album.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-primary pb-12 pt-28 text-primary-foreground sm:pb-14 sm:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.08),_transparent_55%)]"
            aria-hidden
          />
          <div className="container relative mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {album.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-primary-foreground/65">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {album.dateLabel}
              </span>
              {album.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {album.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                {album.kind === "online" ? (
                  <Monitor className="h-4 w-4" aria-hidden />
                ) : (
                  <Images className="h-4 w-4" aria-hidden />
                )}
                {album.photos.length} photos
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              {album.summary}
            </p>
          </div>
        </section>

        <section className="section-padding relative bg-background">
          <div className="container relative px-4">
            <PhotoGrid
              photos={album.photos}
              onSelect={setLightboxIndex}
              layout={album.kind === "online" ? "uniform" : "masonry"}
            />
          </div>
        </section>

        {nextAlbum && nextAlbum.slug !== album.slug && (
          <section className="border-t border-border bg-muted py-12">
            <div className="container px-4">
              <Link
                to={`/gallery/${nextAlbum.slug}`}
                className="group mx-auto flex max-w-3xl items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Next album
                  </p>
                  <p className="mt-2 truncate text-lg font-bold tracking-tight text-foreground">
                    {nextAlbum.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {nextAlbum.dateLabel} · {nextAlbum.photos.length} photos
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <Lightbox
        photos={album.photos}
        index={lightboxIndex}
        label={album.title}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};

export default GalleryAlbum;
