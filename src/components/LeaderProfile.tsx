import { m } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { DURATION, revealTransition, STAGGER } from "@/lib/motion";
import type { Profile } from "@/data/profiles";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: revealTransition(delay),
});

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground";

const ProfileLinks = ({ links, name }: { links: Profile["links"]; name: string }) => {
  const entries = [
    links.email && {
      href: `mailto:${links.email}`,
      icon: Mail,
      label: `Email ${name}`,
      text: "Email",
    },
    links.linkedin && {
      href: links.linkedin,
      icon: Linkedin,
      label: `${name} on LinkedIn`,
      text: "LinkedIn",
    },
    links.instagram && {
      href: links.instagram,
      icon: Instagram,
      label: `${name} on Instagram`,
      text: "Instagram",
    },
  ].filter(Boolean) as Array<{
    href: string;
    icon: typeof Mail;
    label: string;
    text: string;
  }>;

  if (entries.length === 0) return null;

  return (
    <ul className="mt-9 flex max-w-lg flex-wrap gap-3 border-t border-primary-foreground/15 pt-7">
      {entries.map((entry) => (
        <li key={entry.text}>
          <a
            href={entry.href}
            aria-label={entry.label}
            {...(entry.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2.5 text-sm font-semibold text-primary-foreground/85 transition-colors hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            <entry.icon className="h-4 w-4" aria-hidden />
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

const LeaderProfile = ({
  profile,
  jsonLd,
}: {
  profile: Profile;
  jsonLd: Record<string, unknown>[];
}) => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title={profile.metaTitle}
      description={profile.metaDescription}
      path={profile.path}
      jsonLd={jsonLd}
    />
    <Navbar />

    <main id="main-content" tabIndex={-1} className="outline-none">
      {/* Portrait and identity share one band, instead of a bare banner above a repeat of the name. */}
      <section className="relative overflow-hidden bg-mesh-dark pb-16 pt-28 text-primary-foreground sm:pb-20 sm:pt-36">
        <div
          className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
        />
        <div className="container relative px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition(0, DURATION.hero)}
              className="mx-auto w-full max-w-[18rem] lg:mx-0 lg:max-w-none"
            >
              <img
                src={profile.image}
                alt={profile.imageAlt}
                width={352}
                height={440}
                className="aspect-[4/5] w-full rounded-3xl object-cover object-center shadow-lift ring-1 ring-primary-foreground/15"
              />
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition(0.1, DURATION.hero)}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary-foreground/50">
                {profile.role}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl md:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-[1.6] text-primary-foreground/75">
                {profile.tagline}
              </p>

              <ProfileLinks links={profile.links} name={profile.name} />
            </m.div>
          </div>
        </div>
      </section>

      <section className="section-padding relative bg-background">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative px-4">
          <div className="mx-auto max-w-4xl">
            <m.div {...reveal()}>
              <p className={labelClass}>Introduction</p>
              <p className="mt-5 text-lg leading-[1.75] text-foreground/85 md:text-xl md:leading-[1.7]">
                {profile.intro}
              </p>
            </m.div>

            <m.div {...reveal(0.1)} className="mt-14 border-t border-border pt-12">
              <p className={labelClass}>Areas of expertise</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {profile.expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>

            <m.div {...reveal(0.15)} className="mt-14 border-t border-border pt-12">
              <p className={labelClass}>Achievements &amp; experience</p>
              {/* Same milestone spine as the roadmap, so the two read as one system. */}
              <ul className="ml-1 mt-8 space-y-8 border-l border-border pl-8">
                {profile.achievements.map((entry, index) => (
                  <m.li
                    key={entry.title}
                    {...reveal(index * STAGGER.tight)}
                    className="relative"
                  >
                    <span
                      className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                      aria-hidden
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-semibold leading-snug text-foreground">{entry.title}</h2>
                      {entry.period && (
                        <span className="text-xs font-medium text-muted-foreground/70">
                          {entry.period}
                        </span>
                      )}
                    </div>
                    {entry.org && (
                      <p className="mt-1 text-sm font-medium text-primary">{entry.org}</p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>
                  </m.li>
                ))}
              </ul>
            </m.div>

            <m.div {...reveal(0.2)} className="mt-14 border-t border-border pt-12">
              <p className={labelClass}>Education</p>
              <div className="mt-6 space-y-8">
                {profile.education.map((item) => (
                  <div key={item.degree}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-semibold leading-snug text-foreground">{item.degree}</h2>
                      {item.period && (
                        <span className="text-xs font-medium text-muted-foreground/70">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-primary">{item.institution}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default LeaderProfile;
