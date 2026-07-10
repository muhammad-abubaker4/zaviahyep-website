import balochistanPhysioLogo from "@/assets/partners/BPC_Logo.png";
import youngLeadersLogo from "@/assets/partners/YLC_Logo.jpg";
import youthCombinationLogo from "@/assets/partners/YCP_Logo.png";
import iccd from "@/assets/partners/ICCD_Logo.png";
import rahnumaaLogo from "@/assets/partners/Rahnumaa_Logo.png";
import paxYouthLogo from "@/assets/partners/Pax_Youth_Logo.png";
import ygpLogo from "@/assets/partners/YGP_Logo.png";
import superStudentPkLogo from "@/assets/partners/SuperStudentPK_Logo.png";

export type Partner = {
  name: string;
  type: string;
  description: string;
  logo: string;
};

export const partners: Partner[] = [
  {
    name: "Balochistan Physio Club",
    type: "Strategic Partner",
    description: "Promoting awareness about physiotherapy and opportunities for young medical professionals.",
    logo: balochistanPhysioLogo,
  },
  {
    name: "Young Leaders Connect",
    type: "Official Community Partner",
    description: "Leadership and wellness retreat program for young professionals and aspiring entrepreneurs.",
    logo: youngLeadersLogo,
  },
  {
    name: "International Connection for Cultural Diplomacy",
    type: "Strategic Community Partner",
    description: "Youth led platform promoting cultural diplomacy, international relations, and global connectivity.",
    logo: iccd,
  },
  {
    name: "Youth Combination Pakistan",
    type: "Supporting Partner",
    description: "Youth driven organization focused on mentorship, mindset growth, and skill building.",
    logo: youthCombinationLogo,
  },
  {
    name: "Rahnumaa",
    type: "Community Partner",
    description:
      "Dedicated to guiding youth toward brighter prospects, supporting educational journeys and professional futures through strategic mentorship and guidance.",
    logo: rahnumaaLogo,
  },
  {
    name: "Pax Youth Initiative",
    type: "Strategic Community Partner",
    description:
      "Aligned with UN SDGs 4 and 16: peace education, digital literacy, and meaningful youth dialogue, including collaboration around their Peace Talks series.",
    logo: paxYouthLogo,
  },
  {
    name: "Youth General Parliament",
    type: "Youth Leadership Partner",
    description:
      "A simulated parliamentary experience that empowers young people through policy making, legislative debate, and engagement with real world experts.",
    logo: ygpLogo,
  },
  {
    name: "SuperStudent PK",
    type: "Educational & Career Partner",
    description:
      "Led by education and career coach Sama Zaidi: one on one career counseling, designing star careers, and youth voice through the Super Space Podcast.",
    logo: superStudentPkLogo,
  },
];
