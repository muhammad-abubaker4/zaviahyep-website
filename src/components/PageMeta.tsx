import { useEffect } from "react";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, pageTitle, pageUrl } from "@/lib/site";

type PageMetaProps = {
  title: string;
  description?: string;
  /** Path only, e.g. `/founder` */
  path?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

const PageMeta = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noIndex = false,
  jsonLd,
}: PageMetaProps) => {
  useEffect(() => {
    const fullTitle = title === DEFAULT_TITLE ? DEFAULT_TITLE : pageTitle(title);
    const url = pageUrl(path);

    document.title = fullTitle;
    setCanonical(url);
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", "Zaviah");
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:secure_url", OG_IMAGE);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", fullTitle);
    setMeta("property", "og:locale", "en_PK");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@ZaviahOrg");
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "twitter:image:alt", fullTitle);

    const scriptId = "page-jsonld";
    document.getElementById(scriptId)?.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, path, noIndex, jsonLd]);

  return null;
};

export default PageMeta;
