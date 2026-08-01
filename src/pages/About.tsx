import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import About from "@/components/About";
import FounderWelcome from "@/components/FounderWelcome";
import Vision from "@/components/Vision";
import Pillars from "@/components/Pillars";
import Values from "@/components/Values";
import FutureGoals from "@/components/FutureGoals";
import { breadcrumbSchema } from "@/lib/schema";

const aboutJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

/**
 * About = org story only (eager sections so /about#... hashes scroll reliably).
 * Guest Speakers → /guest-speakers | Partners → /partners
 */
const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="About Zaviah"
      description="Learn about Zaviah's story, vision, pillars, values, and future goals for youth empowerment across Pakistan."
      path="/about"
      jsonLd={aboutJsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="About"
        title="Who we are"
        description="A youth-led platform connecting students across Pakistan with mentorship, skills, and community."
      />
      <About showDeepLinks={false} />
      <FounderWelcome />
      <Vision />
      <Pillars />
      <Values />
      <FutureGoals />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
