import { createRoot } from "react-dom/client";
/* One variable file covers every weight we use, replacing five static faces. */
import "@fontsource-variable/inter/wght.css";
import App from "./App.tsx";
import "./index.css";

/**
 * Build-time prerender writes real markup into #root so crawlers (and Google
 * Live URL Inspection) see page-specific content without executing JS.
 *
 * We intentionally use createRoot rather than hydrateRoot: Framer Motion's
 * settled inline styles never match React's `initial` values, which produced
 * hydration errors #418/#423. createRoot replaces the snapshot after load;
 * crawlers still receive the full HTML body in the first response.
 *
 * Clear the prerender flag before mount so scroll/enter animations still run
 * for real users after the SPA remounts.
 */
document.documentElement.removeAttribute("data-prerendered");
createRoot(document.getElementById("root")!).render(<App />);
