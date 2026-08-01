/**
 * Hand-picked hero frames, imported directly rather than looked up in
 * `galleryAlbums`. Going through the album module pulled the whole 85-photo
 * manifest — every srcset and every blur placeholder — into the entry chunk
 * so the hero could show five images.
 *
 * Each frame earns its place: wide documentary shots that read at a glance,
 * alternating between the two locations. If you swap one, update `width` and
 * `height` to match, since they set the intrinsic ratio the browser reserves.
 */
import tahafuzGroup640 from "@/assets/tahafuz-manzil/WhatsApp Image 2026-07-31 at 22.12.58-640w.webp";
import tahafuzGroup1280 from "@/assets/tahafuz-manzil/WhatsApp Image 2026-07-31 at 22.12.58-1280w.webp";
import tahafuzCake640 from "@/assets/tahafuz-manzil/WhatsApp Image 2026-07-31 at 22.13.48-640w.webp";
import tahafuzCake1280 from "@/assets/tahafuz-manzil/WhatsApp Image 2026-07-31 at 22.13.48-1280w.webp";
import kpGroup1640 from "@/assets/gallery/kp-assembly-group-1-640w.webp";
import kpGroup11280 from "@/assets/gallery/kp-assembly-group-1-1280w.webp";
import kpGroup2640 from "@/assets/gallery/kp-assembly-group-2-640w.webp";
import kpGroup21280 from "@/assets/gallery/kp-assembly-group-2-1280w.webp";
import kpHall640 from "@/assets/gallery/1-640w.webp";
import kpHall1280 from "@/assets/gallery/1-1280w.webp";

export type HeroSlide = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  albumTitle: string;
  albumLocation?: string;
  albumSlug: string;
};

const srcSet = (small: string, large: string) => `${small} 640w, ${large} 1280w`;

const TAHAFUZ = {
  albumTitle: "Tahafuz Manzil Foster Home",
  albumLocation: "Lahore",
  albumSlug: "tahafuz-manzil",
} as const;

const KP_ASSEMBLY = {
  albumTitle: "Educational Visit to Khyber Pakhtunkhwa Assembly",
  albumLocation: "Peshawar",
  albumSlug: "kp-assembly-visit",
} as const;

export const heroSlides: HeroSlide[] = [
  {
    ...TAHAFUZ,
    src: tahafuzGroup1280,
    srcSet: srcSet(tahafuzGroup640, tahafuzGroup1280),
    width: 1600,
    height: 1200,
    alt: "The Zaviah team with the children of Tahafuz Manzil Foster Home in Lahore",
  },
  {
    ...KP_ASSEMBLY,
    src: kpGroup11280,
    srcSet: srcSet(kpGroup1640, kpGroup11280),
    width: 1600,
    height: 1067,
    alt: "Zaviah students gathered at the Khyber Pakhtunkhwa Provincial Assembly in Peshawar",
  },
  {
    ...KP_ASSEMBLY,
    src: kpHall1280,
    srcSet: srcSet(kpHall640, kpHall1280),
    width: 1176,
    height: 780,
    alt: "Students seated inside the Khyber Pakhtunkhwa Assembly hall during the educational visit",
  },
  {
    ...TAHAFUZ,
    src: tahafuzCake1280,
    srcSet: srcSet(tahafuzCake640, tahafuzCake1280),
    width: 1600,
    height: 1200,
    alt: "Children and volunteers at Tahafuz Manzil marking one year of Zaviah's impact",
  },
  {
    ...KP_ASSEMBLY,
    src: kpGroup21280,
    srcSet: srcSet(kpGroup2640, kpGroup21280),
    width: 1600,
    height: 1067,
    alt: "Zaviah group photograph on the steps of the Khyber Pakhtunkhwa Assembly",
  },
];

/** The frame the browser should preload; see the heroPreload plugin in vite.config.ts. */
export const HERO_LCP_SLIDE = heroSlides[0];
