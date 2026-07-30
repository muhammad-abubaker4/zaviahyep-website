import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Team from "@/components/Team";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema } from "@/lib/schema";

const coreMembersJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Core Members", path: "/core-members" },
]);

const CoreMembers = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Core Team"
        description="Meet the Zaviah core team — passionate young leaders building mentorship programs and student networks across Pakistan."
        path="/core-members"
        jsonLd={coreMembersJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="bg-gradient-subtle py-16 md:py-20">
          <div className="container px-4 text-center">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/#team">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to homepage team
              </Link>
            </Button>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Core <span className="text-primary">Members</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-accent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Meet the dedicated team members driving Zaviah&apos;s mission across outreach, campus coordination,
              and student engagement.
            </p>
          </div>
        </section>
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default CoreMembers;
