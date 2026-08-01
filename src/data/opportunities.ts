import {
  Users,
  HeartHandshake,
  GraduationCap,
  Megaphone,
  Briefcase,
  Handshake,
  type LucideIcon,
} from "lucide-react";

/**
 * Central config for Get Involved opportunities.
 *
 * Future Laravel backend: change only `applyUrl` (or swap `getApplyUrl`).
 * Pages, routes, and CTAs stay the same.
 */
export type OpportunitySlug =
  | "member"
  | "volunteer"
  | "mentor"
  | "ambassador"
  | "core-team"
  | "partnerships";

export type Opportunity = {
  slug: OpportunitySlug;
  title: string;
  shortTitle: string;
  navLabel: string;
  /** One-line card summary. */
  tagline: string;
  /** Compact metadata chips for the hub card. */
  chips: string[];
  /** Hub card CTA label (card always links to the detail page). */
  cardCta: "Explore" | "Apply";
  description: string;
  whoShouldApply: string;
  benefits: string[];
  commitment: string;
  /** Official application destination (Google Form today; Laravel portal later). */
  applyUrl: string;
  ctaLabel: string;
  secondaryCta?: { label: string; href: string };
  icon: LucideIcon;
  overview: string;
  purpose: string;
  eligibility: string[];
  responsibilities: string[];
  timeline: string[];
  faqs: Array<{ q: string; a: string }>;
  seoDescription: string;
};

/** Compact journey for hub timeline. */
export const APPLICATION_JOURNEY = [
  { label: "Choose", icon: "compass" as const },
  { label: "Apply", icon: "file" as const },
  { label: "Review", icon: "search" as const },
  { label: "Interview", icon: "users" as const },
  { label: "Onboarding", icon: "sparkles" as const },
] as const;

export const WHY_JOIN = [
  {
    title: "Access",
    body: "Free mentorship and learning without barriers.",
  },
  {
    title: "Awareness",
    body: "Clarity on careers, skills, and next steps.",
  },
  {
    title: "Aspiration",
    body: "A community that helps you lead and grow.",
  },
] as const;

export const GET_INVOLVED_FAQS = [
  {
    q: "Who can join Zaviah?",
    a: "Any student in Pakistan looking for guidance, skill-building, or community support can apply to become a member. Other paths include volunteering, mentorship, campus ambassador, and core team roles.",
  },
  {
    q: "Is Zaviah free to join?",
    a: "Yes. Our mentorship sessions, workshops, and community programs are free for students.",
  },
  {
    q: "How do I apply?",
    a: "Choose an opportunity, read the details, then complete the official Google Form on that page. Our team reviews applications and shares next steps.",
  },
  {
    q: "How can my organization partner?",
    a: "Open Partner With Zaviah for collaboration details, then submit the official partnership request form.",
  },
] as const;

export const opportunities: Opportunity[] = [
  {
    slug: "member",
    title: "Become a Member",
    shortTitle: "Member",
    navLabel: "Become a Member",
    tagline: "Join Pakistan's fastest-growing youth community.",
    chips: ["Students", "Learning", "Community"],
    cardCta: "Explore",
    description:
      "Join Zaviah's youth community, participate in programs, events, workshops, networking opportunities, and leadership initiatives.",
    whoShouldApply:
      "Students and young people across Pakistan who want mentorship, skill-building, and a supportive peer community.",
    benefits: [
      "Access to free mentorship sessions and workshops",
      "Networking with peers and professionals nationwide",
      "Leadership and personal growth opportunities",
      "Community events and collaborative projects",
    ],
    commitment:
      "Flexible: join sessions and events that fit your schedule (typically a few hours per month).",
    applyUrl: "https://forms.gle/qx11biyVqWXmHbnv9",
    ctaLabel: "Apply Now",
    icon: Users,
    overview:
      "Membership is your entry into the Zaviah community. Members learn with mentors, join workshops, and grow alongside students from across Pakistan.",
    purpose:
      "To give every student accessible mentorship, awareness, and aspiration without cost as a barrier.",
    eligibility: [
      "Student or young learner based in Pakistan (or Pakistani diaspora seeking community programs)",
      "Willingness to participate respectfully and consistently",
      "Interest in personal growth, leadership, or career guidance",
    ],
    responsibilities: [
      "Attend sessions you register for whenever possible",
      "Engage respectfully with mentors and peers",
      "Share feedback so we can improve programs",
    ],
    timeline: [
      "Submit the Member / Volunteer / Mentor form",
      "Team reviews your application (usually within 1-2 weeks)",
      "You receive next steps via email or WhatsApp",
      "Join orientation and upcoming sessions",
    ],
    faqs: [
      {
        q: "Is membership free?",
        a: "Yes. Mentorship sessions, workshops, and community programs for members are free.",
      },
      {
        q: "Do I need prior experience?",
        a: "No. Members come from many backgrounds. Curiosity and commitment matter most.",
      },
    ],
    seoDescription:
      "Join Zaviah as a member: free mentorship, workshops, and youth community programs across Pakistan.",
  },
  {
    slug: "volunteer",
    title: "Volunteer With Zaviah",
    shortTitle: "Volunteer",
    navLabel: "Volunteer",
    tagline: "Build skills while supporting events and campaigns.",
    chips: ["Volunteer", "Remote", "Hands-on"],
    cardCta: "Explore",
    description:
      "Support Zaviah's activities, events, campaigns, and community initiatives while developing practical skills and professional experience.",
    whoShouldApply:
      "Students and young professionals who want hands-on experience in events, outreach, content, or operations.",
    benefits: [
      "Real project and event experience",
      "Skill development in coordination and communication",
      "Certificates and recognition for meaningful contributions",
      "Closer connection to Zaviah's mission and team",
    ],
    commitment: "Project-based: often 4-8 hours per week during active campaigns or events.",
    applyUrl: "https://forms.gle/qx11biyVqWXmHbnv9",
    ctaLabel: "Apply Now",
    icon: HeartHandshake,
    overview:
      "Volunteers help Zaviah run sessions, campaigns, and community work. You learn by doing and strengthen the platform for peers nationwide.",
    purpose:
      "To build capacity behind the scenes so more students can access mentorship and programs.",
    eligibility: [
      "Reliable communication and follow-through",
      "Interest in youth development, events, or digital outreach",
      "Ability to collaborate remotely across Pakistan",
    ],
    responsibilities: [
      "Support assigned tasks for events or campaigns",
      "Coordinate with team leads and meet agreed deadlines",
      "Uphold Zaviah's values of respect and inclusion",
    ],
    timeline: [
      "Submit the shared Member / Volunteer / Mentor form (select Volunteer)",
      "Review by the coordination team",
      "Role matching and briefing",
      "Start contributing on active initiatives",
    ],
    faqs: [
      {
        q: "Is volunteering paid?",
        a: "Volunteer roles are unpaid contribution opportunities focused on learning and impact. Core Team roles are separate.",
      },
      {
        q: "Can I volunteer remotely?",
        a: "Yes. Most coordination happens online across cities in Pakistan.",
      },
    ],
    seoDescription:
      "Volunteer with Zaviah: support events and campaigns while building skills and community impact.",
  },
  {
    slug: "mentor",
    title: "Become a Mentor",
    shortTitle: "Mentor",
    navLabel: "Mentor",
    tagline: "Share your expertise with students across Pakistan.",
    chips: ["Mentorship", "Flexible", "Impact"],
    cardCta: "Explore",
    description:
      "Guide, mentor, and support students and young professionals by sharing your expertise and experience.",
    whoShouldApply:
      "Professionals, educators, and experienced peers ready to share knowledge in career, academics, leadership, or skills.",
    benefits: [
      "Meaningful impact on students nationwide",
      "Flexible session formats (online workshops or talks)",
      "Recognition as part of Zaviah's mentor network",
      "Opportunity to shape the next generation of leaders",
    ],
    commitment: "Typically 1-2 sessions per quarter, or as agreed with the programs team.",
    applyUrl: "https://forms.gle/qx11biyVqWXmHbnv9",
    ctaLabel: "Apply Now",
    icon: GraduationCap,
    overview:
      "Mentors are the heart of Zaviah's learning experience. You share practical insights that help students navigate careers, skills, and confidence.",
    purpose:
      "To connect lived expertise with students who lack local access to mentors and role models.",
    eligibility: [
      "Relevant professional, academic, or community experience",
      "Clear communication and a student-first mindset",
      "Availability for scheduled online sessions",
    ],
    responsibilities: [
      "Prepare and deliver sessions aligned with Zaviah's values",
      "Engage respectfully with diverse student audiences",
      "Coordinate timing and topic with the programs team",
    ],
    timeline: [
      "Submit the shared form (select Mentor)",
      "Team reviews background and topic fit",
      "Topic and date coordination",
      "Session delivery and feedback",
    ],
    faqs: [
      {
        q: "Are mentor sessions online?",
        a: "Most sessions are online so students across Pakistan can join. Occasional in-person collaborations may apply.",
      },
      {
        q: "Can I propose my own topic?",
        a: "Yes. Share your expertise area in the form and we will align it with community needs.",
      },
    ],
    seoDescription:
      "Become a Zaviah mentor: guide students through workshops and mentorship sessions across Pakistan.",
  },
  {
    slug: "ambassador",
    title: "Become a Campus Ambassador",
    shortTitle: "Campus Ambassador",
    navLabel: "Campus Ambassador",
    tagline: "Represent Zaviah and grow your campus community.",
    chips: ["Campus", "Leadership", "Outreach"],
    cardCta: "Explore",
    description:
      "Represent Zaviah within your university and help build an active student community.",
    whoShouldApply:
      "Enrolled university or college students who enjoy outreach, campus leadership, and community building.",
    benefits: [
      "Leadership experience on campus",
      "Official ambassador recognition",
      "Direct support from the Zaviah team",
      "Priority access to programs and networking",
    ],
    commitment: "Usually 3-5 hours per week during the academic term.",
    applyUrl: "https://forms.gle/Qyy5pJ4Zt4Z8ph5a9",
    ctaLabel: "Apply Now",
    icon: Megaphone,
    overview:
      "Campus Ambassadors extend Zaviah's reach into universities by hosting awareness drives, inviting peers to sessions, and building local chapters of support.",
    purpose:
      "To grow student communities where mentorship and opportunity are discovered peer-to-peer.",
    eligibility: [
      "Currently enrolled at a college or university in Pakistan",
      "Strong interpersonal and organizational skills",
      "Commitment for at least one academic semester",
    ],
    responsibilities: [
      "Promote Zaviah programs on campus",
      "Coordinate outreach with the ambassador lead",
      "Report progress and feedback regularly",
    ],
    timeline: [
      "Submit the Campus Ambassador form",
      "Review and shortlisting",
      "Interview (if required)",
      "Ambassador onboarding and campus kickoff",
    ],
    faqs: [
      {
        q: "Do I need a large following?",
        a: "No. Consistency, communication, and campus presence matter more than follower counts.",
      },
      {
        q: "Can there be more than one ambassador per campus?",
        a: "Yes, depending on campus size and activity. Apply and we will place you accordingly.",
      },
    ],
    seoDescription:
      "Apply to become a Zaviah Campus Ambassador and build a student community at your university.",
  },
  {
    slug: "core-team",
    title: "Join the Core Team",
    shortTitle: "Core Team",
    navLabel: "Core Team",
    tagline: "Own projects and help lead Zaviah forward.",
    chips: ["Leadership", "Ownership", "Operations"],
    cardCta: "Explore",
    description:
      "Become part of Zaviah's leadership and operational team by taking ownership of projects and departments.",
    whoShouldApply:
      "Highly committed individuals ready for ownership in programs, outreach, operations, content, or partnerships.",
    benefits: [
      "Leadership ownership of real initiatives",
      "Close collaboration with founders and department leads",
      "Portfolio-ready project experience",
      "Shape Zaviah's national direction",
    ],
    commitment: "Significant: typically 8-15 hours per week with shared accountability.",
    applyUrl: "https://forms.gle/9qUtVMFduFQ75n5Y8",
    ctaLabel: "Apply Now",
    icon: Briefcase,
    overview:
      "The Core Team runs Zaviah day to day across programs, outreach, operations, and growth. This path is for people ready to lead, not only participate.",
    purpose:
      "To build a reliable leadership layer that scales youth empowerment sustainably.",
    eligibility: [
      "Proven reliability in prior roles (campus, volunteer, or professional)",
      "Strong communication and ownership mindset",
      "Availability for recurring team coordination",
    ],
    responsibilities: [
      "Own assigned projects or department workflows",
      "Coordinate with other leads and report progress",
      "Uphold quality, timelines, and community standards",
    ],
    timeline: [
      "Submit the Core Team form",
      "Application review",
      "Interview with leadership",
      "Role assignment, orientation, and onboarding",
    ],
    faqs: [
      {
        q: "Is Core Team the same as volunteering?",
        a: "No. Core Team roles carry ongoing ownership and higher time commitment than project volunteering.",
      },
      {
        q: "Do I need prior Zaviah experience?",
        a: "Helpful but not required. Demonstrated leadership and follow-through are essential.",
      },
    ],
    seoDescription:
      "Join Zaviah's Core Team: lead programs, outreach, and operations for youth empowerment nationwide.",
  },
  {
    slug: "partnerships",
    title: "Partner With Zaviah",
    shortTitle: "Partnerships",
    navLabel: "Partnerships",
    tagline: "Collaborate with us to expand youth impact.",
    chips: ["Organizations", "MoUs", "Programs"],
    cardCta: "Explore",
    description:
      "Universities, NGOs, companies, student societies, media organizations, and government institutions can collaborate with Zaviah.",
    whoShouldApply:
      "Organizations seeking MoUs, co-hosted programs, sponsorships, media collaboration, or campus partnerships.",
    benefits: [
      "Access to a nationwide youth network",
      "Co-branded programs and visibility",
      "Aligned social-impact collaboration",
      "Structured partnership pathway via official request form",
    ],
    commitment: "Defined per partnership: from one-off events to multi-month collaborations.",
    applyUrl: "https://forms.gle/9M9phrhTQNiJfLEw5",
    ctaLabel: "Submit Partnership Request",
    secondaryCta: {
      label: "Download Organization Profile",
      href: "/docs/Zaviah-Organization-Profile-2026.pdf",
    },
    icon: Handshake,
    overview:
      "Partnerships multiply Zaviah's impact. We collaborate with institutions that share our mission of Access, Awareness, and Aspiration for youth.",
    purpose:
      "To build lasting collaborations that expand mentorship, learning, and opportunity for students.",
    eligibility: [
      "Registered organization, institution, or established student society",
      "Clear collaboration interest (programs, outreach, media, or sponsorship)",
      "Alignment with youth empowerment and ethical partnership standards",
    ],
    responsibilities: [
      "Share accurate organizational details in the partnership request",
      "Designate a point of contact for follow-up",
      "Honor agreed scopes, timelines, and brand guidelines",
    ],
    timeline: [
      "Submit the Collaboration & Partnership form",
      "Zaviah reviews fit and capacity",
      "Discovery call / MoU discussion (if aligned)",
      "Kickoff of agreed collaboration",
    ],
    faqs: [
      {
        q: "Is this form for individual membership?",
        a: "No. Individuals should apply via Member, Volunteer, Mentor, Ambassador, or Core Team pages. This form is for organizations.",
      },
      {
        q: "Can we start with a single event?",
        a: "Yes. Many partnerships begin with a pilot workshop or campus activation.",
      },
    ],
    seoDescription:
      "Partner with Zaviah: universities, NGOs, companies, and institutions collaborating for youth empowerment.",
  },
];

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

/** Future backend: return internal portal path instead of Google Form URL. */
export function getApplyUrl(opportunity: Opportunity): string {
  return opportunity.applyUrl;
}

