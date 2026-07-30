import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryGridImages, type GalleryImage } from "@/data/galleryImages";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type GalleryGridProps = {
  /** When set, only the first N images are shown (homepage preview). */
  maxImages?: number;
};

const GalleryGrid = ({ maxImages }: GalleryGridProps) => {
  const images: GalleryImage[] =
    typeof maxImages === "number" && maxImages > 0
      ? galleryGridImages.slice(0, maxImages)
      : galleryGridImages;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length,
        );
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((current) =>
          current === null ? current : (current + 1) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {images.map((img, index) => (
          <motion.button
            key={`${img.src}-${index}`}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-soft text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`View ${img.alt}`}
          >
            <picture>
              {img.srcSet ? <source type="image/webp" srcSet={img.srcSet} sizes={img.sizes} /> : null}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                sizes={img.sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              />
            </picture>
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium text-white">{img.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent className="max-w-5xl border-none bg-black/95 p-2 sm:p-4 [&>button]:text-white [&>button]:hover:text-white/80">
          <DialogTitle className="sr-only">
            {activeImage?.alt ?? "Gallery image"}
          </DialogTitle>
          {activeImage && lightboxIndex !== null && (
            <div className="relative flex flex-col items-center">
              <picture>
                {activeImage.srcSet ? (
                  <source type="image/webp" srcSet={activeImage.srcSet} sizes="90vw" />
                ) : null}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[75vh] w-full rounded-lg object-contain"
                />
              </picture>
              {activeImage.caption && (
                <p className="mt-3 text-center text-sm text-white/80">{activeImage.caption}</p>
              )}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <span className="text-sm text-white/70" aria-live="polite">
                  {lightboxIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
