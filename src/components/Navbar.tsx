import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { scrollToHashWhenReady, unlockPageScroll } from "@/lib/scroll";
import { useActiveSection, isAboutSectionActive, isTeamRouteActive } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import ZaviahLogo from "@/components/ZaviahLogo";

type NavLink = { name: string; href: string };
type NavDropdown = {
  name: string;
  subItems: Array<{ name: string; href: string; internal?: boolean }>;
};

const aboutSubItems: NavDropdown["subItems"] = [
  { name: "Our Story", href: "#about" },
  { name: "Founder's Message", href: "#founder-message" },
  { name: "Vision & Mission", href: "#vision" },
  { name: "Core Pillars", href: "#pillars" },
  { name: "Our Values", href: "#values" },
  { name: "Future Goals", href: "#future-goals" },
];

const teamSubItems: NavDropdown["subItems"] = [
  { name: "Founder", href: "/founder", internal: true },
  { name: "Co Founder", href: "/co-founder", internal: true },
  { name: "Core Members", href: "/core-members", internal: true },
  { name: "Guest Speakers", href: "#guest-speakers" },
];

const joinSubItems: NavDropdown["subItems"] = [
  { name: "Member", href: "#apply" },
  { name: "Ambassador", href: "#apply" },
  { name: "Core Team Member", href: "#apply" },
];

const navLinks: NavLink[] = [
  { name: "Programs", href: "#offerings" },
  { name: "Impact", href: "#impact" },
  { name: "Gallery", href: "#gallery" },
  { name: "Partners", href: "#partnerships" },
  { name: "Contact", href: "#contact" },
];

const navDropdowns: NavDropdown[] = [
  { name: "About", subItems: aboutSubItems },
  { name: "Team", subItems: teamSubItems },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = useActiveSection();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const isLinkActive = (href: string) =>
    location.pathname === "/" && activeSection === href.replace("#", "");

  const navTextClass = "text-primary-foreground/90";
  const navHoverClass = "hover:bg-primary-foreground/10";
  const navActiveClass = "text-primary-foreground bg-primary-foreground/15";

  const navButtonClass = (href: string, mobile = false) =>
    cn(
      mobile
        ? "w-full rounded-lg px-4 py-3.5 text-left text-lg font-semibold transition-colors"
        : "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 xl:text-base",
      isLinkActive(href) ? navActiveClass : cn(navTextClass, navHoverClass),
    );

  const aboutNavClass = (mobile = false) =>
    cn(
      mobile
        ? "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors"
        : "flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 xl:text-base",
      location.pathname === "/" && isAboutSectionActive(activeSection)
        ? navActiveClass
        : cn(navTextClass, navHoverClass),
    );

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    unlockPageScroll();
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
      const firstFocusable = mobilePanelRef.current?.querySelector<HTMLElement>(
        'button, a, [href], [tabindex]:not([tabindex="-1"])',
      );
      window.requestAnimationFrame(() => firstFocusable?.focus());
    } else {
      unlockPageScroll();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
        return;
      }
      if (e.key !== "Tab" || !mobilePanelRef.current) return;

      const focusable = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsNavVisible(true);
      return;
    }

    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setIsNavVisible(window.scrollY < 64);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    closeMobileMenu();

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: href.slice(1) });
        return;
      }
      scrollToHashWhenReady(href);
      return;
    }

    navigate(href);
  };

  const dropdownTriggerClass = (item: NavDropdown, mobile = false) => {
    if (item.name === "About") return aboutNavClass(mobile);
    if (item.name === "Team") {
      return cn(
        mobile
          ? "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors"
          : "flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 xl:text-base",
        isTeamRouteActive(location.pathname) ||
          (location.pathname === "/" && (activeSection === "team" || activeSection === "guest-speakers"))
          ? navActiveClass
          : cn(navTextClass, navHoverClass),
      );
    }
    return cn(
      mobile
        ? "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors"
        : "flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 xl:text-base",
      cn(navTextClass, navHoverClass),
    );
  };

  const renderDropdown = (item: NavDropdown, mobile = false) => {
    if (mobile) {
      const isOpen = openMobileDropdown === item.name;
      return (
        <div key={item.name} className="px-4 py-2">
          <button
            type="button"
            onClick={() => setOpenMobileDropdown(isOpen ? null : item.name)}
            className={dropdownTriggerClass(item, true)}
            aria-expanded={isOpen}
            aria-controls={`mobile-submenu-${item.name.toLowerCase()}`}
          >
            {item.name}
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
          </button>
          {isOpen && (
            <div
              id={`mobile-submenu-${item.name.toLowerCase()}`}
              role="group"
              aria-label={`${item.name} submenu`}
              className="ml-4 mt-1 flex flex-col gap-1"
            >
              {item.subItems.map((subItem) =>
                subItem.internal ? (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2 text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10"
                  >
                    {subItem.name}
                  </Link>
                ) : subItem.href.startsWith("#") ? (
                  <button
                    key={subItem.name}
                    type="button"
                    onClick={() => scrollToSection(subItem.href)}
                    className="w-full rounded-lg px-4 py-2 text-left text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10"
                  >
                    {subItem.name}
                  </button>
                ) : (
                  <a
                    key={subItem.name}
                    href={subItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-2 text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10"
                  >
                    {subItem.name}
                  </a>
                ),
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <DropdownMenu key={item.name} modal={false}>
        <DropdownMenuTrigger asChild>
          <button type="button" className={dropdownTriggerClass(item)}>
            {item.name}
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {item.subItems.map((subItem) =>
            subItem.internal ? (
              <DropdownMenuItem key={subItem.name} asChild>
                <Link to={subItem.href} className="cursor-pointer">
                  {subItem.name}
                </Link>
              </DropdownMenuItem>
            ) : subItem.href.startsWith("#") ? (
              <DropdownMenuItem
                key={subItem.name}
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  scrollToSection(subItem.href);
                }}
              >
                {subItem.name}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={subItem.name} asChild>
                <a
                  href={subItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  {subItem.name}
                </a>
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <motion.nav
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: isNavVisible ? 0 : "-120%" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        id="navbar"
        aria-label="Primary"
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-3 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-full max-w-[100rem] items-center justify-between gap-3 rounded-2xl border border-primary-foreground/15 bg-primary px-3 shadow-lift sm:h-[5rem] sm:px-8 lg:px-10 xl:px-12",
          )}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", "/");
              } else {
                navigate("/");
              }
              closeMobileMenu();
            }}
            className="flex min-w-0 cursor-pointer items-center gap-2 sm:gap-2.5"
          >
            <ZaviahLogo
              variant="dark"
              className={cn(
                "transition-all duration-300",
                "h-10 w-auto shrink-0 sm:h-14 lg:h-16",
              )}
            />
            <span
              className={cn(
                "truncate text-base font-bold tracking-tight text-primary-foreground sm:text-2xl",
              )}
            >
              Zaviah
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
              {navDropdowns.map((item) => renderDropdown(item))}
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={navButtonClass(item.href)}
                >
                  {item.name}
                </button>
              ))}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className={cn(
                      "ml-1 rounded-full font-semibold shadow-soft",
                      "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                    )}
                  >
                    Join Us
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {joinSubItems.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.name}
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                        scrollToSection(subItem.href);
                      }}
                    >
                      {subItem.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={cn(
                "rounded-xl p-2 transition-colors lg:hidden",
                "text-primary-foreground hover:bg-primary-foreground/10",
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      {isMobileMenuOpen && (
        <motion.div
          ref={mobilePanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="fixed inset-x-0 top-0 z-40 max-h-screen overflow-y-auto rounded-b-3xl border border-primary-foreground/15 bg-primary/98 shadow-lift backdrop-blur-xl lg:hidden"
        >
          <div className="container px-4 py-6 pt-[4.5rem] sm:pt-24">
            <div className="flex flex-col gap-1">
              {navDropdowns.map((item) => renderDropdown(item, true))}
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={navButtonClass(item.href, true)}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 py-3">
                <p className="mb-2 px-4 text-sm font-semibold text-primary-foreground/60">Join Us</p>
                {joinSubItems.map((subItem) => (
                  <button
                    key={subItem.name}
                    type="button"
                    onClick={() => scrollToSection(subItem.href)}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10"
                  >
                    {subItem.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
