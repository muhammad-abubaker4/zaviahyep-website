import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Rocket } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { revealTransition } from "@/lib/motion";

const shortTermGoals = [
  { title: "Launch Zaviah's Mentorship Program", description: "Introduce a structured mentorship system that connects students with professionals, educators, and youth leaders who can guide them in academic, career, and personal growth journeys." },
  { title: "Conduct Virtual Workshops Nationwide", description: "Organize online sessions on essential skills such as communication, leadership, critical thinking, and personal development, making learning accessible to students from all regions." },
  { title: "Onboard Campus Ambassadors", description: "Build a network of motivated student representatives who will promote Zaviah's mission, coordinate activities, and act as a bridge between their campuses and the Zaviah team." },
  { title: "Collaborate with Local Youth Organizations", description: "Establish partnerships with regional student and youth led groups to organize joint events, mentorship sessions, and awareness campaigns." },
];

const longTermGoals = [
  { title: "Build Zaviah Learning Portal", description: "Develop a dedicated digital hub offering mentorship tools, learning resources, online courses, and community spaces for students to connect and grow." },
  { title: "Host Annual Zaviah Youth Conference", description: "Launch a national event that brings together young leaders, educators, and professionals to exchange ideas, share experiences, and celebrate youth achievements." },
  { title: "Partner with International Youth Movements", description: "Collaborate with global organizations that share Zaviah's vision to create cross border opportunities for students through exchange programs and online mentorships." },
  { title: "Sustainable Leadership Programs", description: "Design long term initiatives that equip students with practical skills, leadership experience, and career guidance to help them transition smoothly into professional life." },
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
