/** Athlete profile app (calculator, dashboard, sessions) */
export const ATHLETE_APP_URL =
  (typeof import.meta !== "undefined" && import.meta.env.VITE_ATHLETE_APP_URL) ||
  "https://clutch-athlete-insight.lovable.app";

export const site = {
  name: "ClutchFuel",
  tagline: "Performance Starts With Preparation.",
  primaryCta: "Build My Athlete Profile",
  addSessionCta: "Add Session",
  howItWorksHref: "/#why-preparation",
  dashboardCta: "View Dashboard",
  ctaHref: `${ATHLETE_APP_URL}/calculator`,
  sessionHref: `${ATHLETE_APP_URL}/session`,
  dashboardHref: `${ATHLETE_APP_URL}/dashboard`,
  loginHref: `${ATHLETE_APP_URL}/login`,
  description:
    "A performance preparation brand for everyday athletes. Hydration intelligence, discipline, and readiness — not guesswork.",
  social: {
    instagram: "https://instagram.com/clutchfuel",
    youtube: "https://youtube.com/@clutchfuel",
    podcast: "https://youtube.com/@clutchfuel",
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
  { label: "Athletes", to: "/athletes" },
  { label: "Coaches", to: "/#coaches" },
  { label: "Learn", to: "/insights" },
  { label: "Products", to: "/products" },
  { label: "Community", to: "/#community" },
];

export const footer = {
  emailPlaceholder: "you@example.com",
  emailCta: "Join The Community",
  columns: [
    {
      title: "Athletes",
      links: [
        { label: "Athletes", to: "/athletes" },
        { label: "Clutch Score", to: "/clutch-score" },
        { label: "Basketball", to: "/athletes/basketball" },
        { label: "Running", to: "/athletes/running" },
        { label: "Hyrox", to: "/athletes/hyrox" },
      ],
    },
    {
      title: "Coaches",
      links: [
        { label: "Coaches Corner", to: "/#coaches" },
        { label: "Learn", to: "/insights" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Insights", to: "/insights" },
        { label: "Hydration 101", to: "/insights/hydration-101-for-everyday-athletes" },
        { label: "Sweat Rate", to: "/sweat-rate" },
        { label: "Platform", to: "/platform" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "The System", to: "/system" },
        { label: "Clutch ISO", to: "/products/clutch-iso" },
        { label: "Clutch Flow", to: "/products/clutch-flow" },
        { label: "Clutch Recovery", to: "/products/clutch-recovery" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Community", to: "/#community" },
        { label: "About", to: "/about" },
        { label: "Build My Athlete Profile", to: site.ctaHref },
      ],
    },
  ],
};
