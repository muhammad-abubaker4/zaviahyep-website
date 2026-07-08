import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ORG_PROFILE_PDF } from "@/lib/constants";
import { partners } from "@/data/partners";
import SectionHeader from "@/components/SectionHeader";
import PartnerCard from "@/components/PartnerCard";

const Partnerships = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partnerships" className="section-light overflow-hidden" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Collaboration"
          title="Partnerships &"
          highlight="MoUs"
          description="Collaborating with organizations that share our mission to empower youth nationwide."
        />
        <p className="-mt-12 mb-10 text-center text-sm text-muted-foreground">
          <a
            href={ORG_PROFILE_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Download Organization Profile (PDF)
          </a>
        </p>

        <div className="mx-auto mb-16 grid max-w-6xl gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} className="w-full" />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary p-10 text-center text-primary-foreground sm:p-12"
        >
          <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />
          <div className="relative">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Interested in Partnering with Zaviah?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/70">
              Join our network of organizations empowering youth through collaboration, mentorship, and
              shared opportunities.
            </p>
            <a
              href="mailto:zaviahorg@gmail.com"
              className="btn-primary-modern mt-8 inline-flex"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
