import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { ArrowRight, Calendar, Images, MapPin } from "lucide-react";
import type { GalleryAlbum } from "@/data/galleryAlbums";

/** Large editorial treatment for the album pinned as featured. */
const AlbumSpotlight = ({ album }: { album: GalleryAlbum }) => {
  const stackPreview = album.photos.slice(1, 4);

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={revealTransition()}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift lg:grid lg:grid-cols-2"
    >
      <Link
        to={`/gallery/${album.slug}`}
        className="relative block aspect-[16/11] overflow-hidden bg-muted lg:aspect-auto lg:h-full"
        aria-label={`View ${album.title} album`}
      >
        {album.cover.blur && (
          <img
            src={album.cover.blur}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
          />
        )}
        <img
          src={album.cover.src}
          srcSet={album.cover.srcSet}
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt={album.cover.alt}
          width={album.cover.width}
          height={album.cover.height}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Featured
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {album.title}
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
            <Images className="h-4 w-4" aria-hidden />
            {album.photos.length} photos
          </span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {album.summary}
        </p>

        {stackPreview.length > 0 && (
          <div className="mt-7 flex items-center gap-3">
            <div className="flex">
              {stackPreview.map((photo, index) => (
                <img
                  key={photo.src}
                  src={photo.blur ?? photo.src}
                  alt=""
                  aria-hidden
                  className="h-12 w-12 rounded-xl border-2 border-card object-cover shadow-soft"
                  style={{ marginLeft: index === 0 ? 0 : "-0.75rem" }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              +{Math.max(album.photos.length - stackPreview.length, 0)} more
            </span>
          </div>
        )}

        <Link
          to={`/gallery/${album.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          View the album
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </m.article>
  );
};

export default AlbumSpotlight;
