import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="fixed bottom-40 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 hover:scale-110 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
