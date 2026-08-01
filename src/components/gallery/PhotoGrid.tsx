import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { GalleryPhoto } from "@/data/galleryAlbums";
import { cn } from "@/lib/utils";

type PhotoGridProps = {
  photos: GalleryPhoto[];
  onSelect: (index: number) => void;
  /**
   * masonry preserves each photo's own aspect ratio (mixed portrait/landscape sets).
   * uniform crops to a fixed ratio, which suits screen captures that share one shape.
   */
  layout?: "masonry" | "uniform";
};

const PhotoTile = ({
  photo,
  index,
  onSelect,
  layout,
}: {
  photo: GalleryPhoto;
  index: number;
  onSelect: (index: number) => void;
  layout: "masonry" | "uniform";
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`View ${photo.alt}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted text-left shadow-soft",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        layout === "masonry" ? "mb-4 break-inside-avoid sm:mb-5" : "aspect-[16/10]",
      )}
      style={
        layout === "masonry"
          ? { aspectRatio: `${photo.width} / ${photo.height}` }
          : undefined
      }
    >
      {photo.blur && !loaded && (
        <img
          src={photo.blur}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        />
      )}
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={index < 6 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center transition-all duration-500",
          "group-hover:scale-[1.04]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute right-3 top-3 rounded-full bg-black/45 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" aria-hidden />
      </span>
      {photo.caption && (
        <p className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {photo.caption}
        </p>
      )}
    </button>
  );
};

const PhotoGrid = ({ photos, onSelect, layout = "masonry" }: PhotoGridProps) => (
  <div
    className={cn(
      layout === "masonry"
        ? "columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",
    )}
  >
    {photos.map((photo, index) => (
      <PhotoTile
        key={`${photo.src}-${index}`}
        photo={photo}
        index={index}
        onSelect={onSelect}
        layout={layout}
      />
    ))}
  </div>
);

export default PhotoGrid;
