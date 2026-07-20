import type { Partner } from "@/data/partners";

type PartnerCardProps = {
  partner: Partner;
  className?: string;
};

const PartnerCard = ({ partner, className = "" }: PartnerCardProps) => (
  <article
    className={`flex h-full w-full flex-col items-center rounded-3xl border border-primary/10 bg-white p-7 text-center shadow-soft ${className}`}
  >
    <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/10 bg-muted/40 p-2">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className="h-full w-full object-contain"
        loading="lazy"
        width={96}
        height={96}
      />
    </div>

    <span className="mb-3 inline-flex min-h-7 items-center justify-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
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
