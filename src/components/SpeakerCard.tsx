import { useState } from "react";
import { m } from "framer-motion";
import { revealTransition, STAGGER } from "@/lib/motion";
import { User } from "lucide-react";
import type { GuestSpeaker } from "@/data/mentors";
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

type SpeakerCardProps = {
  speaker: GuestSpeaker;
  index: number;
  isInView: boolean;
  /** Set for above-the-fold cards so the portrait is not deferred. */
  eager?: boolean;
  sizes?: string;
};

/** Shared portrait card used by the homepage preview and the full speakers page. */
const SpeakerCard = ({
  speaker,
  index,
  isInView,
  eager = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: SpeakerCardProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(speaker.image) && !imageError;
  const initials = getInitials(speaker.displayName);
  const fitContain = speaker.imageFit === "contain";

  return (
    <m.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={revealTransition(index * STAGGER.tight)}
      className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {showImage ? (
          <img
            src={speaker.image}
            alt={`${speaker.displayName}, guest speaker at Zaviah`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onError={() => setImageError(true)}
            className={cn(
              "h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              fitContain ? "bg-white object-contain p-6" : "object-cover",
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
    </m.article>
  );
};

export default SpeakerCard;
