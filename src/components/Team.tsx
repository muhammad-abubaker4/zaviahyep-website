import { useState } from "react";
import { m, useInView } from "framer-motion";
import { revealTransition, STAGGER } from "@/lib/motion";
import { useRef } from "react";
import { User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";

import hafsaKhalil from "@/assets/team/Hafsa_Khalil.jpeg";
import muhammadAbubaker from "@/assets/team/Muhammad_Abubaker.jpeg";
import qamarAbbas from "@/assets/team/Qamar_Abbas.jpeg";
import amnaIrfan from "@/assets/team/Amna_Irfan.jpeg";
import shaheer from "@/assets/team/Shaheer.jpeg";
import aliGoharQureshi from "@/assets/team/Ali Gohar.jpg";
import saeedaChaudhry from "@/assets/team/Saeeda-Chaudhry.jpeg";
import saadButt from "@/assets/team/Saad-butt.jpeg";
import khadijaFatima from "@/assets/team/Khadija-Fatima.jpg";
import fidaHussain from "@/assets/team/Fida-Hussain.jpeg";

type Member = {
  name: string;
  role: string;
  description: string;
  image: string;
  profileHref?: string;
};

type Group = {
  /** Split in two so the heading can carry the same two-tone treatment as SectionHeader. */
  title: string;
  highlight: string;
  members: Member[];
  /** Half-width groups share a row on large screens. */
  half?: boolean;
};

const teamGroups: Group[] = [
  {
    title: "Executive",
    highlight: "Leadership",
    members: [
      {
        name: "Hafsa Khalil",
        role: "Founder & CEO",
        description:
          "Visionary leader committed to empowering youth through mentorship and learning.",
        image: hafsaKhalil,
        profileHref: "/founder",
      },
      {
        name: "Muhammad Abubaker",
        role: "Co-Founder",
        description:
          "Leads operations, strategy, and digital direction for meaningful student communities.",
        image: muhammadAbubaker,
        profileHref: "/co-founder",
      },
    ],
  },
  {
    title: "Outreach &",
    highlight: "Community",
    members: [
      {
        name: "Amna Irfan",
        role: "Session Host",
        description:
          "Hosts Zaviah's online mentorship sessions and connects students with mentors nationwide.",
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
        description:
          "Strengthens partnerships and expands student reach through strategic outreach.",
        image: aliGoharQureshi,
      },
      {
        name: "Saad Butt",
        role: "Director of Communications",
        description: "Shapes how Zaviah speaks to students, partners, and the wider public.",
        image: saadButt,
      },
    ],
  },
  {
    title: "Administration &",
    highlight: "Operations",
    half: true,
    members: [
      {
        name: "Fida Hussain",
        role: "Operations Lead",
        description: "Keeps programs running day to day, from planning through to delivery.",
        image: fidaHussain,
      },
      {
        name: "Saeeda Chaudhry",
        role: "HR & Community Manager",
        description:
          "Looks after the team behind Zaviah and keeps the wider community engaged and supported.",
        image: saeedaChaudhry,
      },
    ],
  },
  {
    title: "Content &",
    highlight: "Media",
    half: true,
    members: [
      {
        name: "Khadija Fatima",
        role: "Content Creator",
        description: "Creates the content behind Zaviah's campaigns across its social channels.",
        image: khadijaFatima,
      },
      {
        name: "Shaheer Ali",
        role: "Media & Graphics",
        description:
          "Produces the visuals behind Zaviah's events and campaigns, from graphics to social media.",
        image: shaheer,
      },
    ],
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
  member: Member;
  index: number;
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(member.image) && !imageError;
  const initials = getInitials(member.name);

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={revealTransition(index * STAGGER.base)}
      className="group flex w-full flex-col sm:w-56"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
        {showImage ? (
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at Zaviah`}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary">
            {initials ? (
              <span className="text-2xl font-bold text-primary-foreground">{initials}</span>
            ) : (
              <User className="h-8 w-8 text-primary-foreground/70" aria-hidden />
            )}
          </div>
        )}

        {/* Name sits on the photo so the card stays compact and the face carries the card. */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-white/70">
            {member.role}
          </p>
          <h3 className="mt-1 text-base font-bold tracking-tight text-white">{member.name}</h3>
        </div>
      </div>

      <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {member.description}
      </p>
      {member.profileHref && (
        <Link
          to={member.profileHref}
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5"
        >
          View profile
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </m.article>
  );
}

function TeamGroup({ group, isInView }: { group: Group; isInView: boolean }) {
  return (
    <div>
      {/* Scaled-down version of SectionHeader, so group titles speak the same language. */}
      <header className="mb-9 text-center">
        <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {group.title} <span className="text-primary/60">{group.highlight}</span>
        </h3>
        <div
          className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-foreground to-transparent"
          aria-hidden
        />
      </header>

      {/* Centring lets a two-person group sit as a pair without a hole in the grid. */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
        {group.members.map((member, index) => (
          <TeamMemberCard key={member.name} member={member} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}

const fullGroups = teamGroups.filter((group) => !group.half);
const halfGroups = teamGroups.filter((group) => group.half);

const Team = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-light" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        {!hideHeader && (
          <SectionHeader
            eyebrow="People"
            title="Meet Our"
            highlight="Team"
            description="Passionate young individuals working together to empower students across Pakistan."
          />
        )}

        <div className="mx-auto max-w-5xl space-y-16">
          {fullGroups.map((group) => (
            <TeamGroup key={group.highlight} group={group} isInView={isInView} />
          ))}

          {halfGroups.length > 0 && (
            <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
              {halfGroups.map((group) => (
                <TeamGroup key={group.highlight} group={group} isInView={isInView} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
