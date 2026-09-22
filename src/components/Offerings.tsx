import { m, useInView } from "framer-motion";
import { revealTransition, STAGGER } from "@/lib/motion";
import { useRef } from "react";
import { UserCheck, Wrench, Compass, Calendar, Award } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const offerings = [
  {
    icon: UserCheck,
    title: "Mentorship Program",
    tag: "Upcoming",
    summary:
      "A structured mentorship initiative being developed to connect participants with experienced mentors for guidance, learning, and personal development.",
    highlights: ["Mentorship", "Guidance", "Coming Soon"],
    featured: true,
  },
  {
    icon: Wrench,
    title: "Learning Sessions & Workshops",
    tag: "Sessions",
    summary:
      "Interactive sessions covering technology, education, careers, leadership, personal development, and other relevant topics.",
    highlights: ["Learning", "Skills", "Awareness"],
    featured: false,
  },
  {
    icon: Compass,
    title: "Career & Opportunity Awareness",
    tag: "Careers",
    summary:
      "Helping people discover educational, professional, and development opportunities and make more informed choices.",
    highlights: ["Careers", "Education", "Opportunities"],
    featured: false,
  },
  {
    icon: Calendar,
    title: "Community Initiatives",
    tag: "Community",
    summary:
      "Activities that bring people, volunteers, speakers, and professionals together for learning, connection, and contribution.",
    highlights: ["Community", "Collaboration", "Participation"],
    featured: false,
  },
  {
    icon: Award,
    title: "Leadership & Participation",
    tag: "Leadership",
    summary:
      "Opportunities to contribute through volunteering, campus representation, projects, and community initiatives.",
    highlights: ["Volunteering", "Leadership", "Contribution"],
    featured: false,
  },
];

const Offerings = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = offerings.find((o) => o.featured)!;
  const rest = offerings.filter((o) => !o.featured);
  const FeaturedIcon = featured.icon;

  return (
    <section id="offerings" className="section-light" ref={ref}>
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Programs"
          title="What We"
          highlight="Offer"
          description="Learning, guidance, community initiatives, and opportunities designed to help people connect, develop, and grow."
        />

        <div className="mx-auto max-w-6xl space-y-4 md:space-y-5">
          {/* Featured program — structured mentorship is upcoming, not live */}
          <m.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={revealTransition()}
            className="group relative overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_0%_100%/0.1),_transparent_55%)]"
              aria-hidden
            />
            <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />

            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground/75">
                    {featured.tag}
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10">
                    <FeaturedIcon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
                      {featured.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3 py-1.5 text-xs font-medium text-primary-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className="inline-flex items-center justify-center self-start rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3 text-sm font-semibold text-primary-foreground/85 lg:self-end"
                aria-label="Mentorship program coming soon"
              >
                Coming Soon
              </span>
            </div>
          </m.article>

          {/* Supporting programs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {rest.map((offering, index) => {
              const Icon = offering.icon;

              return (
                <m.article
                  key={offering.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={revealTransition(0.08 + index * STAGGER.base)}
                  className={cn(
                    "group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.5rem] bg-card p-5",
                    "ring-1 ring-primary/[0.07] transition-all duration-300",
                    "hover:-translate-y-1 hover:ring-primary/20",
                    "hover:shadow-[0_16px_40px_-20px_hsl(195_21%_18%/0.25)]",
                  )}
                >
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {offering.tag}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-lg font-bold tracking-tight text-foreground">
                    {offering.title}
                  </h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {offering.summary}
                  </p>

                  <div className="relative mt-4 flex flex-wrap gap-1.5 border-t border-primary/[0.06] pt-4">
                    {offering.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-primary/[0.04] px-2 py-1 text-[11px] font-medium text-foreground/65"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
