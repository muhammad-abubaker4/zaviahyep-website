import { cn } from "@/lib/utils";
import zaviahLogoLight from "@/assets/Zaviah_Logo1.png";
import zaviahLogoDark from "@/assets/Zaviah Logo.png";

type ZaviahLogoProps = {
  variant?: "light" | "dark";
  className?: string;
  alt?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

const ZaviahLogo = ({
  variant = "light",
  className,
  alt = "Zaviah Logo",
  ...props
}: ZaviahLogoProps) => (
  <img
    src={variant === "dark" ? zaviahLogoDark : zaviahLogoLight}
    alt={alt}
    className={cn("w-auto object-contain", className)}
    {...props}
  />
);

export default ZaviahLogo;
