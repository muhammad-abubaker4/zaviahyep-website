import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Heart, Megaphone, Users, CheckCircle2 } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

export type ApplicationRole = "member" | "ambassador" | "core";

const roles: {
  value: ApplicationRole;
  icon: typeof Users;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    value: "member",
    icon: Users,
    title: "Member",
    description: "Join sessions, attend events, and grow with students across Pakistan.",
    accent: "01",
  },
  {
    value: "ambassador",
    icon: Megaphone,
    title: "Campus Ambassador",
    description: "Represent Zaviah at your school or university and grow our student network.",
    accent: "02",
  },
  {
    value: "core",
    icon: Heart,
    title: "Core Team Member",
    description: "Take a leadership role in programs, outreach, and organizational growth.",
    accent: "03",
  },
];

const roleLabels: Record<ApplicationRole, string> = {
  member: "Member",
  ambassador: "Campus Ambassador",
  core: "Core Team Member",
};

const JoinUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedRole, setSelectedRole] = useState<ApplicationRole | null>(null);

  return (
    <section id="join" className="section-muted" ref={ref}>
      <div className="bg-line-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Membership"
          title="Join"
          highlight="Zaviah"
          description="Whether you want to learn, lead, or grow, there is a place for you here."
        />

        <div id="apply" className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {selectedRole ? "Complete Your Application" : "Choose Your Path"}
            </h3>
            <p className="mt-3 text-muted-foreground">
              {selectedRole
                ? `You are applying as a ${roleLabels[selectedRole]}. Fill in the details below.`
                : "Select how you would like to join Zaviah before starting your application."}
            </p>
          </motion.div>

          <div className="mb-12 grid gap-5 md:grid-cols-3">
            {roles.map((role, index) => {
              const isSelected = selectedRole === role.value;
              return (
                <motion.button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                    "border-primary/10 hover:border-primary/20",
                    isSelected && "border-primary/30 ring-2 ring-primary/20",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
                      "bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent",
                      isSelected && "opacity-100",
                    )}
                    aria-hidden
                  />

                  {isSelected && (
                    <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  )}

                  <div className="relative flex h-full flex-col p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                          <role.icon className="h-5 w-5" aria-hidden />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                            {role.title}
                          </h3>
                          <span className="mt-1 inline-flex items-center rounded-full border border-primary/10 bg-primary/[0.06] px-2.5 py-1 text-[11px] font-bold tracking-[0.2em] text-primary/50">
                            {role.accent}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {isSelected ? "Selected" : "Select this role"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedRole ? (
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <ApplicationForm
                defaultRole={selectedRole}
                onChangeRole={() => setSelectedRole(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-primary/[0.06] px-6 py-14 text-center shadow-soft"
            >
              <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                  <Users className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Please select a membership type above to unlock the application form.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
