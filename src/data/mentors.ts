import sameenMeer from "@/assets/mentors/sameen-meer.jpg";
import samaZaidi from "@/assets/mentors/sama-zaidi.jpg";
import osamaNadeemQureshi from "@/assets/mentors/osama-nadeem-qureshi.png";
import bismahMirza from "@/assets/mentors/bismah-mirza.jpg";
import amnaIrfan from "@/assets/mentors/amna-irfan.jpg";
import hafsaKhalil from "@/assets/mentors/hafsa-khalil.jpg";
import saeedaChaudhry from "@/assets/mentors/saeeda-ch.jpg";
import amnaSardar from "@/assets/mentors/amna-sardar.jpg";
import farhanAliBaloch from "@/assets/mentors/farhan-ali-baloch.jpg";
import ahsanLakhani from "@/assets/mentors/ahsan-lakhani.jpg";
import drAtifAli from "@/assets/mentors/dr-atif-ali.jpg";
import drSassiMalikSher from "@/assets/mentors/dr-sassi-malik-sher.jpg";
import abdulWahab from "@/assets/mentors/abdul-wahab.jpg";
import zunairaRehman from "@/assets/mentors/zunaira-rehman.jpg";
import arbeehaZahid from "@/assets/mentors/arbeeha-zahid.jpg";
import hibaSyed from "@/assets/mentors/hiba-syed.jpg";
import duaAmjad from "@/assets/mentors/dua-amjad.jpg";
import muhammadUsmanJamal from "@/assets/mentors/muhammad-usman.jpg";
import ibtisamBabar from "@/assets/mentors/ibtisam-babar.jpg";

export type GuestSpeaker = {
  id: string;
  displayName: string;
  role: string;
  image?: string;
  /** CSS object-position for face framing */
  imagePosition?: string;
  /** Use contain for cutout portraits on a soft background */
  imageFit?: "cover" | "contain";
};

export const guestSpeakers: GuestSpeaker[] = [
  {
    id: "sameen-meer",
    displayName: "Ms. Sameen Meer",
    role: "International Students Ambassador",
    image: sameenMeer,
    imagePosition: "center 15%",
  },
  {
    id: "sama-zaidi",
    displayName: "Ms. Sama Zaidi",
    role: "Founder, SuperStudent PK",
    image: samaZaidi,
    imagePosition: "center 15%",
  },
  {
    id: "osama-nadeem",
    displayName: "Mr. Osama Nadeem Qureshi",
    role: "Chairman, Pakistan Youth Parliament by ITP",
    image: osamaNadeemQureshi,
    imagePosition: "center 12%",
  },
  {
    id: "bisma-mirza",
    displayName: "Ms. Bisma Mirza",
    role: "Co-Founder, Red International",
    image: bismahMirza,
    imagePosition: "center 20%",
  },
  {
    id: "amna-irfan",
    displayName: "Ms. Amna Irfan",
    role: "Psychologist & APA Member",
    image: amnaIrfan,
    imagePosition: "center 20%",
  },
  {
    id: "hafsa-khalil",
    displayName: "Ms. Hafsa Khalil",
    role: "Founder & CEO, Zaviah",
    image: hafsaKhalil,
    imagePosition: "center 15%",
  },
  {
    id: "saeeda-chaudhry",
    displayName: "Ms. Saeeda Chaudhry",
    role: "Behavioral Science Professional",
    image: saeedaChaudhry,
    imagePosition: "center 15%",
  },
  {
    id: "amna-sardar",
    displayName: "Ms. Amna Sardar",
    role: "Member of Provincial Assembly, KPK",
    image: amnaSardar,
    imagePosition: "center 12%",
  },
  {
    id: "farhan-ali-baloch",
    displayName: "Mr. Farhan Ali Baloch",
    role: "Social Activist",
    image: farhanAliBaloch,
    imagePosition: "center 18%",
  },
  {
    id: "ahsan-lakhani",
    displayName: "Mr. Ahsan Lakhani",
    role: "Journalist & Motivational Speaker",
    image: ahsanLakhani,
    imagePosition: "center 15%",
  },
  {
    id: "dr-atif-ali",
    displayName: "Dr. Atif Ali",
    role: "AI Scientist & Author",
    image: drAtifAli,
    imagePosition: "center 10%",
  },
  {
    id: "dr-sassi-malik",
    displayName: "Dr. Sassi Malik Sher",
    role: "CSS Officer & Women's Rights Advocate",
    image: drSassiMalikSher,
    imagePosition: "center 22%",
  },
  {
    id: "abdul-wahab",
    displayName: "Mr. Abdul Wahab",
    role: "PhD Scholar",
    image: abdulWahab,
    imagePosition: "center 15%",
  },
  {
    id: "zunaira-rehman",
    displayName: "Ms. Zunaira Rehman",
    role: "Founder & CEO, Digital Aspire",
    image: zunairaRehman,
    imagePosition: "center 12%",
  },
  {
    id: "arbeeha-zahid",
    displayName: "Ms. Arbeeha Zahid",
    role: "Youth Advocate & Community Educator",
    image: arbeehaZahid,
    imagePosition: "center 18%",
  },
  {
    id: "hiba-syed",
    displayName: "Ms. Hiba Syed",
    role: "Researcher & PhD Scholar",
    image: hibaSyed,
    imagePosition: "center 18%",
  },
  {
    id: "dua-amjad",
    displayName: "Ms. Dua Amjad",
    role: "Youth Advocate & Published Author",
    image: duaAmjad,
    imagePosition: "center 15%",
  },
  {
    id: "muhammad-usman-jamal",
    displayName: "Mr. Muhammad Usman Jamal",
    role: "HR Professional",
    image: muhammadUsmanJamal,
    imagePosition: "center 15%",
  },
  {
    id: "ibtisam-babar",
    displayName: "Mr. Ibtisam Babar",
    role: "Founder & CEO, Society Circle",
    image: ibtisamBabar,
    imagePosition: "center 12%",
  },
];

/** Shared mentor portraits for testimonials and other sections */
export const mentorImages = {
  amnaSardar,
  drSassiMalikSher,
  arbeehaZahid,
} as const;
