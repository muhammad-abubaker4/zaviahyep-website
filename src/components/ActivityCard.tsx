import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Images, MapPin, Monitor } from "lucide-react";
import type { LatestActivity } from "@/data/latestActivities";

/**
 * Same visual system as AlbumCard — used only for homepage Latest activities
 * that are not (yet) gallery albums.
 */
const ActivityCard = ({ activity }: { activity: LatestActivity }) => {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={activity.image}
          alt={activity.imageAlt}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: activity.imagePosition ?? "center center" }}
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {activity.online ? <Monitor className="h-3 w-3" aria-hidden /> : null}
          {activity.category}
        </span>
        {typeof activity.photoCount === "number" && activity.photoCount > 0 ? (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Images className="h-3.5 w-3.5" aria-hidden />
            {activity.photoCount}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {activity.dateLabel}
          </span>
          {activity.meta && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {activity.meta}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
          {activity.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {activity.summary}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {activity.ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </>
  );

  const className =
    "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  if (activity.href) {
    if (activity.external) {
      return (
        <a
          href={activity.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {body}
        </a>
      );
    }
    return (
      <Link to={activity.href} className={className}>
        {body}
      </Link>
    );
  }

  // No destination yet — keep the approved card look without a fake link.
  return <article className={className}>{body}</article>;
};

export default ActivityCard;
