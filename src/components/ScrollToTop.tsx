import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { DURATION, revealTransition } from "@/lib/motion";
import { ChevronUp } from "lucide-react";

const SHOW_AFTER_PX = 300;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    // Scroll fires far more often than the button changes state, so the ref
    // keeps the common case to a comparison instead of a setState round trip.
    const toggleVisibility = () => {
      const next = window.scrollY > SHOW_AFTER_PX;
      if (next === visibleRef.current) return;
      visibleRef.current = next;
      setIsVisible(next);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          type="button"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={revealTransition(0, DURATION.fast)}
          onClick={scrollToTop}
          className="fixed bottom-40 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
        </m.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
