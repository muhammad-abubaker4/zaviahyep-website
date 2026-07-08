import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { scrollToHashWhenReady } from "@/lib/scroll";
import { ORG_PROFILE_PDF } from "@/lib/constants";

const stats = [
  { value: "July 2025", label: "Founded" },
  { value: "1000+", label: "Students" },
  { value: "8+", label: "Partners" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-muted" ref={ref}>
      <div className="bg-line-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            eyebrow="Our Story"
            title="About"
            highlight="Zaviah"
            description="A youth led non profit empowering students through mentorship, skill development, and personal growth across Pakistan."
            align="left"
            className="mb-0"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="glass-card-light p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Sparkles className="h-3 w-3" />
                Since July 2025
              </div>
              <p className="text-base leading-[1.8] text-muted-foreground sm:text-lg">
                Founded in July 2025, Zaviah connects young people with mentors, workshops, and
                opportunities guided by Access, Awareness, and Aspiration. We believe every student
                deserves a supportive community to discover their potential.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-chip text-center">
                  <p className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToHashWhenReady("#pillars")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-soft"
              >
                Explore our Pillars
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={ORG_PROFILE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-primary/15 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Download profile (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
