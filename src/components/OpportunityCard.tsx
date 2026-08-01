import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { opportunityPath } from "@/lib/routes";
import { type Opportunity } from "@/data/opportunities";
import { cn } from "@/lib/utils";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const Icon = opportunity.icon;
  const path = opportunityPath(opportunity.slug);

  return (
    <Link
      to={path}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl bg-card p-5 sm:p-6",
        "shadow-[0_1px_2px_hsl(195_21%_18%/0.04),0_8px_24px_-12px_hsl(195_21%_18%/0.12)]",
        "ring-1 ring-primary/[0.06] transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_hsl(195_21%_18%/0.2)] hover:ring-primary/15",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {opportunity.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {opportunity.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {opportunity.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-primary/[0.05] px-2.5 py-1 text-[11px] font-medium text-foreground/65"
          >
            {chip}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        {opportunity.cardCta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
};

export default OpportunityCard;
