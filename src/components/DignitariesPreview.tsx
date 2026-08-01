import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { guestSpeakers } from "@/data/mentors";
import SectionHeader from "@/components/SectionHeader";
import SpeakerCard from "@/components/SpeakerCard";

/**
 * Hand-picked for the homepage strip, in display order. Five is the most that
 * fits on one row at full card width inside the 1280px grid.
 */
const PREVIEW_IDS = [
  "sameen-meer",
  "osama-nadeem",
  "dr-sassi-malik",
  "amna-sardar",
  "ibtisam-babar",
] as const;

const previewSpeakers = PREVIEW_IDS.map((id) =>
  guestSpeakers.find((speaker) => speaker.id === id),
).filter((speaker) => speaker !== undefined);

/** Homepage teaser: five portraits that push visitors to the full speakers page. */
const DignitariesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dignitaries" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Dignitaries"
          title="Dignitaries Who Spoke"
          highlight="at Our Initiatives"
          description="Leaders, professionals, and mentors who have shared their experience with our students."
        />

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
          {previewSpeakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              index={index}
              isInView={isInView}
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 240px"
            />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={revealTransition(0.2)}
          className="mt-12 text-center"
        >
          <Link to="/guest-speakers" className="btn-primary-solid">
            Meet all dignitaries
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </m.div>
      </div>
    </section>
  );
};

export default DignitariesPreview;
