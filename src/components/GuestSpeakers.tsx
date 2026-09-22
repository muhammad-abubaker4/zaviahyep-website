import { useRef } from "react";
import { useInView } from "framer-motion";
import { guestSpeakers } from "@/data/mentors";
import SectionHeader from "@/components/SectionHeader";
import SpeakerCard from "@/components/SpeakerCard";

const GuestSpeakers = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const ref = useRef(null);
  const sectionInView = useInView(ref, { once: true, margin: "-80px" });

  /**
   * On the dedicated /guest-speakers page (`hideHeader`), never leave the grid
   * at opacity 0 after createRoot remounts. Googlebot smartphone Live Inspection
   * snapshots with the hero filling the viewport, so useInView stayed false and
   * Soft-404'd a page whose prerendered HTML was already correct.
   * Homepage preview keeps scroll-triggered reveal.
   */
  const cardsVisible = hideHeader || sectionInView;

  return (
    <section id="guest-speakers" className="section-muted overflow-hidden" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        {!hideHeader && (
          <SectionHeader
            eyebrow="Dignitaries"
            title="Dignitaries Who Spoke"
            highlight="at Our Initiatives"
            description="Leaders, professionals, and mentors who contributed their knowledge and experience at Zaviah."
          />
        )}

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {guestSpeakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              index={index}
              isInView={cardsVisible}
              eager={hideHeader && index < 8}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestSpeakers;
