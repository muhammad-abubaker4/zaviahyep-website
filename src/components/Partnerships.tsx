import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ORG_PROFILE_PDF } from "@/lib/constants";
import { partners } from "@/data/partners";
import SectionHeader from "@/components/SectionHeader";
import PartnerCard from "@/components/PartnerCard";
import { opportunityPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

type PartnershipsProps = {
  hideHeader?: boolean;
  /** light = distinct from dark hero/footer; dark = legacy band */
  tone?: "light" | "dark";
};

const Partnerships = ({ hideHeader = false, tone = "light" }: PartnershipsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isDark = tone === "dark";

  return (
    <section
      id="partnerships"
      className={cn(
        "overflow-hidden",
        isDark ? "section-dark" : "section-padding relative bg-background",
      )}
      ref={ref}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          isDark ? "bg-dot-grid-dark" : "bg-dot-grid",
        )}
        aria-hidden
      />
      <div className="container relative px-4">
        {!hideHeader && (
          <>
            <SectionHeader
              eyebrow="Collaboration"
              title="Partnerships &"
              highlight="MoUs"
              description="Collaborating with organizations that share our mission to empower youth nationwide."
              dark={isDark}
            />
            <p
              className={cn(
                "-mt-8 mb-10 text-center text-sm",
                isDark ? "text-primary-foreground/65" : "text-muted-foreground",
              )}
            >
              <a
                href={ORG_PROFILE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-semibold underline-offset-4 hover:underline",
                  isDark ? "text-primary-foreground" : "text-primary",
                )}
              >
                Download Organization Profile (PDF)
              </a>
            </p>
          </>
        )}
        {hideHeader && (
          <p className="mb-8 text-center text-sm text-muted-foreground">
            <a
              href={ORG_PROFILE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Download Organization Profile (PDF)
            </a>
          </p>
        )}

        <div className="mx-auto mb-12 grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} className="w-full" />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={revealTransition(0.15)}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-lift sm:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.1),_transparent_55%)]"
            aria-hidden
          />
          <div className="relative">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Interested in Partnering with Zaviah?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/70 sm:text-base">
              Learn about collaboration options, then submit an official partnership request.
            </p>
            <Link to={opportunityPath("partnerships")} className="btn-primary-modern mt-7 inline-flex">
              Partner With Zaviah
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Partnerships;
