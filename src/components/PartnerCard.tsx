import type { Partner } from "@/data/partners";
import { cn } from "@/lib/utils";

type PartnerCardProps = {
  partner: Partner;
  className?: string;
};

/** Distinct badge colors per partnership tier (not the same grey pill). */
function typeBadgeClass(type: string) {
  const t = type.toLowerCase();
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
  if (t.includes("educational")) {
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
  if (t === "strategic partner") return "border-t-primary";
  if (t.includes("official")) return "border-t-teal-700";
  if (t.includes("strategic community")) return "border-t-sky-800";
  if (t.includes("youth leadership")) return "border-t-indigo-800";
  if (t.includes("educational")) return "border-t-amber-700";
  if (t.includes("supporting")) return "border-t-stone-500";
  if (t.includes("community")) return "border-t-emerald-700";
  return "border-t-secondary";
}

const PartnerCard = ({ partner, className = "" }: PartnerCardProps) => (
  <article
    className={cn(
      "flex h-full w-full flex-col items-center rounded-3xl border border-border border-t-4 bg-card p-7 text-center shadow-soft",
      typeAccentClass(partner.type),
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
      className,
    )}
  >
    <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/10 bg-background p-2">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        width={96}
        height={96}
      />
    </div>

    <span
      className={cn(
        "mb-3 inline-flex min-h-7 max-w-full items-center justify-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
        typeBadgeClass(partner.type),
      )}
    >
      <span className="line-clamp-1">{partner.type}</span>
    </span>

    <h3 className="mb-2 min-h-[3.25rem] text-base font-bold leading-snug tracking-tight text-foreground sm:text-[17px]">
      <span className="line-clamp-2">{partner.name}</span>
    </h3>

    <p className="min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">
      <span className="line-clamp-3">{partner.description}</span>
    </p>
  </article>
);

export default PartnerCard;
