/** Athlete profile app (calculator, dashboard, sessions) */
export const ATHLETE_APP_URL =
  (typeof import.meta !== "undefined" && import.meta.env.VITE_ATHLETE_APP_URL) ||
  "https://clutch-athlete-insight.lovable.app";

export const site = {
  name: "ClutchFuel",
  tagline: "Performance Starts With Preparation.",
  primaryCta: "Build My Athlete Profile",
  addSessionCta: "Add Session",
  howItWorksHref: "/#how-it-works",
  dashboardCta: "View Dashboard",
  ctaHref: `${ATHLETE_APP_URL}/calculator`,
  sessionHref: `${ATHLETE_APP_URL}/session`,
  dashboardHref: `${ATHLETE_APP_URL}/dashboard`,
  loginHref: `${ATHLETE_APP_URL}/login`,
  description:
    "Hydration intelligence for everyday athletes. Know your body. Build better habits. Perform at your best.",
  social: {
    instagram: "https://instagram.com/clutchfuel",
    youtube: "https://youtube.com/@clutchfuel",
    tiktok: "https://tiktok.com/@clutchfuel",
    x: "https://x.com/clutchfuel",
  },
};

export type NavLink = {
  label: string;
  to: string;
  external?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Build Profile", to: site.ctaHref, external: true },
  { label: "Dashboard", to: site.dashboardHref, external: true },
  { label: "About", to: "/about" },
  { label: "Login", to: site.loginHref, external: true },
];

export const footer = {
  emailPlaceholder: "you@example.com",
  emailCta: "Get performance insights",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Build Profile", to: site.ctaHref },
        { label: "Add Session", to: site.sessionHref },
        { label: "Dashboard", to: site.dashboardHref },
        { label: "The System", to: "/system" },
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
