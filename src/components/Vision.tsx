import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const Vision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="section-dark relative overflow-hidden" ref={ref}>
      <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Purpose"
          title="Vision &"
          highlight="Mission"
          dark
        />

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="feature-card-dark h-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Target className="h-7 w-7 text-primary-foreground" />
              </div>

              <h3 className="mb-5 text-2xl font-bold tracking-tight md:text-3xl">Our Vision</h3>

              <p className="text-base leading-[1.75] text-primary-foreground/75 md:text-lg">
                To create a future where every young person has equal access to mentorship,
                education, and opportunities, regardless of their background. We aim to become a
                leading youth driven platform that connects students with mentors, encourages self
                discovery, and promotes leadership development.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="feature-card-dark h-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Lightbulb className="h-7 w-7 text-primary-foreground" />
              </div>

              <h3 className="mb-5 text-2xl font-bold tracking-tight md:text-3xl">Our Mission</h3>

              <p className="mb-5 text-base leading-[1.75] text-primary-foreground/75 md:text-lg">
                To build a supportive environment for young people to learn, lead, and grow together
                through:
              </p>

              <ul className="space-y-3">
                {[
                  "Bridging the opportunity gap in education and mentorship",
                  "Providing one on one guidance and mentorship",
                  "Building strong, supportive student networks",
                  "Nurturing confident, capable leaders",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-primary-foreground/75">
                    <span className="mt-2.5 h-1 w-5 shrink-0 rounded-full bg-primary-foreground/35" />
                    <span className="text-sm leading-relaxed sm:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Vision;
