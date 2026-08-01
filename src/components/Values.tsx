import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Heart, GraduationCap, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { revealTransition, STAGGER } from "@/lib/motion";

const values = [
  { icon: Users, title: "Empowerment", description: "We lift others up through mentorship and support, creating spaces where students feel capable and confident." },
  { icon: Heart, title: "Inclusivity", description: "Everyone is welcome. We celebrate diversity and ensure every voice is heard and valued." },
  { icon: GraduationCap, title: "Mentorship", description: "Learning through connection and guidance, building relationships that inspire lifelong growth." },
  { icon: Shield, title: "Integrity", description: "Honest, fair, and transparent in all our work. Trust is the foundation of everything we do." },
  { icon: TrendingUp, title: "Growth", description: "Continuous learning and improvement, both personal and collective. We evolve with every step." },
];

const Values = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="values" className="section-muted" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Culture"
          title="Our Core"
          highlight="Values"
          description="Values that guide how we work, connect, and grow together."
        />

        {/* Full-width rows: five values fit comfortably here, where five columns did not. */}
        <div className="mx-auto max-w-4xl border-y border-border">
          {values.map((value, index) => (
            <m.article
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={revealTransition(index * STAGGER.base)}
              className="group grid gap-x-8 gap-y-2 border-t border-border py-6 first:border-t-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary">
                  <value.icon
                    className="h-[18px] w-[18px] text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                    aria-hidden
                  />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-foreground">{value.title}</h3>
              </div>

              <p className="text-[15px] leading-[1.75] text-muted-foreground">
                {value.description}
              </p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
