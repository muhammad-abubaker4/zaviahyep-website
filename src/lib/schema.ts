import { SITE_URL, pageUrl } from "@/lib/site";

function absoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** Homepage WebPage node — complements Organization/WebSite in index.html. */
export function homeWebPageSchema(opts: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/og-share.jpg`,
    },
  };
}

export function faqPageSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function imageGallerySchema(opts: {
  name: string;
  description: string;
  path: string;
  images: string[];
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: opts.name,
    description: opts.description,
    url: pageUrl(opts.path),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    numberOfItems: opts.images.length,
    associatedMedia: opts.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image),
    })),
  };
}

export function personSchema(opts: {
  name: string;
  jobTitle: string;
  path: string;
  description: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}) {
  const image = absoluteUrl(opts.image);
  const sameAs = opts.sameAs?.filter(Boolean) ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    url: pageUrl(opts.path),
    description: opts.description,
    ...(image ? { image } : {}),
    ...(opts.email ? { email: opts.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    /** Points at the NGO node declared in index.html rather than restating it. */
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}
