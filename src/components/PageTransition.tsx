import { m, useReducedMotion } from "framer-motion";
import { DURATION, revealTransition } from "@/lib/motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Light fade-in on client-side route changes only.
 *
 * Direct loads / prerendered HTML must NOT start at opacity 0 — Google Live
 * Inspection (and Soft 404 classifiers) treat an invisible first paint as an
 * empty page even when the DOM later becomes visible.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const allowFade = useRef(false);

  useEffect(() => {
    allowFade.current = true;
  }, []);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <m.div
      key={pathname}
      initial={allowFade.current ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={revealTransition(0, DURATION.page)}
    >
      {children}
    </m.div>
  );
};

export default PageTransition;
