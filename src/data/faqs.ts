export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "What is Zaviah?",
    a: "Zaviah is a youth-driven platform in Pakistan that connects students with mentors, workshops, and community programs to build skills, confidence, and career direction.",
  },
  {
    q: "Who can join Zaviah?",
    a: "Any student in Pakistan looking for guidance, skill-building, or community support can apply to become a member. Other paths include volunteering, mentorship, campus ambassador, and core team roles.",
  },
  {
    q: "Is Zaviah free to join?",
    a: "Yes. Our mentorship sessions, workshops, and community programs are free for students. We believe access should never be a barrier.",
  },
  {
    q: "How do I become a member?",
    a: "Visit Get Involved, open Become a Member, read the requirements, then complete the official Google Form on that page. Our team reviews applications and shares next steps.",
  },
  {
    q: "How can my organization partner with Zaviah?",
    a: "Open Partner With Zaviah under Get Involved for collaboration details, then submit the official partnership request form. You can also download our Organization Profile from the Partnerships section.",
  },
];

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
