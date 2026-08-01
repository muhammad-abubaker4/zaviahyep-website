import type { ComponentType } from "react";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  LinktreeIcon,
  TikTokIcon,
} from "@/components/icons/SocialIcons";

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  Icon: ComponentType<{ className?: string }>;
  bgClass: string;
  hoverClass?: string;
};

/** Social platforms for Follow Us (Contact section) - no WhatsApp (shown under Contact Information). */
export const followUsLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/zaviahorg",
    Icon: InstagramIcon,
    bgClass: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    hoverClass: "hover:opacity-90",
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/zaviahorg",
    Icon: FacebookIcon,
    bgClass: "bg-[#1877F2]",
    hoverClass: "hover:bg-[#166fe5]",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/zaviahorg",
    Icon: LinkedInIcon,
    bgClass: "bg-[#0A66C2]",
    hoverClass: "hover:bg-[#004182]",
  },
  {
    id: "linktree",
    label: "Linktree",
    url: "https://www.linktr.ee/zaviahorg",
    Icon: LinktreeIcon,
    bgClass: "bg-[#43E660]",
    hoverClass: "hover:bg-[#39c653]",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@zaviahorg",
    Icon: TikTokIcon,
    bgClass: "bg-black",
    hoverClass: "hover:bg-neutral-800",
  },
];

/** Footer social links (WhatsApp is in Contact section + floating button). */
export const footerSocialLinks: SocialLink[] = [...followUsLinks];
