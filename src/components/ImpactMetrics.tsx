import { m, useInView } from "framer-motion";
import { revealTransition, STAGGER } from "@/lib/motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const metrics = [
  {
    value: 2000,
    suffix: "+",
    label: "Cumulative Participants",
    description: "Across Zaviah's sessions and initiatives",
    span: "col-span-12 md:col-span-6 lg:col-span-5",
    featured: true,
  },
  {
    value: 27,
    suffix: "+",
    label: "Sessions & Workshops",
    description: "Across diverse learning and development topics",
    span: "col-span-6 md:col-span-3 lg:col-span-3",
    featured: false,
  },
  {
    value: 30,
    suffix: "+",
    label: "Speakers",
    description: "Sharing knowledge and experience across Zaviah initiatives",
    span: "col-span-6 md:col-span-3 lg:col-span-4",
    featured: false,
  },
  {
    value: 10,
    suffix: "+",
    label: "Partner Organizations",
    description: "Collaborating across initiatives and opportunities",
    span: "col-span-12 md:col-span-12 lg:col-span-12",
    featured: false,
    wide: true,
  },
];

const ImpactMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="section-dark" ref={ref}>
      <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
        aria-hidden
      />

      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Impact"
          title="Measuring"
          highlight="Real Impact"
          description="A look at Zaviah's growing community, activities, and reach across Pakistan."
          dark
        />

        <div className="bento-grid mx-auto max-w-6xl">
          {metrics.map((metric, index) => (
            <m.article
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={revealTransition(index * STAGGER.base)}
              className={cn(metric.span, metric.wide && "lg:col-span-12")}
            >
              <div
                className={cn(
                  "feature-card-dark h-full",
                  metric.featured ? "p-8 md:p-10" : "p-6 md:p-8",
                  metric.wide &&
                    "flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left",
                )}
              >
                <div>
                  <p
                    className={cn(
                      "font-extrabold tracking-[-0.03em]",
                      metric.featured ? "text-6xl sm:text-7xl md:text-8xl" : "text-4xl sm:text-5xl",
                    )}
                  >
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                  </p>
                  <h3
                    className={cn(
                      "mt-3 font-semibold",
                      metric.featured ? "text-xl md:text-2xl" : "text-base md:text-lg",
                    )}
                  >
                    {metric.label}
                  </h3>
                  <p className="mt-1.5 text-sm text-primary-foreground/60">{metric.description}</p>
                </div>

                {metric.wide && (
                  <p className="max-w-md text-sm text-primary-foreground/50">
                    Bringing people together through learning, opportunities, collaboration, and
                    community-led initiatives across Pakistan.
                  </p>
                )}
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
