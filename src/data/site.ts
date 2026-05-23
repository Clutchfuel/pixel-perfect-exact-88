export const site = {
  name: "ClutchFuel",
  tagline: "Performance Starts With Preparation.",
  primaryCta: "Unlock My Clutch Score",
  ctaHref: "/clutch-score",
  description:
    "Hydration intelligence for everyday athletes. Unlock your Clutch Score, sweat profile, and personalized hydration insights.",
};

export const navLinks = [
  { label: "The System", to: "/system" },
  { label: "Products", to: "/products" },
  { label: "Athletes", to: "/athletes" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
] as const;

export const footer = {
  emailPlaceholder: "you@example.com",
  emailCta: "Get performance insights",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "The System", to: "/system" },
        { label: "Sweat Rate", to: "/sweat-rate" },
        { label: "Clutch Score Platform", to: "/platform" },
        { label: "Clutch Score", to: "/clutch-score" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "All Products", to: "/products" },
        { label: "Clutch ISO", to: "/products/clutch-iso" },
        { label: "Clutch Flow", to: "/products/clutch-flow" },
        { label: "Clutch Recovery", to: "/products/clutch-recovery" },
      ],
    },
    {
      title: "Athletes",
      links: [
        { label: "Profiles", to: "/athletes" },
        { label: "Basketball", to: "/athletes/basketball" },
        { label: "Running", to: "/athletes/running" },
        { label: "Hyrox", to: "/athletes/hyrox" },
        { label: "Gym", to: "/athletes/gym" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Insights", to: "/insights" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
        { label: "Privacy", to: "/privacy" },
      ],
    },
  ],
};
