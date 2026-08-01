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
      description="Leaders, professionals, and mentors who have spoken at Zaviah initiatives."
      path="/guest-speakers"
      jsonLd={jsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Community"
        title="Guest Speakers"
        description="Dignitaries and mentors who shared their knowledge at Zaviah initiatives."
      />
      <GuestSpeakers hideHeader />
    </main>
    <Footer />
  </div>
);

export default GuestSpeakersPage;
