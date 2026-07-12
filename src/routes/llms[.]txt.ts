import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/config";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          `# ClutchFuel`,
          ``,
          `> Performance intelligence for everyday athletes. Hydration system + free Clutch Score diagnostic.`,
          ``,
          `ClutchFuel helps everyday athletes prepare, perform, and recover with a three-stage hydration system and a free Clutch Score assessment. The Score returns a number, a Biggest Opportunity, and a First Clutch Move — not a lab sweat-rate measurement.`,
          ``,
          `## Primary pages`,
          ``,
          `- Homepage: ${SITE_URL}/`,
          `- Clutch Score (free assessment): ${SITE_URL}/clutch-score`,
          `- What is Clutch Score: ${SITE_URL}/insights/what-is-clutch-score`,
          `- Biggest Opportunity guide: ${SITE_URL}/insights/biggest-opportunity-performance-gaps`,
          `- The System (Prepare / Perform / Recover): ${SITE_URL}/system`,
          `- Products: ${SITE_URL}/products`,
          `- Sweat rate education: ${SITE_URL}/sweat-rate`,
          `- Athletes: ${SITE_URL}/athletes`,
          `- Insights (articles): ${SITE_URL}/insights`,
          `- FAQ: ${SITE_URL}/faq`,
          `- About: ${SITE_URL}/about`,
          `- Contact: ${SITE_URL}/contact`,
          `- Privacy: ${SITE_URL}/privacy`,
          ``,
          `## Products`,
          ``,
          `- Clutch ISO (Prepare): ${SITE_URL}/products/clutch-iso`,
          `- Clutch Flow (Perform): ${SITE_URL}/products/clutch-flow`,
          `- Clutch Recovery (Recover): ${SITE_URL}/products/clutch-recovery`,
          ``,
          `## Optional`,
          ``,
          `- Sitemap: ${SITE_URL}/sitemap.xml`,
        ].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
