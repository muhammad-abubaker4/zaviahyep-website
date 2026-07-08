import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, FileDown, Sparkles } from "lucide-react";
import { ORG_PROFILE_PDF } from "@/lib/constants";
import { scrollToHashWhenReady } from "@/lib/scroll";
import { heroBackgroundSlides } from "@/data/galleryImages";
import { cn } from "@/lib/utils";

const scrollToApply = () => scrollToHashWhenReady("#apply");
const scrollToAbout = () => scrollToHashWhenReady("#about");

const heroSlides =
  heroBackgroundSlides.length > 0
    ? heroBackgroundSlides
    : [{ src: "/og-preview.jpg", alt: "Zaviah community" }];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-mesh-dark text-primary-foreground"
    >
      <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-foreground/[0.03] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl"
        style={{ animation: prefersReducedMotion ? undefined : "pulse-glow 6s ease-in-out infinite" }}
        aria-hidden
      />

      <div className="container relative z-10 flex min-h-screen flex-col justify-center px-4 pb-24 pt-28 md:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground/70" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/75 sm:text-xs">
                Youth Empowerment Platform
              </span>
            </div>

            <h1 className="display-hero mb-8 text-balance">
              <span className="block">Empowering</span>
              <span className="block text-primary-foreground/50">the Next</span>
              <span className="relative mt-1 inline-block">
                Generation
                <span
                  className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-primary-foreground/25"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="mb-10 max-w-lg text-base leading-[1.7] text-primary-foreground/65 sm:text-lg md:text-xl">
              Connecting students across Pakistan with mentors, workshops, and real opportunities to
              learn, lead, and grow.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={scrollToApply} className="btn-primary-modern">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button type="button" onClick={scrollToAbout} className="btn-ghost-modern">
                Explore Zaviah
              </button>
            </div>

            <a
              href={ORG_PROFILE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-sm text-primary-foreground/50 transition-colors hover:text-primary-foreground/80"
            >
              <FileDown className="h-4 w-4" />
              Organization Profile 2026
            </a>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-3xl bg-primary-foreground/[0.04] ring-1 ring-primary-foreground/15 shadow-lift">
              <div className="relative aspect-[16/9] min-h-[360px] overflow-hidden bg-primary sm:min-h-[420px] lg:min-h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroSlides[activeIndex].src}
                    src={heroSlides[activeIndex].src}
                    alt={heroSlides[activeIndex].alt}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                    Zaviah in action
                  </p>
                  <p className="mt-2 text-lg font-bold tracking-tight text-primary-foreground sm:text-xl">
                    Educational Visit to Khyber Pakhtunkhwa Assembly, Peshawar
                  </p>
                </div>
              </div>

              {heroSlides.length > 1 && (
                <div className="flex items-center justify-center gap-2 bg-primary px-2 py-4">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "w-8 bg-primary-foreground"
                          : "w-1.5 bg-primary-foreground/30 hover:bg-primary-foreground/50",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground/35">
          Scroll
        </span>
        <div className="flex h-11 w-6 justify-center rounded-full border border-primary-foreground/25 p-1">
          {prefersReducedMotion ? (
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-foreground/40" />
          ) : (
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary-foreground/50"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
