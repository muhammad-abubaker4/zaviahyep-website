import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeader from "@/components/SectionHeader";

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Moments"
          title="Our"
          highlight="Gallery"
          description="Snapshots from our sessions, events, and community gatherings."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
        >
          <GalleryGrid maxImages={6} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-soft"
          >
            Open full gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
