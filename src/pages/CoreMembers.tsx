import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import Team from "@/components/Team";
import { breadcrumbSchema } from "@/lib/schema";

const coreMembersJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Core Members", path: "/core-members" },
]);

const CoreMembers = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Core Members"
      description="Meet the people supporting Zaviah's programs, outreach, operations, community engagement, and content."
      path="/core-members"
      jsonLd={coreMembersJsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Community"
        title="Core Members"
        description="The team driving Zaviah's mission across outreach, campus coordination, and student engagement."
      />
      <Team hideHeader />
    </main>
    <Footer />
  </div>
);

export default CoreMembers;
