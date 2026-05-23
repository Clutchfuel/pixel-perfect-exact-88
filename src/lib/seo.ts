export const SITE_URL = "https://pixel-perfect-exact-88.lovable.app";
export const SITE_NAME = "ClutchFuel";

type MetaOpts = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  image?: string;
};

export function makeMeta({ title, description, path, type = "website", image }: MetaOpts) {
  const url = `${SITE_URL}${path}`;
  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return meta;
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
