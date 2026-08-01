import { Navigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import ApplyButton from "@/components/ApplyButton";
import ApplicationProcess from "@/components/ApplicationProcess";
import { breadcrumbSchema } from "@/lib/schema";
import { GET_INVOLVED_PATH, opportunityPath } from "@/lib/routes";
import { getOpportunity } from "@/data/opportunities";

const OpportunityDetail = () => {
  const { slug = "" } = useParams();
  const opportunity = getOpportunity(slug);

  if (!opportunity) {
    return <Navigate to={GET_INVOLVED_PATH} replace />;
  }

  const Icon = opportunity.icon;
  const path = opportunityPath(opportunity.slug);
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Get Involved", path: GET_INVOLVED_PATH },
      { name: opportunity.shortTitle, path },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={opportunity.title}
        description={opportunity.seoDescription}
        path={path}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-primary pb-14 pt-28 text-primary-foreground sm:pb-16 sm:pt-32">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.08),_transparent_55%)]"
            aria-hidden
          />
          <div className="container relative mx-auto max-w-4xl px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {opportunity.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-primary-foreground/10 px-2.5 py-1 text-[11px] font-medium text-primary-foreground/75"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {opportunity.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/70 sm:text-lg">
              {opportunity.tagline}
            </p>
            <div className="mt-8">
              <ApplyButton opportunity={opportunity} variant="light" />
            </div>
          </div>
        </section>

        <section className="section-muted !py-10 sm:!py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionBlock title="Overview" body={opportunity.overview} />
            <SectionBlock title="Purpose" body={opportunity.purpose} />
            <SectionList title="Who can apply" items={[opportunity.whoShouldApply]} />
            <SectionList title="Eligibility" items={opportunity.eligibility} />
            <SectionList title="Benefits" items={opportunity.benefits} />
            <SectionList title="Responsibilities" items={opportunity.responsibilities} />

            <div className="mb-10">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Expected time commitment
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{opportunity.commitment}</p>
            </div>
          </div>
        </section>

        <section className="section-dark !py-10 sm:!py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-center text-xl font-extrabold tracking-tight sm:text-2xl">
              Application journey
            </h2>
            <ApplicationProcess dark />
          </div>
        </section>

        <section className="bg-background py-10 sm:py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Application timeline
              </h2>
              <ol className="space-y-2">
                {opportunity.timeline.map((step, index) => (
                  <li key={step} className="flex gap-3 py-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {opportunity.faqs.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-4 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  Frequently asked questions
                </h2>
                <div className="space-y-2">
                  {opportunity.faqs.map((faq) => (
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
            )}

            <div className="overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary-foreground/70" aria-hidden />
              <h2 className="text-2xl font-extrabold tracking-tight">Ready to apply?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-primary-foreground/70">
                Continue to the official application form to submit your details.
              </p>
              {opportunity.secondaryCta && (
                <a
                  href={opportunity.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-primary-foreground/80 underline-offset-4 hover:underline"
                >
                  {opportunity.secondaryCta.label}
                </a>
              )}
              <div className="mt-6 flex justify-center">
                <ApplyButton opportunity={opportunity} variant="light" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function SectionBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-10">
      <h2 className="mb-3 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span className="text-sm leading-relaxed sm:text-[15px]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OpportunityDetail;
