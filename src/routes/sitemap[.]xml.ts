import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/content/articles";
import { SITE_URL } from "@/config";

const STATIC_PATHS = [
  "/",
  "/clutch-score",
  "/how-it-works",
  "/performance-hub",
  "/about",
  "/mission",
  "/promise",
  "/partnerships",
  "/community",
  "/privacy",
] as const;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: `${SITE_URL}${path === "/" ? "" : path}`,
      changefreq: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? "1.0" : path === "/clutch-score" ? "0.9" : "0.7",
    })),
    ...ARTICLES.map((article) => ({
      loc: `${SITE_URL}/performance-hub/${article.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(buildSitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
