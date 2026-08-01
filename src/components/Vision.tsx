import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Target, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { revealTransition, STAGGER } from "@/lib/motion";

const missionPoints = [
  "Bridging the opportunity gap in education and mentorship",
  "Providing one on one guidance and mentorship",
  "Building strong, supportive student networks",
  "Nurturing confident, capable leaders",
];

const Vision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: revealTransition(delay),
  });

  return (
    <section
      id="vision"
      className="section-padding relative overflow-hidden bg-mesh-dark text-primary-foreground"
      ref={ref}
    >
      <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Purpose"
          title="Vision &"
          highlight="Mission"
          description="What we are working toward, and how we get there."
          dark
        />

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <m.article {...reveal(0.1)} className="glass-card h-full p-8 md:p-10">
            <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Compass className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/45">
                  Our Vision
                </p>
                <h3 className="text-xl font-bold tracking-tight text-primary-foreground">
                  Where we are headed
                </h3>
              </div>
            </div>

            <p className="mt-7 text-lg font-medium leading-[1.6] text-primary-foreground/85 md:text-xl md:leading-[1.55]">
              To create a future where every young person has equal access to mentorship,
              education, and opportunities, regardless of their background.
            </p>
            <p className="mt-5 text-[15px] leading-[1.75] text-primary-foreground/60">
              We aim to become a leading youth driven platform that connects students with mentors,
              encourages self discovery, and promotes leadership development.
            </p>
          </m.article>

          <m.article {...reveal(0.2)} className="glass-card h-full p-8 md:p-10">
            <div className="flex items-center gap-4 border-b border-primary-foreground/10 pb-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Target className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/45">
                  Our Mission
                </p>
                <h3 className="text-xl font-bold tracking-tight text-primary-foreground">
                  How we get there
                </h3>
              </div>
            </div>

            <p className="mt-7 text-[15px] leading-[1.75] text-primary-foreground/60">
              To build a supportive environment for young people to learn, lead, and grow together
              through:
            </p>

            <ul className="mt-6 space-y-4">
              {missionPoints.map((point, index) => (
                <m.li
                  key={point}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={revealTransition(0.35 + index * STAGGER.base)}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="mt-[3px] h-[18px] w-[18px] shrink-0 text-primary-foreground/40"
                    aria-hidden
                  />
                  <span className="text-[15px] leading-[1.6] text-primary-foreground/85">
                    {point}
                  </span>
                </m.li>
              ))}
            </ul>
          </m.article>
        </div>
      </div>
    </section>
  );
};

export default Vision;
