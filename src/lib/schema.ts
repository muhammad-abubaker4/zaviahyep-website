import { SITE_URL, pageUrl } from "@/lib/site";

function absoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
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

export function personSchema(opts: {
  name: string;
  jobTitle: string;
  path: string;
  description: string;
  image?: string;
}) {
  const image = absoluteUrl(opts.image);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    url: pageUrl(opts.path),
    description: opts.description,
    ...(image ? { image } : {}),
    worksFor: {
      "@type": "Organization",
      name: "Zaviah",
      url: `${SITE_URL}/`,
    },
  };
}
