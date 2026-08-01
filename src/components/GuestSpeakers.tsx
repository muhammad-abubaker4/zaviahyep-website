import { useRef } from "react";
import { useInView } from "framer-motion";
import { guestSpeakers } from "@/data/mentors";
import SectionHeader from "@/components/SectionHeader";
import SpeakerCard from "@/components/SpeakerCard";

const GuestSpeakers = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestSpeakers;
