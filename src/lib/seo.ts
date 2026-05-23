import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/config";

export { SITE_NAME, SITE_URL };

type MetaOpts = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  image?: string;
};

export function makeMeta({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
}: MetaOpts) {
  const url = `${SITE_URL}${path}`;
  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
  return meta;
}

export function noindexMeta(title = "Page not found — ClutchFuel") {
  return [{ title }, { name: "robots", content: "noindex, nofollow" }] as Array<{
    title?: string;
    name?: string;
    content?: string;
  }>;
}

export function canonical(path: string) {
  return [{ rel: "canonical" as const, href: `${SITE_URL}${path}` }];
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
}

export function organizationSchema(sameAs: string[] = []) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-schema.png`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  });
}

export function websiteSchema() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  });
}

export function collectionPageSchema(opts: { name: string; description: string; path: string }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  });
}
