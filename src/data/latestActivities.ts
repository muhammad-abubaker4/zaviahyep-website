import nationalAssembly from "@/assets/activities/national-assembly-delegation.jpg";
import easternScholarships from "@/assets/activities/eastern-scholarships.jpg";
import aiForLearning from "@/assets/activities/ai-for-learning.jpg";

/**
 * Homepage "Latest From Zaviah" activities only.
 * Historical gallery albums stay in galleryAlbums.ts — do not remove them.
 */
export type LatestActivity = {
  id: string;
  category: string;
  /** Date / deadline line shown next to the calendar icon. */
  dateLabel: string;
  /** Location or format (e.g. Islamabad, Online). */
  meta: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the card crop. */
  imagePosition?: string;
  ctaLabel: string;
  /**
   * Real destination only. Omit when no official page/form exists yet —
   * never invent URLs.
   */
  href?: string;
  /** External apply / outbound links open in a new tab. */
  external?: boolean;
  /** Show online (monitor) affordance on the category badge. */
  online?: boolean;
  /** Real photo count only — omit rather than invent. */
  photoCount?: number;
};

export const latestActivities: LatestActivity[] = [
  {
    id: "national-assembly-delegation",
    category: "Upcoming",
    dateLabel: "Application Deadline: 4 October 2026, 11:59 PM",
    meta: "Islamabad",
    title: "Youth Delegation to the National Assembly of Pakistan",
    summary:
      "Zaviah, in collaboration with Together2050, is organizing an educational study visit to Parliament House, Islamabad, offering participants firsthand exposure to Pakistan's parliamentary system and legislative processes.",
    image: nationalAssembly,
    imageAlt:
      "Zaviah × Together2050 announcement for the Youth Delegation to the National Assembly of Pakistan",
    imagePosition: "center top",
    ctaLabel: "Apply Now",
    href: "https://forms.gle/PrD1zEjJAFhSgoe3A",
    external: true,
  },
  {
    id: "eastern-scholarships",
    category: "Learning Session",
    dateLabel: "19 September 2026",
    meta: "Online",
    title: "Eastern Scholarships & Study Abroad",
    summary:
      "A learning session on fully funded study opportunities across China, Russia, South Korea, Japan, Malaysia and ASEAN, with practical guidance on scholarship pathways and applications.",
    image: easternScholarships,
    imageAlt:
      "Eastern Scholarships & Study Abroad session graphic with Mr. Hammad Arif, Global Opportunities Hub",
    imagePosition: "center center",
    ctaLabel: "View activity",
    online: true,
  },
  {
    id: "ai-for-learning",
    category: "AI & Learning",
    dateLabel: "7 September 2026",
    meta: "Online",
    title: "AI for Learning",
    summary:
      "An interactive session exploring practical ways learners can use AI tools to support research, learning, organization, and everyday academic work.",
    image: aiForLearning,
    imageAlt:
      "AI for Learning session with Tamreena Tashfeen sharing NotebookLM content on Google Meet",
    imagePosition: "center right",
    ctaLabel: "View activity",
    online: true,
  },
];
