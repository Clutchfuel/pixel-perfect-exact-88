export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="#clutch-score" className="transition hover:text-white">
                  Clutch Score
                </a>
              </li>
              <li>
                <span className="text-white/35">Clutch Plan</span>
              </li>
              <li>
                <span className="text-white/35">App</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="#about" className="transition hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-white">
                  Mission
                </a>
              </li>
              <li>
                <span className="text-white/35">Careers</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">For</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="#athletes" className="transition hover:text-white">
                  Athletes
                </a>
              </li>
              <li>
                <a href="#parents" className="transition hover:text-white">
                  Parents
                </a>
              </li>
              <li>
                <a href="#teams" className="transition hover:text-white">
                  Teams
                </a>
              </li>
              <li>
                <span className="text-white/35">Coaches</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Legal</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="/privacy" className="transition hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <span className="text-white/35">Terms</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-white/30">
          © {new Date().getFullYear()} ClutchFuel
        </p>
      </div>
    </footer>
  );
}
