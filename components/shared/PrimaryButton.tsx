import type { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function PrimaryButton({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-gold text-gold-foreground hover:bg-gold-hover shadow-sm hover:shadow-md border border-transparent",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost:
      "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
