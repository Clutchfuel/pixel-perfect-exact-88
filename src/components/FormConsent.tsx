import { Link } from "@tanstack/react-router";

type FormConsentProps = {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function FormConsent({
  id = "marketing-consent",
  checked,
  onChange,
  className = "",
}: FormConsentProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-2 text-left text-xs ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/20 accent-lime"
      />
      <span>
        I agree to receive emails from ClutchFuel.{" "}
        <Link to="/privacy" className="underline hover:text-ink">
          Privacy policy
        </Link>
      </span>
    </label>
  );
}
