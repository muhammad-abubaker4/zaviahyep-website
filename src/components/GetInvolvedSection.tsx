import { Link } from "react-router-dom";
import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import OpportunityCard from "@/components/OpportunityCard";
import { GET_INVOLVED_PATH } from "@/lib/routes";
import { opportunities } from "@/data/opportunities";

/** Homepage teaser: compact opportunities, then route to hub. */
const GetInvolvedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const preview = opportunities.slice(0, 3);

  return (
    <section id="get-involved" className="section-muted overflow-hidden" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Get Involved"
          title="Find Your"
          highlight="Path"
          description="Whether you are a student, mentor, volunteer or partner, there is a place for you."
        />

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={revealTransition()}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {preview.map((opportunity) => (
            <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
          ))}
        </m.div>

        <div className="mt-8 flex justify-center">
          <Link to={GET_INVOLVED_PATH} className="btn-primary-solid">
            Explore all opportunities
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
