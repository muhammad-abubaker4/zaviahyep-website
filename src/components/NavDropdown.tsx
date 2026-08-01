import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavDropdownItem = { name: string; href: string };

type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  triggerClassName: string;
};

/**
 * Desktop navbar submenu. Hand-rolled rather than pulled from Radix: the
 * primitive dragged @floating-ui, roving focus, focus-scope and dismissable
 * layer into the entry chunk (~150 KB of source) to position a five-item list
 * under a fixed navbar that never needs collision detection.
 */
const NavDropdown = ({ label, items, triggerClassName }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuId = useId();
  const { pathname } = useLocation();

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const focusItem = (index: number) => {
    const wrapped = (index + items.length) % items.length;
    itemRefs.current[wrapped]?.focus();
  };

  const openAt = (index: number) => {
    setOpen(true);
    window.requestAnimationFrame(() => focusItem(index));
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openAt(0);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openAt(items.length - 1);
          }
        }}
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {items.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              role="menuitem"
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              onClick={() => close()}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  focusItem(index + 1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  focusItem(index - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  focusItem(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  focusItem(items.length - 1);
                } else if (event.key === "Tab") {
                  setOpen(false);
                }
              }}
              className="block rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
