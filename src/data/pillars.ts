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
      "Creating fair opportunities for people to learn, grow, connect, and participate. We work to make learning, guidance, and meaningful opportunities more accessible across communities.",
  },
  {
    title: "Awareness",
    description:
      "Through learning sessions, workshops, discussions, and shared experiences, we help people become more informed, confident, and aware of opportunities, ideas, and issues that can shape their future.",
  },
  {
    title: "Aspiration",
    description:
      "Encouraging people to believe in their potential, pursue meaningful goals, take initiative, and contribute positively to their communities.",
  },
];
