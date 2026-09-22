import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import GuestSpeakers from "@/components/GuestSpeakers";
import { breadcrumbSchema } from "@/lib/schema";

const jsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Guest Speakers", path: "/guest-speakers" },
]);

const GuestSpeakersPage = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Guest Speakers"
      description="Meet speakers and professionals who have shared knowledge and experience with the Zaviah community through sessions and initiatives."
      path="/guest-speakers"
      jsonLd={jsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Community"
        title="Guest Speakers"
        description="Speakers and professionals who have shared their knowledge and experiences with the Zaviah community."
      />
      <GuestSpeakers hideHeader />
    </main>
    <Footer />
  </div>
);

export default GuestSpeakersPage;
