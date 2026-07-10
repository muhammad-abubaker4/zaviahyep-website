import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EMAIL } from "@/lib/constants";
import { formDataToObject, submitForm } from "@/lib/submitForm";
import { cn } from "@/lib/utils";
import type { ApplicationRole } from "@/components/JoinUs";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  education: string;
  institution: string;
  role: ApplicationRole;
  motivation: string;
  referral: string;
};

const roleLabels: Record<ApplicationRole, string> = {
  member: "Member",
  ambassador: "Campus Ambassador",
  core: "Core Team Member",
};

const steps = ["Personal Info", "Background", "Your Goals", "Review"];

type ApplicationFormProps = {
  defaultRole: ApplicationRole;
  onChangeRole: () => void;
};

const ApplicationForm = ({ defaultRole, onChangeRole }: ApplicationFormProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    education: "",
    institution: "",
    role: defaultRole,
    motivation: "",
    referral: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return data.fullName && data.email && data.phone && data.city;
    if (step === 1) return data.age && data.education && data.institution;
    if (step === 2) return data.motivation.length >= 20;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      if (canProceed()) setStep((s) => s + 1);
      return;
    }

    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const fields = formDataToObject(form);
    try {
      await submitForm({
        ...fields,
        _subject: `Zaviah Application: ${roleLabels[data.role]}`,
        _replyto: fields.email,
      });
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message === "SUBMIT_TIMEOUT") {
        setError(
          `Submission timed out. Please email ${EMAIL} directly — we are fixing delivery.`,
        );
      } else {
        setError(`Could not submit right now. Please email us at ${EMAIL}.`);
      }
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/10 bg-card px-6 py-20 text-center shadow-lift">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">Application Received</h3>
        <p className="max-w-md text-muted-foreground">
          Thank you for applying as a {roleLabels[defaultRole]}. Our team will review your application
          and reach out via email soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">Applying as</p>
          <p className="font-bold text-foreground">{roleLabels[defaultRole]}</p>
        </div>
        <button
          type="button"
          onClick={onChangeRole}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Change role
        </button>
      </div>

      <div className="mb-10 flex items-center gap-3">
        {steps.map((label, index) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-2.5">
            <div className="relative flex w-full items-center">
              {index > 0 && (
                <div
                  className={cn(
                    "absolute right-1/2 left-0 top-1/2 h-px -translate-y-1/2",
                    index <= step ? "bg-primary" : "bg-border",
                  )}
                  aria-hidden
                />
              )}
              <div
                className={cn(
                  "relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                  index <= step
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-primary/15 bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-1/2 right-0 top-1/2 h-px -translate-y-1/2",
                    index < step ? "bg-primary" : "bg-border",
                  )}
                  aria-hidden
                />
              )}
            </div>
            <span
              className={cn(
                "hidden text-center text-[11px] font-semibold uppercase tracking-wider sm:block",
                index <= step ? "text-primary" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <form name="application" onSubmit={handleSubmit} className="glass-card-light p-6 sm:p-10">
        <input type="hidden" name="role" value={data.role} />
        <input type="hidden" name="fullName" value={data.fullName} />
        <input type="hidden" name="email" value={data.email} />
        <input type="hidden" name="phone" value={data.phone} />
        <input type="hidden" name="city" value={data.city} />
        <input type="hidden" name="age" value={data.age} />
        <input type="hidden" name="education" value={data.education} />
        <input type="hidden" name="institution" value={data.institution} />
        <input type="hidden" name="motivation" value={data.motivation} />
        <input type="hidden" name="referral" value={data.referral} />

        {step === 0 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-foreground">Tell us about yourself</h3>
            <div className="space-y-2">
              <Label htmlFor="apply-name">Full Name</Label>
              <Input id="apply-name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} required placeholder="Your full name" className="rounded-xl border-primary/15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-email">Email</Label>
              <Input id="apply-email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@email.com" className="rounded-xl border-primary/15" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apply-phone">Phone</Label>
                <Input id="apply-phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} required placeholder="+92 300 0000000" className="rounded-xl border-primary/15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-city">City / Region</Label>
                <Input id="apply-city" value={data.city} onChange={(e) => update("city", e.target.value)} required placeholder="Lahore, Karachi, etc." className="rounded-xl border-primary/15" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-foreground">Your background</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apply-age">Age</Label>
                <Input id="apply-age" type="number" min={13} max={30} value={data.age} onChange={(e) => update("age", e.target.value)} required placeholder="18" className="rounded-xl border-primary/15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apply-education">Education Level</Label>
                <Input id="apply-education" value={data.education} onChange={(e) => update("education", e.target.value)} required placeholder="High School, Undergraduate, etc." className="rounded-xl border-primary/15" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-institution">School / University</Label>
              <Input id="apply-institution" value={data.institution} onChange={(e) => update("institution", e.target.value)} required placeholder="Your institution name" className="rounded-xl border-primary/15" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-foreground">Why do you want to join?</h3>
            <div className="space-y-2">
              <Label htmlFor="apply-motivation">Your motivation</Label>
              <Textarea
                id="apply-motivation"
                value={data.motivation}
                onChange={(e) => update("motivation", e.target.value)}
                required
                rows={5}
                placeholder="Share your goals and what you hope to gain from the community (at least 20 characters)"
                className="rounded-xl border-primary/15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-referral">How did you hear about us? (optional)</Label>
              <Input id="apply-referral" value={data.referral} onChange={(e) => update("referral", e.target.value)} placeholder="Social media, friend, event, etc." className="rounded-xl border-primary/15" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-foreground">Review your application</h3>
            <dl className="divide-y divide-border rounded-xl border border-primary/15">
              {[
                ["Role", roleLabels[data.role]],
                ["Name", data.fullName],
                ["Email", data.email],
                ["Phone", data.phone],
                ["City", data.city],
                ["Age", data.age],
                ["Education", data.education],
                ["Institution", data.institution],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="font-medium text-muted-foreground">{label}</dt>
                  <dd className="text-right font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm leading-relaxed text-muted-foreground">{data.motivation}</p>
          </div>
        )}

        {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-full border-primary/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" disabled={!canProceed() || sending} className="rounded-full px-8">
            {step === steps.length - 1 ? (sending ? "Submitting..." : "Submit Application") : "Continue"}
            {step < steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
