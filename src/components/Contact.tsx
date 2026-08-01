import { m, useInView } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { useRef, useState } from "react";
import { CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WHATSAPP_NUMBER, WHATSAPP_URL, EMAIL, MAILTO_URL } from "@/lib/constants";
import { FormConsent, FormHoneypot } from "@/components/FormConsent";
import { GmailIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { followUsLinks } from "@/data/socialLinks";
import SectionHeader from "@/components/SectionHeader";
import SocialLinksRow from "@/components/SocialLinksRow";

const contactInfo = [
  { type: "email" as const, label: "Email", value: EMAIL, link: MAILTO_URL, icon: Mail },
  { type: "whatsapp" as const, label: "WhatsApp", value: WHATSAPP_NUMBER, link: WHATSAPP_URL, icon: MessageCircle },
];

/** Must match the form declared in public/__forms.html, which is what Netlify scans. */
const FORM_NAME = "contact";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    if (!consent) {
      setError("Please agree to the Privacy Policy and Terms of Service to continue.");
      return;
    }

    setSending(true);
    setError(null);

    // Netlify accepts the submission as a urlencoded POST to any page path, which keeps
    // the visitor here instead of following the redirect a plain HTML form would.
    const body = new URLSearchParams({ "form-name": FORM_NAME });
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") body.append(key, value);
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Netlify responded with ${response.status}`);

      setSubmitted(true);
      setConsent(false);
      form.reset();
    } catch {
      setError(
        `We couldn't send your message. Please try again or email us directly at ${EMAIL}.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-light overflow-hidden" ref={ref}>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Connect"
          title="Get in"
          highlight="Touch"
          description="Ready to start your journey with Zaviah? We would love to hear from you."
        />

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <m.aside
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={revealTransition()}
            className="flex h-full flex-col gap-5 lg:col-span-5"
          >
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary p-7 text-primary-foreground sm:p-8">
              <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
                  Direct channels
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Talk to our team</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                  Reach out for partnerships, mentorship questions, or general inquiries.
                </p>

                <div className="mt-6 space-y-3">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.link}
                      target={item.type === "whatsapp" ? "_blank" : undefined}
                      rel={item.type === "whatsapp" ? "noopener noreferrer" : undefined}
                      className="contact-channel-dark group"
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                          item.type === "whatsapp" ? "bg-[#25D366]" : "bg-primary-foreground"
                        }`}
                      >
                        {item.type === "whatsapp" ? (
                          <WhatsAppIcon className="h-5 w-5 text-white" />
                        ) : (
                          <GmailIcon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/50">
                          {item.label}
                        </p>
                        <p className="font-semibold text-primary-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card-light p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-primary/60">Follow Us</p>
              <SocialLinksRow links={followUsLinks} size="md" />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Stay updated on sessions, events, and community highlights across our social channels.
              </p>
            </div>
          </m.aside>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={revealTransition(0.1)}
            className="lg:col-span-7"
          >
            <div className="glass-card-light relative h-full overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" aria-hidden />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="icon-badge h-10 w-10">
                    <Send className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">Send us a message</h3>
                    <p className="text-sm text-muted-foreground">We typically respond within 24 to 48 hours.</p>
                  </div>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                    <p className="text-lg font-bold text-foreground">Thank you for contacting Zaviah</p>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ve received your message and will respond within 24 to 48 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    name={FORM_NAME}
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    className="relative space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value={FORM_NAME} />
                    <FormHoneypot id="contact-bot-field" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input
                          id="contact-name"
                          name="name"
                          required
                          placeholder="Your name"
                          className="rounded-xl border-primary/15 bg-background/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          className="rounded-xl border-primary/15 bg-background/80"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="flex h-11 w-full rounded-xl border border-primary/15 bg-background/80 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="General Questions">General Questions</option>
                        <option value="Website Feedback">Website Feedback</option>
                        <option value="Technical Issues">Technical Issues</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="rounded-xl border-primary/15 bg-background/80"
                      />
                    </div>
                    <FormConsent id="contact-consent" checked={consent} onChange={setConsent} />
                    <Button type="submit" className="w-full rounded-full py-6" disabled={sending || !consent}>
                      {sending ? "Sending..." : "Send message"}
                    </Button>
                    {error && <p className="text-center text-sm text-destructive" role="alert">{error}</p>}
                  </form>
                )}
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
