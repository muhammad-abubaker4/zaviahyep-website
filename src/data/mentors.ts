import samaZaidi from "@/assets/mentors/sama-zaidi.jpg";
import usamaNadeemQureshi from "@/assets/mentors/usama-nadeem-qureshi.png";
import amnaIrfan from "@/assets/mentors/amna-irfan.jpg";
import hafsaKhalil from "@/assets/mentors/hafsa-khalil.jpg";
import amnaSardar from "@/assets/mentors/amna-sardar.jpg";
import farhanUllah from "@/assets/mentors/farhan-ullah.jpg";
import ahsanLakhani from "@/assets/mentors/ahsan-lakhani.jpg";
import drAtifAli from "@/assets/mentors/dr-atif-ali.jpg";
import drSassiMalikSher from "@/assets/mentors/dr-sassi-malik-sher.jpg";
import abdulWahab from "@/assets/mentors/abdul-wahab.jpg";
import zunairaRehman from "@/assets/mentors/zunaira-rehman.jpg";
import arbeehaZahid from "@/assets/mentors/arbeeha-zahid.jpg";
import hibaSyed from "@/assets/mentors/hiba-syed.jpg";
import duaAmjad from "@/assets/mentors/dua-amjad.jpg";
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
    id: "sama-zaidi",
    displayName: "Mr. Osama",
    role: "SuperStudent",
    image: samaZaidi,
    imagePosition: "center 15%",
  },
  {
    id: "usama-nadeem",
    displayName: "Mr. Usama Nadeem Qureshi",
    role: "Chairman, Pakistan Youth Parliament by ITP",
    image: usamaNadeemQureshi,
    imagePosition: "center 12%",
  },
  {
    id: "bisma-mirza",
    displayName: "Ms. Bisma Mirza",
    role: "Co-Founder, Red International",
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
    id: "amna-sardar",
    displayName: "Ms. Amna Sardar",
    role: "Member of Provincial Assembly, KPK",
    image: amnaSardar,
    imagePosition: "center 12%",
  },
  {
    id: "farhan-ullah",
    displayName: "Mr. Farhan Ullah",
    role: "Social Activist",
    image: farhanUllah,
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
    role: "Youth Advocate",
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
