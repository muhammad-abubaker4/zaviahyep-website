import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollManager from "./components/ScrollManager";
import SkipToMain from "./components/SkipToMain";
import SectionFallback from "./components/SectionFallback";
import Analytics from "./components/Analytics";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ErrorBoundary from "./components/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Founder = lazy(() => import("./pages/Founder"));
const CoFounder = lazy(() => import("./pages/CoFounder"));
const CoreMembers = lazy(() => import("./pages/CoreMembers"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const App = () => (
  <ErrorBoundary>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <BrowserRouter>
          <Analytics />
          <SkipToMain />
          <ScrollManager />
          <ScrollToTop />
          <FloatingWhatsApp />
          <Suspense fallback={<SectionFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/co-founder" element={<CoFounder />} />
              <Route path="/core-members" element={<CoreMembers />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </ErrorBoundary>
);

export default App;
