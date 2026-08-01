import { useState, useEffect, useCallback, useRef } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavDropdownMenu, { type NavDropdownItem } from "@/components/NavDropdown";
import { scrollToHashWhenReady, unlockPageScroll } from "@/lib/scroll";
import { useActiveSection, isTeamRouteActive } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import ZaviahLogo from "@/components/ZaviahLogo";
import { GET_INVOLVED_PATH } from "@/lib/routes";
import { DURATION, revealTransition } from "@/lib/motion";

type NavDropdown = {
  name: string;
  subItems: NavDropdownItem[];
};

const communitySubItems: NavDropdownItem[] = [
  { name: "Founder", href: "/founder" },
  { name: "Co Founder", href: "/co-founder" },
  { name: "Core Members", href: "/core-members" },
  { name: "Guest Speakers", href: "/guest-speakers" },
  { name: "Partners", href: "/partners" },
];

type NavLink = { name: string; href: string; route?: boolean };

/** One ordered list so the rendered order matches the source order. */
type NavItem = NavLink | NavDropdown;

const navItems: NavItem[] = [
  { name: "Home", href: "/", route: true },
  { name: "About", href: "/about", route: true },
  { name: "Community", subItems: communitySubItems },
  { name: "Programs", href: "#offerings" },
  { name: "Impact", href: "#impact" },
  { name: "Gallery", href: "/gallery", route: true },
  { name: "Contact", href: "#contact" },
];

const isDropdown = (item: NavItem): item is NavDropdown => "subItems" in item;

function isGetInvolvedActive(pathname: string) {
  return pathname === GET_INVOLVED_PATH || pathname.startsWith(`${GET_INVOLVED_PATH}/`);
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = useActiveSection();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const isLinkActive = (item: NavLink) => {
    if (item.route) {
      if (item.href === "/") return location.pathname === "/";
      return location.pathname === item.href;
    }
    return location.pathname === "/" && activeSection === item.href.replace("#", "");
  };

  const navTextClass = "text-primary-foreground/90";
  const navHoverClass = "hover:bg-primary-foreground/10";
  const navActiveClass = "text-primary-foreground bg-primary-foreground/15";

  const navButtonClass = (item: NavLink, mobile = false) =>
    cn(
      mobile
        ? "w-full rounded-lg px-4 py-3.5 text-left text-lg font-semibold transition-colors"
        : "rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 xl:px-4 xl:py-2.5 xl:text-base",
      isLinkActive(item) ? navActiveClass : cn(navTextClass, navHoverClass),
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
    const baseMobile =
      "flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-lg font-semibold transition-colors";
    const baseDesktop =
      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 xl:px-4 xl:py-2.5 xl:text-base";

    if (item.name === "Community") {
      return cn(
        mobile ? baseMobile : baseDesktop,
        isTeamRouteActive(location.pathname)
          ? navActiveClass
          : cn(navTextClass, navHoverClass),
      );
    }
    return cn(mobile ? baseMobile : baseDesktop, cn(navTextClass, navHoverClass));
  };

  const renderDropdown = (item: NavDropdown, mobile = false) => {
    if (!mobile) {
      return (
        <NavDropdownMenu
          key={item.name}
          label={item.name}
          items={item.subItems}
          triggerClassName={dropdownTriggerClass(item)}
        />
      );
    }

    const isOpen = openMobileDropdown === item.name;
    return (
      <div key={item.name}>
        <button
          type="button"
          onClick={() => setOpenMobileDropdown(isOpen ? null : item.name)}
          className={dropdownTriggerClass(item, true)}
          aria-expanded={isOpen}
          aria-controls={`mobile-submenu-${item.name.toLowerCase()}`}
        >
          {item.name}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden
          />
        </button>
        {isOpen && (
          <div
            id={`mobile-submenu-${item.name.toLowerCase()}`}
            role="group"
            aria-label={`${item.name} submenu`}
            className="ml-4 mt-1 flex flex-col gap-1"
          >
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                to={subItem.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-2 text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10"
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getInvolvedBtnClass = cn(
    "rounded-full font-semibold shadow-soft",
    "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
    isGetInvolvedActive(location.pathname) && "ring-2 ring-primary-foreground/40",
  );

  return (
    <>
      <m.nav
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={revealTransition(0, prefersReducedMotion ? 0 : DURATION.fast)}
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

          <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {navItems.map((item) =>
              isDropdown(item) ? (
                renderDropdown(item)
              ) : item.route ? (
                <Link key={item.name} to={item.href} className={navButtonClass(item)}>
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={navButtonClass(item)}
                >
                  {item.name}
                </button>
              ),
            )}
            <Button asChild size="sm" className={cn("ml-2", getInvolvedBtnClass)}>
              <Link to={GET_INVOLVED_PATH}>Get Involved</Link>
            </Button>
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
      </m.nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      {isMobileMenuOpen && (
        <m.div
          ref={mobilePanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
          transition={revealTransition(0, prefersReducedMotion ? 0 : DURATION.fast)}
          className="fixed inset-x-0 top-0 z-40 max-h-screen overflow-y-auto rounded-b-3xl border border-primary-foreground/15 bg-primary/98 shadow-lift backdrop-blur-xl lg:hidden"
        >
          <div className="container px-4 py-6 pt-[4.5rem] sm:pt-24">
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                isDropdown(item) ? (
                  renderDropdown(item, true)
                ) : item.route ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={navButtonClass(item, true)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className={navButtonClass(item, true)}
                  >
                    {item.name}
                  </button>
                ),
              )}
              <div className="px-4 py-3">
                <Link
                  to={GET_INVOLVED_PATH}
                  onClick={closeMobileMenu}
                  className="block w-full rounded-full bg-primary-foreground px-4 py-3.5 text-center text-base font-semibold text-primary"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </>
  );
};

export default Navbar;
