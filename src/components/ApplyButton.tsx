import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApplyUrl, type Opportunity } from "@/data/opportunities";

type ApplyButtonProps = {
  opportunity: Opportunity;
  className?: string;
  variant?: "primary" | "light";
};

/**
 * Single apply CTA. Today opens Google Form; later can switch to Laravel portal
 * by changing getApplyUrl / opportunity.applyUrl only.
 */
const ApplyButton = ({ opportunity, className, variant = "primary" }: ApplyButtonProps) => {
  const href = getApplyUrl(opportunity);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        variant === "primary" ? "btn-primary-modern" : "btn-ghost-modern",
        "inline-flex items-center justify-center gap-2",
        className,
      )}
    >
      {opportunity.ctaLabel}
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
    </a>
  );
};

export default ApplyButton;
