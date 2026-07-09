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
const FounderWelcome = lazy(() => import("@/components/FounderWelcome"));
const Vision = lazy(() => import("@/components/Vision"));
const Pillars = lazy(() => import("@/components/Pillars"));
const Values = lazy(() => import("@/components/Values"));
const Offerings = lazy(() => import("@/components/Offerings"));
const ImpactMetrics = lazy(() => import("@/components/ImpactMetrics"));
const JoinUs = lazy(() => import("@/components/JoinUs"));
const Team = lazy(() => import("@/components/Team"));
const GuestSpeakers = lazy(() => import("@/components/GuestSpeakers"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const Partnerships = lazy(() => import("@/components/Partnerships"));
const FutureGoals = lazy(() => import("@/components/FutureGoals"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageMeta
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={HOME_FAQ_SCHEMA}
      />
      <section id="navbar-section">
        <Navbar />
      </section>
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section id="hero-section">
          <Hero />
        </section>
        <Suspense fallback={<SectionFallback />}>
          <section id="about-section">
            <About />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="founder-message-section">
            <FounderWelcome />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="vision-section">
            <Vision />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="pillars-section">
            <Pillars />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="values-section">
            <Values />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="offerings-section">
            <Offerings />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="impact-section">
            <ImpactMetrics />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="join-section">
            <JoinUs />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="team-section">
            <Team />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="guest-speakers-section">
            <GuestSpeakers />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="testimonials-section">
            <Testimonials />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="gallery-section">
            <GallerySection />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="contact-section">
            <Contact />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="partnerships-section">
            <Partnerships />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="future-goals-section">
            <FutureGoals />
          </section>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section id="faq-section">
            <FAQ />
          </section>
        </Suspense>
      </main>
      <section id="footer-section">
        <Footer />
      </section>
    </div>
  );
};

export default Index;
