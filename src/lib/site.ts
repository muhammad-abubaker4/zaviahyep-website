export const SITE_URL = "https://zaviah.org";

export const SITE_NAME = "Zaviah";

/** Homepage document title — already includes the brand, so PageMeta will not suffix it. */
export const DEFAULT_TITLE = "Zaviah | Access, Awareness, Aspiration";

export const DEFAULT_DESCRIPTION =
  "Zaviah is a youth-led nonprofit platform creating opportunities for learning, mentorship, collaboration, and personal growth across Pakistan.";

/** Absolute URL for social crawlers (must be reachable on the live deploy). */
export const OG_IMAGE = `${SITE_URL}/assets/og-share.jpg`;

export function pageTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function pageUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}
