import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { EMAIL, MAILTO_URL } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";

const privacyJsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Privacy Policy"
        description="How Zaviah collects, uses, and protects your information when you use our website and programs."
        path="/privacy"
        jsonLd={privacyJsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container max-w-3xl px-4 py-16 md:py-24">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

          <div className="prose prose-neutral mt-10 max-w-none text-muted-foreground dark:prose-invert">
            <p>
              Zaviah (“we”, “us”) respects your privacy. This policy explains what information we collect when you
              use <a href="https://zaviah.org" className="font-medium text-primary hover:underline">zaviah.org</a>,
              how we use it, and which service providers help us operate the site.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Information we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Contact and application details</strong> you submit through our
                website forms (for example name, email, phone, city, age, education, institution, subject, message, and
                motivation), or when you email or message us directly.
              </li>
              <li>
                <strong className="text-foreground">Chat messages</strong> you send to our on-site assistant (ProgressArc
                chatbot), which may include questions and any personal details you choose to share in the conversation.
              </li>
              <li>
                <strong className="text-foreground">Browser and device information</strong> that is typically sent when
                you visit a website (such as browser type, general device category, approximate region derived from IP,
                pages viewed, and referral source) through our hosting and any privacy-focused analytics we enable.
              </li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">How we use information</h2>
            <p>
              We use this information to respond to inquiries, process membership and volunteer applications, run youth
              programs and partnerships, improve our website, and keep our community safe. We do not sell your personal
              information.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Service providers we use</h2>
            <p>To run zaviah.org we rely on the following third parties:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Netlify</strong> — website hosting and content delivery for
                zaviah.org.
              </li>
              <li>
                <strong className="text-foreground">Hostinger</strong> — domain name registration for zaviah.org.
              </li>
              <li>
                <strong className="text-foreground">Web3Forms</strong> — primary processor for website form submissions,
                which forwards messages to our team inbox.
              </li>
              <li>
                <strong className="text-foreground">FormSubmit</strong> — backup form delivery service used if the
                primary form processor is unavailable.
              </li>
              <li>
                <strong className="text-foreground">ProgressArc</strong> — on-site chatbot assistant that helps visitors
                with questions about Zaviah. Chat content may be processed by ProgressArc to provide responses and for
                our team to follow up when needed.
              </li>
            </ul>
            <p className="mt-3">
              These providers process data only to deliver the services described above. Their own privacy policies also
              apply to data they handle.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Photos and events</h2>
            <p>
              Event photos on our site are used to highlight community impact. If you appear in a photo and would like
              it reviewed or removed, contact us and we will work with you in good faith.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Your choices</h2>
            <p>
              You can request access, correction, or deletion of personal information we hold about you by emailing us.
              You may also stop using the chatbot or avoid submitting forms if you prefer not to share information that
              way.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Related documents</h2>
            <p>
              See also our{" "}
              <Link to="/terms" className="font-medium text-primary hover:underline">
                Terms of Service
              </Link>
              .
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a href={MAILTO_URL} className="font-medium text-primary hover:underline">
                {EMAIL}
              </a>
            </p>

            <p className="mt-8 text-sm">
              This policy is provided for transparency. It is not legal advice. For formal legal questions, consult a
              qualified professional in your jurisdiction.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
