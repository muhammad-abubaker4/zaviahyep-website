import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import { guestSpeakers, type GuestSpeaker } from "@/data/mentors";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

function getInitials(displayName: string) {
  return displayName
    .replace(/^(Mr\.|Ms\.|Dr\.)\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const GuestSpeakers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="guest-speakers" className="section-muted overflow-hidden" ref={ref}>
      <div className="bg-line-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Dignitaries"
          title="Dignitaries Who Spoke"
          highlight="at Our Initiatives"
          description="Leaders, professionals, and mentors who contributed their knowledge and experience at Zaviah."
        />

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

function SpeakerCard({
  speaker,
  index,
  isInView,
}: {
  speaker: GuestSpeaker;
  index: number;
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(speaker.image) && !imageError;
  const initials = getInitials(speaker.displayName);
  const fitContain = speaker.imageFit === "contain";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {showImage ? (
          <img
            src={speaker.image}
            alt={speaker.displayName}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className={cn(
              "h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              fitContain ? "object-contain bg-white p-6" : "object-cover",
            )}
            style={{ objectPosition: speaker.imagePosition ?? "center top" }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-primary">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
              {initials ? (
                <span className="text-lg font-bold text-primary-foreground">{initials}</span>
              ) : (
                <User className="h-7 w-7 text-primary-foreground/70" aria-hidden />
              )}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
              Photo soon
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-sm font-bold leading-snug tracking-tight text-white sm:text-base">
            {speaker.displayName}
          </h3>
          <p className="mt-1 text-xs leading-snug text-white/75 sm:text-sm">{speaker.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default GuestSpeakers;
