import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserCheck, Wrench, Compass, Calendar, Award, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const offerings = [
  {
    icon: UserCheck,
    title: "Mentorship Programs",
    tag: "Core",
    items: [
      "One-to-one mentoring matched by interest",
      "Monthly check-ins with 3-6 month plans",
      "Group mentoring in topic-based cohorts",
    ],
    span: "col-span-12 md:col-span-7 lg:col-span-7",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Skill Building Workshops",
    tag: "Workshops",
    items: [
      "Communication and resume writing",
      "Interview practice and preparation",
      "Time management and digital skills",
    ],
    span: "col-span-12 md:col-span-5 lg:col-span-5",
    featured: false,
  },
  {
    icon: Compass,
    title: "Career Guidance",
    tag: "Careers",
    items: [
      "Career exploration and pathway planning",
      "Application help and major selection",
      "Employer panels and mock interviews",
    ],
    span: "col-span-12 sm:col-span-6 lg:col-span-4",
    featured: false,
  },
  {
    icon: Calendar,
    title: "Community Events",
    tag: "Events",
    items: [
      "Webinars and local meetups",
      "Volunteer drives and awareness campaigns",
      "Annual youth summit showcasing projects",
    ],
    span: "col-span-12 sm:col-span-6 lg:col-span-4",
    featured: false,
  },
  {
    icon: Award,
    title: "Leadership Opportunities",
    tag: "Leadership",
    items: [
      "Campus Ambassador programs",
      "Project lead roles and event coordination",
      "Social impact initiatives with team support",
    ],
    span: "col-span-12 lg:col-span-4",
    featured: false,
  },
];

const Offerings = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="offerings" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Programs"
          title="What We"
          highlight="Offer"
          description="Comprehensive mentorship programs designed to help students grow, connect, and succeed."
        />

        <div className="bento-grid mx-auto max-w-6xl">
          {offerings.map((offering, index) => (
            <motion.article
              key={offering.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group", offering.span)}
            >
              <div
                className={cn(
                  "feature-card flex h-full flex-col",
                )}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="icon-badge h-14 w-14">
                    <offering.icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {offering.tag}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mb-4 font-bold tracking-tight text-foreground",
                    offering.featured ? "text-2xl md:text-3xl" : "text-xl",
                  )}
                >
                  {offering.title}
                </h3>

                <div className="flex flex-1 flex-col">
                  <ul className="space-y-2.5">
                    {offering.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-primary/30" />
                        <span className="text-sm leading-relaxed sm:text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex justify-end pt-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
