import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { breadcrumbSchema } from "@/lib/schema";

const termsJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Terms of Use", path: "/terms" },
]);

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Terms of Use"
        description="Terms and conditions for using the Zaviah website and participating in our programs."
        path="/terms"
        jsonLd={termsJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container max-w-3xl px-4 py-16 md:py-24">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Terms of Use</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

          <div className="prose prose-neutral mt-10 max-w-none text-muted-foreground dark:prose-invert">
            <p>
              By using the Zaviah website, you agree to these terms. If you do not agree, please do not use the site.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Who we are</h2>
            <p>
              Zaviah is a youth-led initiative focused on mentorship, learning, and community programs. Content on
              this site describes our mission and activities and may change over time.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Acceptable use</h2>
            <p>
              Please use this site lawfully and respectfully. Do not attempt to disrupt the site, scrape it in a way
              that harms our hosting, or impersonate Zaviah, our team, or our partners.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Programs and forms</h2>
            <p>
              Program rules, eligibility, and expectations may be shared separately (for example in forms or
              orientation materials). Submitting a form does not guarantee acceptance into a program.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Intellectual property</h2>
            <p>
              Text, branding, and media on this site belong to Zaviah or are used with permission, unless otherwise
              noted. Please do not reuse our materials for commercial purposes without written consent.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Disclaimer</h2>
            <p>
              Information on this site is provided in good faith for general awareness. It is not professional,
              medical, legal, or financial advice. Use your own judgment and seek qualified help when needed.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Changes</h2>
            <p>We may update these terms. The &quot;Last updated&quot; date at the top will change when we do.</p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
            <p>
              <a href="mailto:zaviahorg@gmail.com" className="font-medium text-primary hover:underline">
                zaviahorg@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
