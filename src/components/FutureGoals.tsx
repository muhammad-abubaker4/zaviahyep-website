import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Rocket } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { revealTransition } from "@/lib/motion";

const shortTermGoals = [
  {
    title: "Launch Zaviah's Mentorship Program",
    description:
      "Develop and introduce a structured mentorship initiative connecting participants with experienced mentors for guidance, learning, and personal development.",
  },
  {
    title: "Expand Learning Sessions & Workshops",
    description:
      "Continue organizing accessible sessions on technology, education, careers, leadership, personal development, opportunities, and other relevant topics.",
  },
  {
    title: "Strengthen Community Participation",
    description:
      "Create more opportunities for members, volunteers, speakers, mentors, and collaborators to contribute to Zaviah's initiatives.",
  },
  {
    title: "Build Meaningful Collaborations",
    description:
      "Continue working with organizations, communities, professionals, and educators on initiatives that create shared learning and participation opportunities.",
  },
];

const longTermGoals = [
  {
    title: "Expand Access to Learning",
    description:
      "Reach more communities through accessible learning opportunities, resources, sessions, and collaborative initiatives.",
  },
  {
    title: "Build a Stronger Community Network",
    description:
      "Grow a diverse network of participants, mentors, professionals, organizations, and collaborators connected through shared learning and contribution.",
  },
  {
    title: "Strengthen Collaborative Initiatives",
    description:
      "Develop meaningful collaborations within Pakistan and beyond that support knowledge sharing, community participation, and new opportunities.",
  },
  {
    title: "Create Sustainable Programs",
    description:
      "Develop long-term initiatives that can continue creating value in learning, guidance, leadership, community participation, and personal development.",
  },
];

const phases = [
  { icon: Calendar, label: "Short Term", subtitle: "Next 6 to 12 months", goals: shortTermGoals, delay: 0.1 },
  { icon: Rocket, label: "Long Term", subtitle: "Next 2 to 3 years", goals: longTermGoals, delay: 0.2 },
];

const FutureGoals = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="future-goals" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Roadmap"
          title="Future"
          highlight="Goals"
          description="Where we are headed, driven by consistent effort, collaboration, and courage to lead change."
        />

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          {phases.map((phase) => (
            <m.div
              key={phase.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={revealTransition(phase.delay)}
            >
              <div className="flex items-center gap-4 border-b border-border pb-5">
                <span className="icon-badge h-11 w-11 shrink-0">
                  <phase.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">
                    {phase.label}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {phase.subtitle}
                  </h3>
                </div>
              </div>

              {/* Milestones on a spine: a roadmap should read as a sequence, not a stack of boxes. */}
              <ul className="ml-[1.3rem] mt-8 space-y-8 border-l border-border pl-8">
                {phase.goals.map((goal) => (
                  <li key={goal.title} className="relative">
                    <span
                      className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                      aria-hidden
                    />
                    <p className="font-semibold leading-snug text-foreground">{goal.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {goal.description}
                    </p>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureGoals;
