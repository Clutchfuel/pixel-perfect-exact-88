import { Link } from "@tanstack/react-router";

export function FormConsent() {
  return (
    <p className="text-xs text-muted-ink">
      By submitting, you agree to receive emails from ClutchFuel.{" "}
      <Link to="/privacy" className="underline hover:text-ink">
        Privacy policy
      </Link>
    </p>
  );
}
