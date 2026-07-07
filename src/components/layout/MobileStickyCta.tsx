import { Link } from "@tanstack/react-router";

export function MobileStickyCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 md:hidden">
      <Link
        to="/clutch-score"
        className="pointer-events-auto w-full max-w-sm rounded-full bg-electric px-6 py-4 text-center text-sm font-semibold text-black shadow-lg electric-glow transition hover:bg-electric-dark"
      >
        Take the Clutch Score
      </Link>
    </div>
  );
}
