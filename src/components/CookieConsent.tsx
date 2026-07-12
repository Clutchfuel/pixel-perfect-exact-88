import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getCookieConsent, setCookieConsent, type CookieConsentValue } from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  function choose(value: CookieConsentValue) {
    setCookieConsent(value);
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new Event("cf:analytics-consent"));
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-5 shadow-card md:inset-x-6 md:p-6"
    >
      <p className="text-sm text-ink/80">
        We use optional analytics cookies to understand how the site is used. You can accept or
        decline, core features work either way.{" "}
        <Link to="/privacy" className="underline hover:text-ink">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full bg-electric px-4 py-2 text-sm font-semibold text-ink transition hover:bg-electric-dark"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
