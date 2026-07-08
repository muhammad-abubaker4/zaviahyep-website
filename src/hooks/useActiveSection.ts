import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SECTION_IDS = [
  "about",
  "founder-message",
  "vision",
  "pillars",
  "values",
  "offerings",
  "impact",
  "join",
  "apply",
  "team",
  "guest-speakers",
  "testimonials",
  "gallery",
  "contact",
  "partnerships",
  "future-goals",
  "faq",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    let observer: IntersectionObserver | null = null;
    const observed = new Set<string>();

    const attach = () => {
      const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (elements.length === 0) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible[0]?.target.id) {
              setActiveSection(visible[0].target.id as SectionId);
            }
          },
          { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.15, 0.3, 0.5] },
        );
      }

      elements.forEach((el) => {
        if (!observed.has(el.id)) {
          observer!.observe(el);
          observed.add(el.id);
        }
      });
    };

    attach();
    const interval = window.setInterval(attach, 400);
    const stop = window.setTimeout(() => window.clearInterval(interval), 12000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
      observer?.disconnect();
    };
  }, [pathname]);

  return activeSection;
}

export const ABOUT_SECTIONS: SectionId[] = [
  "about",
  "founder-message",
  "vision",
  "pillars",
  "values",
  "future-goals",
];

export function isAboutSectionActive(active: SectionId | null) {
  return active !== null && ABOUT_SECTIONS.includes(active);
}

export const TEAM_ROUTES = ["/founder", "/co-founder", "/core-members"];

export function isTeamRouteActive(pathname: string) {
  return TEAM_ROUTES.includes(pathname);
}
