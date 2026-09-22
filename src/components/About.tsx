import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const stats = [
  { value: "July 2025", label: "Founded" },
  { value: "2,000+", label: "Cumulative Participants" },
  { value: "10+", label: "Partners" },
];

type AboutProps = {
  /** When true (homepage default), deep links go to /about. */
  showDeepLinks?: boolean;
};

const About = ({ showDeepLinks = true }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-muted" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            eyebrow="Our Story"
            title="About"
            highlight="Zaviah"
            description="A youth-led nonprofit platform creating opportunities for learning, connection, collaboration, and personal growth across Pakistan."
            align="left"
            className="mb-0"
          />

          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={revealTransition()}
            className="space-y-6"
          >
            <div className="glass-card-light p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" />
                Since July 2025
              </div>
              <p className="text-base leading-[1.8] text-muted-foreground sm:text-lg">
                Founded in July 2025, Zaviah brings people together through learning sessions,
                community initiatives, collaborations, and opportunities guided by Access, Awareness,
                and Aspiration.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-chip text-center">
                  <p className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase leading-tight tracking-wider text-muted-foreground sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {showDeepLinks ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-soft"
                >
                  Our story & pillars
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default About;
