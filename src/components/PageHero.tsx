type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Shared dark brand hero for secondary pages (matches Get Involved / About). */
const PageHero = ({ eyebrow, title, description }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-primary pb-12 pt-28 text-primary-foreground sm:pb-14 sm:pt-32">
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_100%/0.08),_transparent_55%)]"
      aria-hidden
    />
    <div className="container relative mx-auto max-w-3xl px-4 text-center">
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${eyebrow ? "mt-3" : ""}`}
      >
        {title}
      </h1>
      {description ? (
        <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/70 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  </section>
);

export default PageHero;
