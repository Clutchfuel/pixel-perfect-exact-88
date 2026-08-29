import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#F5F4EF] text-[#0B0D10]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Logo size="md" variant="dark" />
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-[#767f8c]">
              Performance intelligence for competitive athletes.
            </p>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#454b54]">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#454b54]">
              <li>
                <a href="#clutch-score" className="transition hover:text-[#0B0D10]">
                  Clutch Score
                </a>
              </li>
              <li>
                <span className="text-[#767f8c]">Daily Check-In</span>
              </li>
              <li>
                <span className="text-[#767f8c]">Coming Soon</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#454b54]">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#454b54]">
              <li>
                <a href="#about" className="transition hover:text-[#0B0D10]">
                  About
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-[#0B0D10]">
                  Mission
                </a>
              </li>
              <li>
                <span className="text-[#767f8c]">Careers</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#454b54]">
              For
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#454b54]">
              <li>
                <a href="#athletes" className="transition hover:text-[#0B0D10]">
                  Athletes
                </a>
              </li>
              <li>
                <span className="text-[#767f8c]">Parents</span>
              </li>
              <li>
                <a href="#coaches" className="transition hover:text-[#0B0D10]">
                  Teams
                </a>
              </li>
              <li>
                <a href="#coaches" className="transition hover:text-[#0B0D10]">
                  Coaches
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#454b54]">
              Legal
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#454b54]">
              <li>
                <a href="/privacy" className="transition hover:text-[#0B0D10]">
                  Privacy
                </a>
              </li>
              <li>
                <span className="text-[#767f8c]">Terms</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-black/10 pt-8 text-xs text-[#767f8c] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ClutchFuel. Prepare. Perform. Recover.</span>
          <span>Instagram · TikTok · YouTube</span>
        </div>
      </div>
    </footer>
  );
}
