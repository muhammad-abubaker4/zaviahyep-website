export const SITE_URL = "https://zaviah.org";

export const SITE_NAME = "Zaviah";

export const DEFAULT_TITLE = "Zaviah - Youth Empowerment Platform";

export const DEFAULT_DESCRIPTION =
  "Free mentorship and community for students across Pakistan. Join Zaviah to learn, lead, and grow.";

/** Absolute URL for social crawlers (must be reachable on the live deploy). */
export const OG_IMAGE = `${SITE_URL}/assets/og-share.jpg`;

export function pageTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function pageUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}
