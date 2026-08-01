import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import hafsaKhalil from "@/assets/team/Hafsa_Khalil.jpeg";

const FounderWelcome = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founder-message" className="section-light overflow-hidden" ref={ref}>
      <div className="container px-4">
        <SectionHeader eyebrow="Leadership" title="Founder's" highlight="Message" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <m.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={revealTransition()}
            className="relative lg:col-span-5"
          >
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl border border-primary/10 bg-primary/5" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 shadow-lift">
              <img
                src={hafsaKhalil}
                alt="Hafsa Khalil, Founder and CEO of Zaviah"
                className="aspect-[3/4] w-full object-cover object-top"
                loading="lazy"
                width={480}
                height={640}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl border border-primary/10 bg-card px-5 py-3 shadow-medium">
              <p className="text-sm font-bold text-foreground">Hafsa Khalil</p>
              <p className="text-xs font-semibold text-primary">Founder & CEO</p>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={revealTransition(0.1)}
            className="lg:col-span-7"
          >
            <Quote className="mb-6 h-10 w-10 text-primary/20" aria-hidden />
            <h3 className="mb-8 text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              We Are Not a Generation That Waits
            </h3>

            <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:text-lg">
              <p>
                We are not a generation that waits for the world to hand us chances, we create them.
                When there is no table for us, we build our own. When the path does not exist, we
                carve one with our own hands.
              </p>
              <p>
                Zaviah is not just about dreams, it is about action. We believe in empowering every
                young person to see their potential, act on their ideas, and make a difference.
              </p>
              <p>
                Our mission is focused on real impact through collaboration, knowledge, and growth.
                We rise, we lead, and we take others with us.
              </p>
            </div>

            <Link
              to="/founder"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-medium"
            >
              Read full profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default FounderWelcome;
