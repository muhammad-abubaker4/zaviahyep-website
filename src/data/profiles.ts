import hafsaKhalil from "@/assets/team/Hafsa_Khalil.jpeg";
import muhammadAbubaker from "@/assets/team/Muhammad_Abubaker.jpeg";

export type ProfileLinks = {
  email?: string;
  instagram?: string;
  linkedin?: string;
};

export type ProfileEntry = {
  title: string;
  org?: string;
  period?: string;
  description: string;
};

export type ProfileEducation = {
  degree: string;
  institution: string;
  period?: string;
};

export type Profile = {
  name: string;
  role: string;
  path: string;
  tagline: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  expertise: string[];
  /** Only roles that speak to the work at Zaviah; this is a leadership page, not a CV. */
  achievements: ProfileEntry[];
  education: ProfileEducation[];
  links: ProfileLinks;
};

export const profiles: Record<"founder" | "coFounder", Profile> = {
  founder: {
    name: "Hafsa Khalil",
    role: "Founder & CEO",
    path: "/founder",
    tagline:
      "Visionary leader committed to empowering youth through mentorship and learning.",
    image: hafsaKhalil,
    imageAlt: "Hafsa Khalil, Founder and CEO of Zaviah",
    metaTitle: "Hafsa Khalil - Founder",
    metaDescription:
      "Meet Hafsa Khalil, Founder & CEO of Zaviah - empowering youth across Pakistan through mentorship, leadership, and learning.",
    intro:
      "Hafsa Khalil founded Zaviah as a nationwide initiative dedicated to empowering students across Pakistan through mentorship and awareness. She has mentored 300+ students and delivered 10+ workshops on leadership and entrepreneurship, and she leads the organisation's strategy, outreach, and partnerships.",
    expertise: [
      "Leadership & Team Management",
      "Mentorship & Youth Development",
      "Public Speaking & Communication",
      "Program & Project Coordination",
      "Partnerships & Outreach",
      "Community Engagement",
    ],
    achievements: [
      {
        title: "Founder & CEO",
        org: "Zaviah",
        period: "Jul 2025 – Present",
        description:
          "Leads a 10-member team across strategy, outreach, and daily operations, with 5+ sessions engaging over 250 students.",
      },
      {
        title: "Territory Leader",
        org: "THAAM - Aspire Leaders Program",
        period: "Feb 2025 – Present",
        description:
          "Leads 12 team members across the Attock and Kohat chapters, and has delivered 2 leadership sessions to 50+ participants.",
      },
      {
        title: "Campus Head at KUST",
        org: "Youth Organization Pakistan",
        period: "Jan 2024 – Present",
        description: "Empowered 100+ students through leadership and SDG initiatives on campus.",
      },
      {
        title: "Speaker & Team Member",
        org: "Young Leaders Connect",
        period: "May 2025 – Present",
        description:
          "Delivered a session on entrepreneurship and youth leadership to 40+ participants at YLC 1.0.",
      },
      {
        title: "Member",
        org: "Pakistan Youth Parliament",
        period: "Sep 2024 – Sep 2025",
        description: "Contributed to policy discussion and youth advocacy for young people.",
      },
    ],
    education: [
      {
        degree: "BS in Biotechnology and Genetic Engineering",
        institution: "Kohat University of Science and Technology (KUST)",
        period: "2020 – 2024",
      },
    ],
    links: {
      email: "hafsakhalil63@gmail.com",
      linkedin: "https://www.linkedin.com/in/hafsa-khalil-entrepreneur4243/",
      instagram: "https://www.instagram.com/hafsa._.khalil/",
    },
  },

  coFounder: {
    name: "Muhammad Abubaker",
    role: "Co-Founder",
    path: "/co-founder",
    tagline:
      "Leads operations, strategy, and digital direction for meaningful student communities.",
    image: muhammadAbubaker,
    imageAlt: "Muhammad Abubaker, Co-Founder of Zaviah",
    metaTitle: "Muhammad Abubaker - Co-Founder",
    metaDescription:
      "Meet Muhammad Abubaker, Co-Founder of Zaviah - leading operations, strategy, and digital direction for student communities nationwide.",
    intro:
      "Muhammad Abubaker is the Co-Founder of Zaviah, where he turns the organisation's vision into projects that reach students. He focuses on operations: building and training the team, coordinating workflows, and making sure youth-led initiatives are executed on time. His background in artificial intelligence and data science shapes Zaviah's digital direction.",
    expertise: [
      "Operations Management",
      "Team Coordination",
      "Project Delivery",
      "Onboarding & Training",
      "Cross-functional Collaboration",
      "Digital & AI Strategy",
    ],
    achievements: [
      {
        title: "Co-Founder",
        org: "Zaviah",
        description:
          "Recruited and manages a 10-member cross-functional team with onboarding and training plans, and coordinates the project workflows that keep youth-led initiatives on schedule.",
      },
      {
        title: "Cabinet Member",
        org: "Youth Parliament of Pakistan",
        description:
          "Drives youth-led initiatives and engages stakeholders to deliver community projects.",
      },
      {
        title: "AI Engineer",
        org: "Go PK Resources (SMC-Private) Limited",
        description:
          "Builds AI systems professionally, experience he brings to Zaviah's digital tools and workflows.",
      },
    ],
    education: [
      {
        degree: "BS in Computer Science (Artificial Intelligence)",
        institution: "Pir Mehr Ali Shah Arid Agriculture University, Rawalpindi",
        period: "2021 – 2025",
      },
    ],
    links: {
      email: "muhammadabubaker1206@gmail.com",
      linkedin: "https://www.linkedin.com/in/muhammad-abubaker4",
      instagram: "https://www.instagram.com/muhammad._abubaker/",
    },
  },
};
