import balochistanPhysioLogo from "@/assets/partners/BPC_Logo.png";
import youngLeadersLogo from "@/assets/partners/YLC_Logo.jpg";
import youthCombinationLogo from "@/assets/partners/YCP_Logo.png";
import iccd from "@/assets/partners/ICCD_Logo.png";
import rahnumaaLogo from "@/assets/partners/Rahnumaa_Logo.png";
import paxYouthLogo from "@/assets/partners/Pax_Youth_Logo.png";
import ygpLogo from "@/assets/partners/YGP_Logo.png";
import superStudentPkLogo from "@/assets/partners/SuperStudentPK_Logo.png";
import together2050Logo from "@/assets/partners/Together2050_Logo.png";
import digexnLogo from "@/assets/partners/DIGEXN_Logo.jpg";
import globalOpportunitiesHubLogo from "@/assets/partners/Global_Opportunities_Hub_Logo.jpg";

export type Partner = {
  name: string;
  type: string;
  description: string;
  logo: string;
  /** Extra zoom for logos with large built-in padding. */
  logoScale?: number;
};

export const partners: Partner[] = [
  {
    name: "Together2050",
    type: "Strategic Partnership",
    description:
      "Connecting people, ideas, and opportunities for learning, collaboration, contribution, and meaningful progress toward 2050 and beyond.",
    logo: together2050Logo,
    logoScale: 1.45,
  },
  {
    name: "Balochistan Physio Club",
    type: "Strategic Partner",
    description: "Promoting physiotherapy awareness and opportunities for young people.",
    logo: balochistanPhysioLogo,
  },
  {
    name: "Young Leaders Connect",
    type: "Official Community Partner",
    description:
      "Leadership and wellness programs for young professionals and aspiring entrepreneurs.",
    logo: youngLeadersLogo,
  },
  {
    name: "International Connection for Cultural Diplomacy",
    type: "Strategic Community Partner",
    description:
      "Promoting cultural diplomacy, international relations, and global connectivity among youth.",
    logo: iccd,
    logoScale: 1.35,
  },
  {
    name: "Youth Combination Pakistan",
    type: "Supporting Partner",
    description: "Youth-driven organization focused on mentorship, mindset growth, and skill building.",
    logo: youthCombinationLogo,
  },
  {
    name: "Rahnumaa",
    type: "Community Partner",
    description:
      "Supporting youth through educational guidance, mentorship, and professional development.",
    logo: rahnumaaLogo,
    logoScale: 1.4,
  },
  {
    name: "Pax Youth Initiative",
    type: "Strategic Community Partner",
    description:
      "Peace education, digital literacy, and youth dialogue aligned with UN SDGs 4 and 16.",
    logo: paxYouthLogo,
    logoScale: 1.3,
  },
  {
    name: "SuperStudent PK",
    type: "Educational & Career Partner",
    description:
      "Career counseling and youth voice through coaching and the Super Space Podcast.",
    logo: superStudentPkLogo,
  },
  {
    name: "Youth General Parliament",
    type: "Youth Leadership Partner",
    description:
      "Creating parliamentary learning experiences that strengthen young people's understanding of policy and civic participation.",
    logo: ygpLogo,
  },
  {
    name: "DIGEXN",
    type: "Learning & Technology Partner",
    description:
      "A digital education and training company focused on practical technology and AI solutions.",
    logo: digexnLogo,
    logoScale: 1.35,
  },
  {
    name: "Global Opportunities Hub",
    type: "Education & Opportunities Partner",
    description:
      "Supporting students pursuing international education through scholarships, university applications, visa guidance, and study-abroad support.",
    logo: globalOpportunitiesHubLogo,
  },
];
