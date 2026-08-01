import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { DURATION, revealTransition } from "@/lib/motion";
import { ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { CORE_PILLARS } from "@/data/pillars";
import { GET_INVOLVED_PATH } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SLIDE_DURATION_MS = 5000;
const HERO_SIZES = "(max-width: 1024px) 100vw, 62vw";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-x-clip bg-mesh-dark text-primary-foreground"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="bg-dot-grid-dark absolute inset-0 opacity-60" />
        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-foreground/[0.03] blur-3xl" />
        <div
          className="absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl"
          style={{ animation: prefersReducedMotion ? undefined : "pulse-glow 6s ease-in-out infinite" }}
        />
      </div>

      <div className="container relative z-10 flex min-h-[100dvh] w-full min-w-0 flex-col justify-center pb-20 pt-[5.75rem] sm:pb-24 sm:pt-28 md:pt-32">
        <div className="grid w-full min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0, DURATION.hero)}
            className="min-w-0 lg:col-span-5"
          >
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3 py-1.5 backdrop-blur-md sm:mb-8 sm:gap-2.5 sm:px-4 sm:py-2">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary-foreground/70" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/75 sm:text-xs sm:tracking-[0.22em]">
                Youth Empowerment Platform
              </span>
            </div>

            <h1 className="display-hero mb-6 text-balance sm:mb-8">
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

            <p className="mb-8 max-w-lg text-[0.95rem] leading-[1.7] text-primary-foreground/65 sm:mb-10 sm:text-lg md:text-xl">
              Connecting students across Pakistan with mentors, workshops, and real opportunities to
              learn, lead, and grow.
            </p>

            <Link to={GET_INVOLVED_PATH} className="btn-primary-modern shrink-0">
              Get Involved
              <ArrowRight className="ml-2 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            </Link>

            <ul className="mt-9 flex max-w-lg flex-wrap items-center gap-y-2 sm:mt-11">
              {CORE_PILLARS.map((pillar, index) => (
                <li
                  key={pillar.title}
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/45 sm:text-xs sm:tracking-[0.2em]",
                    index > 0 &&
                      "ml-4 border-l border-primary-foreground/20 pl-4 sm:ml-6 sm:pl-6",
                  )}
                >
                  {pillar.title}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition(0.12, DURATION.hero)}
            className="min-w-0 w-full lg:col-span-7"
          >
            {/*
              On large screens the panel bleeds past the container to the viewport
              edge, which buys width without narrowing the headline column or
              making the frame taller.
            */}
            {/*
              width must stay auto here: with an explicit 100% the box is
              over-constrained and the browser throws the negative margin away,
              so the panel never widens at all.
            */}
            <div className="relative w-auto overflow-hidden rounded-2xl bg-primary-foreground/[0.04] ring-1 ring-primary-foreground/15 shadow-lift mr-[calc(var(--hero-to-nav-edge)*-1)] sm:rounded-3xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-primary sm:aspect-auto sm:h-[420px] lg:h-[520px]">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeSlide.src}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    transition={revealTransition(0, DURATION.hero)}
                    className="absolute inset-0"
                  >
                    <img
                      src={activeSlide.src}
                      srcSet={activeSlide.srcSet}
                      sizes={HERO_SIZES}
                      alt={activeSlide.alt}
                      width={activeSlide.width}
                      height={activeSlide.height}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      decoding="async"
                      loading="eager"
                      fetchPriority={activeIndex === 0 ? "high" : "auto"}
                    />
                  </m.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                <Link
                  to={`/gallery/${activeSlide.albumSlug}`}
                  className="absolute inset-x-0 bottom-0 block p-4 pb-7 sm:p-8 sm:pb-10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                    Zaviah in action
                  </p>
                  <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 sm:mt-2">
                    <span className="text-sm font-bold leading-snug tracking-tight text-primary-foreground sm:text-lg md:text-xl">
                      {activeSlide.albumTitle}
                      <ArrowUpRight className="ml-1.5 inline h-4 w-4 align-baseline text-primary-foreground/70" aria-hidden />
                    </span>
                    {activeSlide.albumLocation && (
                      <span className="inline-flex items-center gap-1 text-xs text-primary-foreground/65 sm:text-sm">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {activeSlide.albumLocation}
                      </span>
                    )}
                  </span>
                </Link>

                {heroSlides.length > 1 && (
                  <div className="absolute inset-x-4 bottom-3 flex items-center gap-1.5 sm:inset-x-8 sm:bottom-4">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={`${slide.src}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show ${slide.albumTitle}, image ${index + 1}`}
                        aria-current={index === activeIndex}
                        className="group h-3 flex-1 py-1"
                      >
                        <span className="block h-1 w-full overflow-hidden rounded-full bg-primary-foreground/25 transition-colors group-hover:bg-primary-foreground/40">
                          {index === activeIndex && (
                            <m.span
                              key={activeIndex}
                              initial={{ width: prefersReducedMotion ? "100%" : 0 }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: prefersReducedMotion ? 0 : SLIDE_DURATION_MS / 1000,
                                ease: "linear",
                              }}
                              className="block h-full rounded-full bg-primary-foreground"
                            />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10 sm:flex"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground/35">
          Scroll
        </span>
        <div className="flex h-11 w-6 justify-center rounded-full border border-primary-foreground/25 p-1">
          {prefersReducedMotion ? (
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-foreground/40" />
          ) : (
            <m.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary-foreground/50"
            />
          )}
        </div>
      </m.div>
    </section>
  );
};

export default Hero;
