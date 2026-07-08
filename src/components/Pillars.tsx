import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Unlock, Eye, Rocket } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  {
    icon: Unlock,
    title: "Access",
    description:
      "Making sure all students have fair chances to learn, grow, and connect with mentors. We work to ensure equal access to mentorship, learning, and personal growth for students across Pakistan.",
  },
  {
    icon: Eye,
    title: "Awareness",
    description:
      "Through mentorship, workshops, and open discussions, we help students become more confident, informed, and self aware, ready to make better choices for their future and create positive change.",
  },
  {
    icon: Rocket,
    title: "Aspiration",
    description:
      "Inspiring youth to dream big, act with confidence, and lead with integrity. We help youth believe in themselves, pursue meaningful goals, and create lasting impact in their communities.",
  },
];

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

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="feature-card flex h-full flex-col">
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <div className="icon-badge h-14 w-14">
                    <pillar.icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="relative z-10 mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="relative z-10 flex-grow text-[15px] leading-[1.75] text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
