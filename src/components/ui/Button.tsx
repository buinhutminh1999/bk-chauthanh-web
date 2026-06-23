import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "zalo" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-md shadow-brand-900/15",
  secondary:
    "bg-white text-brand-800 border border-brand-200 hover:bg-brand-50 active:bg-brand-100",
  ghost: "text-brand-700 hover:bg-brand-50 active:bg-brand-100",
  danger: "bg-danger text-white hover:bg-danger/90 active:bg-danger/80",
  zalo: "bg-zalo text-white hover:bg-zalo-hover active:bg-zalo-hover",
  accent:
    "bg-accent text-brand-900 hover:bg-accent-light active:bg-accent-light border-0",
};

const sizes = {
  sm: "min-h-10 px-3 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
