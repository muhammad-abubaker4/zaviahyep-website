import { ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import OpportunityCard from "@/components/OpportunityCard";
import ApplicationProcess from "@/components/ApplicationProcess";
import { breadcrumbSchema } from "@/lib/schema";
import { GET_INVOLVED_PATH } from "@/lib/routes";
import { GET_INVOLVED_FAQS, WHY_JOIN, opportunities } from "@/data/opportunities";

const jsonLd = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Get Involved", path: GET_INVOLVED_PATH },
]);

const GetInvolved = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Get Involved"
      description="Find your place at Zaviah: membership, volunteering, mentorship, campus ambassador, core team, and partnerships."
      path={GET_INVOLVED_PATH}
      jsonLd={jsonLd}
    />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="outline-none">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pb-12 pt-28 text-primary-foreground sm:pb-14 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.08),_transparent_55%)]"
          aria-hidden
        />
        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">
            Get Involved
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Find Your Place at Zaviah
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/70 sm:text-base">
            Student, mentor, volunteer, or organization. Pick a path and apply when you are ready.
          </p>
          <a href="#opportunities" className="btn-primary-modern mt-6 inline-flex">
            Explore Opportunities
            <ArrowDown className="ml-2 h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="scroll-mt-24 bg-background py-10 sm:py-14">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-muted !py-10 sm:!py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Why Join Zaviah
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {WHY_JOIN.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-5 text-center ring-1 ring-primary/[0.07] sm:p-6"
              >
                <p className="text-lg font-bold tracking-tight text-primary">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Journey */}
      <section className="section-dark !py-10 sm:!py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
            Application Journey
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-primary-foreground/65">
            A clear path from interest to onboarding.
          </p>
          <div className="mt-8">
            <ApplicationProcess dark />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-background py-10 sm:py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-2.5">
            {GET_INVOLVED_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-muted/60 px-5 py-4 ring-1 ring-primary/[0.06]"
              >
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default GetInvolved;
