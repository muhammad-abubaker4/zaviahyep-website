import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { motion } from "framer-motion";
import { galleryHeroImage } from "@/data/galleryImages";
import GalleryGrid from "@/components/GalleryGrid";
import { breadcrumbSchema } from "@/lib/schema";

const galleryJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
]);

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Gallery"
        description="Photos from Zaviah events, mentorship sessions, and youth programs across Pakistan."
        path="/gallery"
        jsonLd={galleryJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
      <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 mx-auto max-w-[1920px]">
          <img
            src={galleryHeroImage.src}
            alt={galleryHeroImage.alt}
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/55 via-primary/45 to-accent/30" />
        <div className="relative z-10 flex min-h-[85vh] w-full max-w-[1920px] flex-col items-center justify-center px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <GalleryGrid />
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
