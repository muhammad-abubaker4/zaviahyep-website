import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { revealTransition } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
};

const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <m.header
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={revealTransition()}
      className={cn(
        "mb-8 md:mb-12",
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <span
        className={cn(
          "section-eyebrow",
          dark ? "section-eyebrow-dark" : "section-eyebrow-light",
        )}
      >
        <span
          className={cn("pulse-dot", dark ? "bg-primary-foreground/70" : "bg-primary")}
          aria-hidden
        />
        {eyebrow}
      </span>

      <h2
        className={cn(
          "text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[3.5rem]",
          dark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className={dark ? "text-primary-foreground/50" : "text-primary/60"}>
              {highlight}
            </span>
          </>
        )}
      </h2>

      <div
        className={cn(
          "section-title-accent",
          isCenter ? "mx-auto" : "",
          dark ? "section-title-accent-dark" : "section-title-accent-light",
        )}
        aria-hidden
      />

      {description && (
        <p
          className={cn(
            "mt-6 text-lg leading-[1.7] md:text-xl",
            dark ? "text-primary-foreground/65" : "text-muted-foreground",
            isCenter && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </m.header>
  );
};

export default SectionHeader;
