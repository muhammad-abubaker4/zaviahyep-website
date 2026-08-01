import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { scrollToHashWhenReady } from "@/lib/scroll";
import { WHATSAPP_URL, EMAIL, MAILTO_URL } from "@/lib/constants";
import { footerSocialLinks } from "@/data/socialLinks";
import SocialLinksRow from "@/components/SocialLinksRow";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ZaviahLogo from "@/components/ZaviahLogo";
import { GET_INVOLVED_PATH, opportunityPath } from "@/lib/routes";

const footerLinks = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "About", href: "/about", type: "route" as const },
  { label: "Programs", href: "#offerings", type: "hash" as const },
  { label: "Get Involved", href: GET_INVOLVED_PATH, type: "route" as const },
  { label: "Gallery", href: "/gallery", type: "route" as const },
  { label: "Partners", href: "/partners", type: "route" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const footerPrograms = [
  { label: "Mentorship Programs", href: "#offerings" },
  { label: "Skill Building Workshops", href: "#offerings" },
  { label: "Career Guidance", href: "#offerings" },
  { label: "Community Events", href: "#offerings" },
  { label: "Leadership Opportunities", href: "#offerings" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashLink = (href: string) => {
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: href.slice(1) });
      return;
    }
    scrollToHashWhenReady(href);
  };

  const columnHeading = "mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50";
  const linkClass = "text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground";

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 overflow-hidden rounded-3xl bg-background p-6 text-foreground shadow-lift sm:flex sm:items-center sm:justify-between sm:p-8">
          <div className="mb-5 sm:mb-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Get Involved
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Ready to make an impact?
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Explore membership, volunteering, mentorship, and partnerships, then apply through our
              official forms.
            </p>
          </div>
          <Link
            to={GET_INVOLVED_PATH}
            className="inline-flex shrink-0 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3">
              <ZaviahLogo variant="dark" className="h-16 w-auto shrink-0 sm:h-[4.5rem]" alt="" aria-hidden />
              <span className="text-xl font-bold tracking-tight">Zaviah</span>
            </Link>
            <p className="mb-1 text-sm font-bold text-primary-foreground/90">Access | Awareness | Aspiration</p>
            <p className="mb-5 text-sm leading-relaxed text-primary-foreground/60">
              A non profit initiative for mentorship, guidance, and growth.
            </p>
            <a href={MAILTO_URL} className="mb-6 block text-sm font-semibold text-primary-foreground hover:text-primary-foreground/80">
              {EMAIL}
            </a>
            <div className="flex items-center gap-2">
              <SocialLinksRow links={footerSocialLinks} size="xs" nowrap />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-soft transition-transform duration-300 hover:scale-105"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className={columnHeading}>Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.type === "route" ? (
                    <Link to={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <button type="button" onClick={() => handleHashLink(link.href)} className={linkClass}>
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
              <li>
                <Link to={opportunityPath("member")} className={linkClass}>
                  Become a Member
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={columnHeading}>Programs</h4>
            <ul className="space-y-3">
              {footerPrograms.map((program) => (
                <li key={program.label}>
                  <button
                    type="button"
                    onClick={() => handleHashLink(program.href)}
                    className={`text-left ${linkClass}`}
                  >
                    {program.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={columnHeading}>Location</h4>
            <p className="text-sm leading-relaxed text-primary-foreground/65">
              Nationwide youth empowerment platform based in Pakistan, connecting students and mentors
              across the country.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10 bg-footer-bar py-6">
        <div className="mx-auto w-full max-w-6xl px-6 text-center text-sm text-primary-foreground/50 md:px-8">
          <p>
            Copyright &copy; {currentYear}{" "}
            <span className="font-semibold text-primary-foreground/70">
              Zaviah Youth Empowerment Platform
            </span>
            {" · "}
            Design and Developed by{" "}
            <a
              href="https://www.instagram.com/muhammad._abubaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-foreground hover:underline underline-offset-2"
            >
              Muhammad Abubaker
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
