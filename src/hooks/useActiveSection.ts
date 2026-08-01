import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Sections that live on the homepage conversion journey. */
const HOME_SECTION_IDS = [
  "about",
  "offerings",
  "impact",
  "get-involved",
  "contact",
] as const;

export type SectionId = (typeof HOME_SECTION_IDS)[number];

function observeSections(ids: readonly string[], setActive: (id: SectionId | null) => void) {
  let observer: IntersectionObserver | null = null;
  const observed = new Set<string>();

  /**
   * Homepage sections mount behind lazy Suspense boundaries, so they are not
   * all in the DOM on the first pass. Poll until every one has been picked up,
   * then stop — the old version kept waking every 400 ms for a full 12 s,
   * competing with hydration for the main thread long after the last section
   * had arrived.
   */
  const attach = () => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return false;

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible[0]?.target.id) {
            setActive(visible[0].target.id as SectionId);
          }
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.15, 0.3, 0.5] },
      );
    }

    for (const el of elements) {
      if (observed.has(el.id)) continue;
      observer.observe(el);
      observed.add(el.id);
    }

    return observed.size === ids.length;
  };

  let interval = 0;
  let stop = 0;

  if (!attach()) {
    interval = window.setInterval(() => {
      if (attach()) window.clearInterval(interval);
    }, 400);
    stop = window.setTimeout(() => window.clearInterval(interval), 12000);
  }

  return () => {
    window.clearInterval(interval);
    window.clearTimeout(stop);
    observer?.disconnect();
  };
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      return observeSections(HOME_SECTION_IDS, setActiveSection);
    }
    setActiveSection(null);
  }, [pathname]);

  return activeSection;
}

export const TEAM_ROUTES = [
  "/founder",
  "/co-founder",
  "/core-members",
  "/guest-speakers",
  "/partners",
];

export function isTeamRouteActive(pathname: string) {
  return TEAM_ROUTES.includes(pathname);
}
