import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { sports } from "@/data/sports";
import { articles } from "@/data/insights";
import { SITE_URL } from "@/config";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/system", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/products", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/sweat-rate", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/platform", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/athletes", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/insights", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/faq", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.5", lastmod: today },
          { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: today },
          { path: "/clutch-score", changefreq: "monthly", priority: "0.7", lastmod: today },
          ...products.map((p) => ({
            path: `/products/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: today,
          })),
          ...sports.map((s) => ({
            path: `/athletes/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: today,
          })),
          ...articles.map((a) => ({
            path: `/insights/${a.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
            lastmod: a.publishedAt,
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
