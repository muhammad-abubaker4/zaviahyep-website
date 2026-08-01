import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

type FormConsentProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/** Required privacy/terms consent for forms that collect personal data. */
export const FormConsent = ({ id, checked, onChange }: FormConsentProps) => (
  <div className="flex items-start gap-3">
    <input
      id={id}
      name="consent"
      type="checkbox"
      required
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 h-4 w-4 shrink-0 rounded border-primary/30 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    />
    <Label htmlFor={id} className="text-sm font-normal leading-relaxed text-muted-foreground">
      I have read and agree to the{" "}
      <Link to="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link to="/terms" className="font-medium text-primary underline-offset-4 hover:underline">
        Terms of Service
      </Link>
      .
    </Label>
  </div>
);

type FormHoneypotProps = {
  /** Unique id - a page may mount more than one form. */
  id: string;
};

/**
 * Netlify's honeypot: the form declares `netlify-honeypot="bot-field"`, and Netlify
 * silently discards any submission where this field is filled in. Kept off-screen,
 * aria-hidden, and out of the tab order so people never reach it.
 */
export const FormHoneypot = ({ id }: FormHoneypotProps) => (
  <div
    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
    aria-hidden="true"
  >
    <label htmlFor={id}>
      Leave this field empty
      <input id={id} type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
    </label>
  </div>
);
