import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Heart, GraduationCap, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

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
      <div className="bg-line-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Culture"
          title="Our Core"
          highlight="Values"
          description="Values that guide how we work, connect, and grow together."
        />

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="feature-card flex h-full flex-col items-center p-6 text-center">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary group-hover:shadow-soft">
                  <value.icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">{value.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{value.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
