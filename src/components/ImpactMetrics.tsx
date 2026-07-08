import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const metrics = [
  {
    value: 1000,
    suffix: "+",
    label: "Total Mentees",
    description: "Students empowered nationwide",
    span: "col-span-12 md:col-span-6 lg:col-span-5",
    featured: true,
  },
  {
    value: 25,
    suffix: "+",
    label: "Webinars Hosted",
    description: "Live learning sessions",
    span: "col-span-6 md:col-span-3 lg:col-span-3",
    featured: false,
  },
  {
    value: 500,
    suffix: "+",
    label: "Community Hours",
    description: "Mentorship and peer support",
    span: "col-span-6 md:col-span-3 lg:col-span-4",
    featured: false,
  },
  {
    value: 8,
    suffix: "+",
    label: "Partner Organizations",
    description: "Collaborating for youth impact",
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
          description="Every number represents a student, a conversation, and a step toward a brighter future."
          dark
        />

        <div className="bento-grid mx-auto max-w-6xl">
          {metrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
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
                  <p className="mt-1.5 text-sm text-primary-foreground/55">{metric.description}</p>
                </div>

                {metric.wide && (
                  <p className="max-w-md text-sm text-primary-foreground/45">
                    Building a nationwide network of empowered youth through consistent mentorship,
                    live sessions, and community collaboration.
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
