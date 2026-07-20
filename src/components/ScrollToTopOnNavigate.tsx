import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Force window scroll to top on pathname changes (mobile SPA navigations). */
export function ScrollToTopOnNavigate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    // Hash links should land on the target, not the top of the page.
    if (hash) return;

    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    reset();
    // Mobile browsers sometimes restore scroll after the first paint.
    const t1 = window.setTimeout(reset, 0);
    const t2 = window.setTimeout(reset, 50);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
}
