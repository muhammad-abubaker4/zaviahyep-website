import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHashWhenReady } from "@/lib/scroll";

/** Scroll to top on route change; honor hash anchors (e.g. /about#vision). */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      // Delay one frame so eager page content is in the DOM.
      const id = window.setTimeout(() => scrollToHashWhenReady(hash), 50);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
