import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

import hafsaKhalil from "@/assets/team/Hafsa_Khalil.jpeg";
import muhammadAbubaker from "@/assets/team/Muhammad_Abubaker.jpeg";
import qamarAbbas from "@/assets/team/Qamar_Abbas.jpeg";
import amnaIrfan from "@/assets/team/Amna_Irfan.jpeg";
import shaheer from "@/assets/team/Shaheer.jpeg";
import aliGoharQureshi from "@/assets/team/Ali Gohar.jpg";

const teamMembers = [
  {
    name: "Hafsa Khalil",
    role: "Founder",
    description: "Visionary leader committed to empowering youth through mentorship and learning.",
    image: hafsaKhalil,
    profileHref: "/founder",
  },
  {
    name: "Muhammad Abubaker",
    role: "Co Founder",
    description: "Leads operations, strategy, and digital direction for meaningful student communities.",
    image: muhammadAbubaker,
    profileHref: "/co-founder",
  },
  {
    name: "Amna Irfan",
    role: "Ambassador Lead & Sessions Host",
    description:
      "Builds connections with students and mentors nationwide through outreach and hosts online mentorship sessions.",
    image: amnaIrfan,
  },
  {
    name: "Qamar Abbas",
    role: "Ambassador Lead",
    description: "Builds connections with students and mentors nationwide through outreach.",
    image: qamarAbbas,
  },
  {
    name: "Ali Gohar Qureshi",
    role: "Outreach & Engagement",
    description: "Strengthens partnerships and expands student reach through strategic outreach.",
    image: aliGoharQureshi,
  },
  {
    name: "Shaheer Ali",
    role: "Campus Coordination",
    description: "Builds campus presence, organizing events and connecting youth leaders.",
    image: shaheer,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TeamMemberCard({
  member,
  index,
  isInView,
}: {
  member: (typeof teamMembers)[number];
  index: number;
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(member.image) && !imageError;
  const initials = getInitials(member.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        className={cn(
          "team-card overflow-hidden p-0 transition-all duration-500",
          "hover:-translate-y-1 hover:shadow-lift",
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {showImage ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-primary">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                {initials ? (
                  <span className="text-lg font-bold text-primary-foreground">{initials}</span>
                ) : (
                  <User className="h-7 w-7 text-primary-foreground/70" aria-hidden />
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
                Photo soon
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center p-6 text-center">
          <h3 className="text-lg font-bold tracking-tight text-foreground">{member.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">{member.role}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
          {member.profileHref && (
            <Link
              to={member.profileHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5"
            >
              View profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="People"
          title="Meet Our"
          highlight="Team"
          description="Passionate young individuals working together to empower students across Pakistan."
        />

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
