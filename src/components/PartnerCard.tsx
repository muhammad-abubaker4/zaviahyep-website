import type { Partner } from "@/data/partners";
import { cn } from "@/lib/utils";

type PartnerCardProps = {
  partner: Partner;
  className?: string;
};

/** Distinct badge colors per partnership type — full label, no ellipsis. */
function typeBadgeClass(type: string) {
  const t = type.toLowerCase();
  if (t.includes("strategic partnership")) {
    return "border-transparent bg-red-700 text-white";
  }
  if (t === "strategic partner") {
    return "border-transparent bg-primary text-primary-foreground";
  }
  if (t.includes("official")) {
    return "border-transparent bg-teal-700 text-white";
  }
  if (t.includes("strategic community")) {
    return "border-transparent bg-sky-800 text-white";
  }
  if (t.includes("youth leadership")) {
    return "border-transparent bg-indigo-800 text-white";
  }
  if (t.includes("learning") || t.includes("technology")) {
    return "border-transparent bg-cyan-800 text-white";
  }
  if (t.includes("educational") || t.includes("education") || t.includes("opportunities")) {
    return "border-transparent bg-amber-700 text-white";
  }
  if (t.includes("supporting")) {
    return "border-transparent bg-stone-500 text-white";
  }
  if (t.includes("community")) {
    return "border-transparent bg-emerald-700 text-white";
  }
  return "border-transparent bg-secondary text-secondary-foreground";
}

function typeAccentClass(type: string) {
  const t = type.toLowerCase();
  if (t.includes("strategic partnership")) return "border-t-red-700";
  if (t === "strategic partner") return "border-t-primary";
  if (t.includes("official")) return "border-t-teal-700";
  if (t.includes("strategic community")) return "border-t-sky-800";
  if (t.includes("youth leadership")) return "border-t-indigo-800";
  if (t.includes("learning") || t.includes("technology")) return "border-t-cyan-800";
  if (t.includes("educational") || t.includes("education") || t.includes("opportunities")) {
    return "border-t-amber-700";
  }
  if (t.includes("supporting")) return "border-t-stone-500";
  if (t.includes("community")) return "border-t-emerald-700";
  return "border-t-secondary";
}

const PartnerCard = ({ partner, className = "" }: PartnerCardProps) => (
  <article
    className={cn(
      "flex h-full w-full flex-col items-center rounded-[1.25rem] border border-border border-t-4 bg-card p-6 text-center shadow-soft sm:p-7",
      typeAccentClass(partner.type),
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
      className,
    )}
  >
    <div className="mb-5 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/10 bg-background p-2.5">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className="h-full w-full object-contain"
        style={partner.logoScale ? { transform: `scale(${partner.logoScale})` } : undefined}
        loading="lazy"
        width={80}
        height={80}
      />
    </div>

    <span
      className={cn(
        "mb-3 inline-flex max-w-full items-center justify-center rounded-full border px-3 py-1.5 text-center text-[10px] font-semibold uppercase leading-snug tracking-wider",
        typeBadgeClass(partner.type),
      )}
    >
      {partner.type}
    </span>

    <h3 className="mb-2.5 text-base font-bold leading-snug tracking-tight text-foreground">
      {partner.name}
    </h3>

    <p className="text-sm leading-relaxed text-muted-foreground">{partner.description}</p>
  </article>
);

export default PartnerCard;
