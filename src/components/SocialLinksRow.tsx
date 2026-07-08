import type { SocialLink } from "@/data/socialLinks";
import { cn } from "@/lib/utils";

type SocialLinksRowProps = {
  links: SocialLink[];
  size?: "xs" | "sm" | "md";
  className?: string;
  nowrap?: boolean;
};

const sizeClasses = {
  xs: { button: "h-8 w-8", icon: "h-3.5 w-3.5" },
  sm: { button: "h-10 w-10", icon: "h-4 w-4" },
  md: { button: "h-11 w-11", icon: "h-[18px] w-[18px]" },
};

const SocialLinksRow = ({ links, size = "md", className, nowrap = false }: SocialLinksRowProps) => {
  const s = sizeClasses[size];

  return (
    <div className={cn("flex gap-2", nowrap ? "flex-nowrap" : "flex-wrap", className)}>
      {links.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className={cn(
            "flex items-center justify-center rounded-xl text-white shadow-soft transition-transform duration-300 hover:scale-105",
            s.button,
            social.bgClass,
            social.hoverClass,
          )}
        >
          <social.Icon className={s.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinksRow;
