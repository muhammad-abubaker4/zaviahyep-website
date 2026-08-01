import { Compass, FileText, Search, Sparkles, Users } from "lucide-react";
import { APPLICATION_JOURNEY } from "@/data/opportunities";
import { cn } from "@/lib/utils";

type ApplicationProcessProps = {
  dark?: boolean;
  className?: string;
};

const ICONS = {
  compass: Compass,
  file: FileText,
  search: Search,
  users: Users,
  sparkles: Sparkles,
} as const;

const ApplicationProcess = ({ dark = false, className }: ApplicationProcessProps) => (
  <ol
    className={cn(
      "flex flex-wrap items-center justify-center gap-y-4",
      className,
    )}
    aria-label="Application journey"
  >
    {APPLICATION_JOURNEY.map((step, index) => {
      const Icon = ICONS[step.icon];
      const isLast = index === APPLICATION_JOURNEY.length - 1;

      return (
        <li key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-2 px-2 sm:px-3">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11",
                dark
                  ? "bg-primary-foreground/10 text-primary-foreground"
                  : "bg-primary/8 text-primary",
              )}
            >
              <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden />
            </span>
            <span
              className={cn(
                "text-xs font-semibold tracking-tight sm:text-sm",
                dark ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
          {!isLast && (
            <span
              className={cn(
                "mx-0.5 mb-6 hidden h-px w-6 sm:mx-1 sm:block sm:w-8 md:w-10",
                dark ? "bg-primary-foreground/25" : "bg-primary/20",
              )}
              aria-hidden
            />
          )}
        </li>
      );
    })}
  </ol>
);

export default ApplicationProcess;
