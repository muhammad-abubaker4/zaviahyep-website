export const SITE_URL = "https://zaviahyep.netlify.app";

export const SITE_NAME = "Zaviah";

export const DEFAULT_TITLE = "Zaviah - Youth Empowerment Platform";

export const DEFAULT_DESCRIPTION =
  "Zaviah is a youth-led non-profit initiative, empowering students through mentorship, skill development, and personal growth.";

export const OG_IMAGE = `${SITE_URL}/og-image.jpg?v=3`;

export const SOCIAL_SAME_AS = [
  "https://www.instagram.com/zaviahorg",
  "https://www.facebook.com/zaviahorg",
  "https://www.linkedin.com/company/zaviahorg",
  "https://www.tiktok.com/@zaviahorg",
  "https://www.linktr.ee/zaviahorg",
] as const;

export function pageTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function pageUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}
