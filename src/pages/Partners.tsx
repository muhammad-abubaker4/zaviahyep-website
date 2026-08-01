import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import Partnerships from "@/components/Partnerships";
import { breadcrumbSchema } from "@/lib/schema";

const jsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Partners", path: "/partners" },
]);

const PartnersPage = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Partners"
      description="Organizations collaborating with Zaviah through partnerships and MoUs."
      path="/partners"
      jsonLd={jsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Community"
        title="Partners"
        description="Organizations that share our mission to empower youth nationwide."
      />
      <Partnerships hideHeader tone="light" />
    </main>
    <Footer />
  </div>
);

export default PartnersPage;
