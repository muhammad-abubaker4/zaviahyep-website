export type CorePillar = {
  title: string;
  description: string;
};

/**
 * The three ideas Zaviah is organised around. Shared rather than duplicated:
 * the hero prints just the titles as a summary strip, and the /about page
 * renders the full set, so a rename has to land in both places at once.
 *
 * Icons deliberately live with the component that draws them, so the hero can
 * import these titles without pulling icon components into the entry chunk.
 */
export const CORE_PILLARS: CorePillar[] = [
  {
    title: "Access",
    description:
      "Making sure all students have fair chances to learn, grow, and connect with mentors. We work to ensure equal access to mentorship, learning, and personal growth for students across Pakistan.",
  },
  {
    title: "Awareness",
    description:
      "Through mentorship, workshops, and open discussions, we help students become more confident, informed, and self aware, ready to make better choices for their future and create positive change.",
  },
  {
    title: "Aspiration",
    description:
      "Inspiring youth to dream big, act with confidence, and lead with integrity. We help youth believe in themselves, pursue meaningful goals, and create lasting impact in their communities.",
  },
];
