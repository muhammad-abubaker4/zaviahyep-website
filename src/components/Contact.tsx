import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { scrollToHashWhenReady } from "@/lib/scroll";
import { WHATSAPP_NUMBER, WHATSAPP_URL, EMAIL, MAILTO_URL } from "@/lib/constants";
import { submitNetlifyForm } from "@/lib/netlifyForm";
import { GmailIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { followUsLinks } from "@/data/socialLinks";
import SectionHeader from "@/components/SectionHeader";
import SocialLinksRow from "@/components/SocialLinksRow";

const contactInfo = [
  { type: "email" as const, label: "Email", value: EMAIL, link: MAILTO_URL, icon: Mail },
  { type: "whatsapp" as const, label: "WhatsApp", value: WHATSAPP_NUMBER, link: WHATSAPP_URL, icon: MessageCircle },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    if (import.meta.env.DEV) {
      setError(`The contact form works on the live site after deploy. For now, email ${EMAIL} or message us on WhatsApp.`);
      setSending(false);
      return;
    }

    const form = e.currentTarget;
    try {
      await submitNetlifyForm(form);
      setSubmitted(true);
      form.reset();
    } catch {
      setError(`Could not send right now. Please email us at ${EMAIL} or message on WhatsApp.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-muted overflow-hidden" ref={ref}>
      <div className="bg-line-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative px-4">
        <SectionHeader
          eyebrow="Connect"
          title="Get in"
          highlight="Touch"
          description="Ready to start your journey with Zaviah? We would love to hear from you."
        />

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
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
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                    <p className="text-lg font-bold text-foreground">Message sent</p>
                    <p className="text-sm text-muted-foreground">We received your message and will reply soon.</p>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Do not fill: <input name="bot-field" />
                      </label>
                    </p>
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
                        <option value="Partnership">Partnership</option>
                        <option value="Mentorship">Mentorship</option>
                        <option value="Membership">Membership</option>
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
                    <Button type="submit" className="w-full rounded-full py-6" disabled={sending}>
                      {sending ? "Sending..." : "Send message"}
                    </Button>
                    {error && <p className="text-center text-sm text-destructive">{error}</p>}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary p-10 text-center text-primary-foreground sm:p-14"
        >
          <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-30" aria-hidden />
          <div className="relative">
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Join the Movement</h3>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
              Be part of a community that believes in Access, Awareness, and Aspiration.
            </p>
            <button type="button" onClick={() => scrollToHashWhenReady("#apply")} className="btn-primary-modern mt-8">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
