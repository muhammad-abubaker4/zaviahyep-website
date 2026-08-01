import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/galleryAlbums";
import { cn } from "@/lib/utils";

type LightboxProps = {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  /** Shown above the counter, e.g. the album title. */
  label?: string;
};

const SWIPE_THRESHOLD = 48;

const Lightbox = ({ photos, index, onClose, onIndexChange, label }: LightboxProps) => {
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;
  const touchStartX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, go, onClose]);

  // Warm the neighbouring images so arrow navigation feels instant.
  useEffect(() => {
    if (index === null) return;
    for (const offset of [1, -1]) {
      const neighbour = photos[(index + offset + photos.length) % photos.length];
      if (!neighbour) continue;
      const preload = new Image();
      preload.sizes = "92vw";
      preload.srcset = neighbour.srcSet;
      preload.src = neighbour.src;
    }
  }, [index, photos]);

  if (!isOpen || !photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ? `${label} photo viewer` : "Photo viewer"}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <div className="min-w-0">
          {label && <p className="truncate text-sm font-semibold">{label}</p>}
          <p className="text-xs text-white/60" aria-live="polite">
            {index + 1} of {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-16">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:left-4 sm:p-3"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
        </button>

        <figure className="flex max-h-full flex-col items-center justify-center">
          <img
            key={photo.src}
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="92vw"
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            onLoad={() => setLoaded(true)}
            className={cn(
              "max-h-[72vh] w-auto max-w-full rounded-lg object-contain transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
          {photo.caption && (
            <figcaption className="mt-4 max-w-2xl px-4 text-center text-sm text-white/75">
              {photo.caption}
            </figcaption>
          )}
        </figure>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-4 sm:p-3"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
        </button>
      </div>

      <div className="hidden shrink-0 gap-2 overflow-x-auto px-6 py-4 sm:flex">
        {photos.map((thumb, thumbIndex) => (
          <button
            key={`${thumb.src}-${thumbIndex}`}
            type="button"
            onClick={() => onIndexChange(thumbIndex)}
            aria-label={`View photo ${thumbIndex + 1}`}
            aria-current={thumbIndex === index}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all",
              thumbIndex === index
                ? "ring-2 ring-white"
                : "opacity-50 hover:opacity-90",
            )}
          >
            <img
              src={thumb.src}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
