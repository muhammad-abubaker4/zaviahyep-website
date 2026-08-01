import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SectionFallback from "@/components/SectionFallback";
import PageMeta from "@/components/PageMeta";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";
import { buildFaqSchema, faqs } from "@/data/faqs";

const HOME_FAQ_SCHEMA = buildFaqSchema(faqs);

const About = lazy(() => import("@/components/About"));
const Offerings = lazy(() => import("@/components/Offerings"));
const ImpactMetrics = lazy(() => import("@/components/ImpactMetrics"));
const DignitariesPreview = lazy(() => import("@/components/DignitariesPreview"));
const GetInvolvedSection = lazy(() => import("@/components/GetInvolvedSection"));
const Contact = lazy(() => import("@/components/Contact"));

/**
 * Short conversion homepage only.
 * Story / partners / goals → /about
 * Applications → /get-involved
 * Full speaker list → /guest-speakers
 * Photo albums → /gallery
 */
const Index = () => {
  return (
    <div className="min-h-screen">
      <PageMeta
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={HOME_FAQ_SCHEMA}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Offerings />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ImpactMetrics />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DignitariesPreview />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GetInvolvedSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
