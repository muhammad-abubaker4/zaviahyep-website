import { lazy, Suspense, useEffect } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollManager from "./components/ScrollManager";
import SkipToMain from "./components/SkipToMain";
import SectionFallback from "./components/SectionFallback";
import PageTransition from "./components/PageTransition";
import Analytics from "./components/Analytics";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ErrorBoundary from "./components/ErrorBoundary";

/** The landing route stays eager so first paint never waits on a chunk fetch. */
import Index from "./pages/Index";

/**
 * Every other route is split. Their chunks are prefetched on idle below, so
 * navigation still feels instant without loading the whole site up front.
 */
const About = lazy(() => import("./pages/About"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const OpportunityDetail = lazy(() => import("./pages/OpportunityDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const GalleryAlbum = lazy(() => import("./pages/GalleryAlbum"));
const Founder = lazy(() => import("./pages/Founder"));
const CoFounder = lazy(() => import("./pages/CoFounder"));
const CoreMembers = lazy(() => import("./pages/CoreMembers"));
const GuestSpeakers = lazy(() => import("./pages/GuestSpeakers"));
const Partners = lazy(() => import("./pages/Partners"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

/** Routes a visitor is most likely to open next, warmed once the page is idle. */
const PREFETCH_ROUTES = [
  () => import("./pages/About"),
  () => import("./pages/GetInvolved"),
  () => import("./pages/GuestSpeakers"),
  () => import("./pages/Gallery"),
];

const App = () => {
  useEffect(() => {
    let cancelled = false;
    let start = 0;

    /*
     * One chunk per idle slot. Requesting all four in a single callback parsed
     * them in one task, which measured as a ~470ms main-thread block under 4x
     * CPU throttling - long enough to swallow a tap or a hover.
     *
     * No `timeout` option either: a timeout lets the callback jump an idle
     * queue that is busy precisely because the page is still settling, which is
     * the one moment speculative work should stay out of the way.
     */
    const schedule = (fn: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(fn)
        : window.setTimeout(fn, 300);

    const prefetchFrom = (index: number) => {
      if (cancelled || index >= PREFETCH_ROUTES.length) return;
      schedule(() => {
        if (cancelled) return;
        void PREFETCH_ROUTES[index]().finally(() => prefetchFrom(index + 1));
      });
    };

    /* Wait for `load` so prefetching never competes with the first render. */
    const begin = () => {
      start = window.setTimeout(() => prefetchFrom(0), 1500);
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.removeEventListener("load", begin);
    };
  }, []);

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        {/*
         * `domAnimation` covers animate/exit/gesture features. The layout
         * projection and drag engines are the bulk of framer-motion and
         * nothing here uses them, so `strict` keeps `motion.*` from creeping
         * back in and silently pulling the full bundle along with it.
         */}
        <LazyMotion features={domAnimation} strict>
          <BrowserRouter>
            <Analytics />
            <SkipToMain />
            <ScrollManager />
            <ScrollToTop />
            <FloatingWhatsApp />
            <PageTransition>
              <Suspense fallback={<SectionFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/get-involved" element={<GetInvolved />} />
                  <Route path="/get-involved/:slug" element={<OpportunityDetail />} />
                  <Route path="/founder" element={<Founder />} />
                  <Route path="/co-founder" element={<CoFounder />} />
                  <Route path="/core-members" element={<CoreMembers />} />
                  <Route path="/guest-speakers" element={<GuestSpeakers />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/gallery/:slug" element={<GalleryAlbum />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </BrowserRouter>
        </LazyMotion>
      </MotionConfig>
    </ErrorBoundary>
  );
};

export default App;
