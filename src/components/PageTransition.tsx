import { m, useReducedMotion } from "framer-motion";
import { DURATION, revealTransition } from "@/lib/motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * Light fade-in on route change. No exit wait (avoids blank flash with lazy routes).
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <m.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={revealTransition(0, DURATION.page)}
    >
      {children}
    </m.div>
  );
};

export default PageTransition;
