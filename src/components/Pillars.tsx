import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Unlock, Eye, Rocket, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { revealTransition, STAGGER } from "@/lib/motion";
import { CORE_PILLARS } from "@/data/pillars";

const pillarIcons: Record<string, LucideIcon> = {
  Access: Unlock,
  Awareness: Eye,
  Aspiration: Rocket,
};

const Pillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Foundation"
          title="Our Core"
          highlight="Pillars"
          description="Three fundamental principles that guide every decision we make."
        />

        {/* Rules instead of cards: three ideas of equal weight, read as one row. */}
        <div className="mx-auto grid max-w-6xl gap-y-10 md:grid-cols-3 md:gap-y-0">
          {CORE_PILLARS.map((pillar, index) => {
            const Icon = pillarIcons[pillar.title];

            return (
              <m.article
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={revealTransition(index * STAGGER.wide)}
                className={cn(
                  index > 0 &&
                    "border-t border-border pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0",
                  index < CORE_PILLARS.length - 1 && "md:pr-10",
                )}
              >
                <div className="flex items-center gap-4">
                  {Icon && <Icon className="h-5 w-5 shrink-0 text-primary/70" aria-hidden />}
                  <span className="h-px flex-1 bg-border" aria-hidden />
                </div>

                <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">
                  {pillar.description}
                </p>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
