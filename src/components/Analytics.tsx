import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { GA_MEASUREMENT_ID } from "@/config";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

function loadGoogleAnalytics(): (() => void) | undefined {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  return () => {
    script.remove();
  };
}

export function Analytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncConsent() {
      setEnabled(hasAnalyticsConsent());
    }

    syncConsent();
    window.addEventListener("cf:analytics-consent", syncConsent);
    return () => window.removeEventListener("cf:analytics-consent", syncConsent);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    return loadGoogleAnalytics();
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [enabled, pathname]);

  return null;
}
