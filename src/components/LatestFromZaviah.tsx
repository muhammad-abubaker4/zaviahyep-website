import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import SectionHeader from "@/components/SectionHeader";
import ActivityCard from "@/components/ActivityCard";
import { latestActivities } from "@/data/latestActivities";

/** Homepage strip: curated current activities (not the full gallery history). */
const LatestFromZaviah = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (latestActivities.length === 0) return null;

  return (
    <section id="latest" className="section-muted" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Latest"
          title="Latest From"
          highlight="Zaviah"
          description="Recent sessions, collaborations, visits, and community activities."
        />

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={revealTransition()}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latestActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default LatestFromZaviah;
