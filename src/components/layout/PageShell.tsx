import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileStickyCta } from "./MobileStickyCta";

export function PageShell({
  children,
  showStickyCta = true,
}: {
  children: ReactNode;
  showStickyCta?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <SiteFooter />
      {showStickyCta && <MobileStickyCta />}
    </div>
  );
}
