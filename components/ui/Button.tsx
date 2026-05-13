"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  newTab?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary bg-[--color-steel] text-[--color-bg] hover:bg-[--color-cta-hover]",
  secondary:
    "border border-[--color-border] text-[--color-text] hover:border-[--color-steel] hover:text-[--color-steel]",
  ghost: "text-[--color-muted] hover:text-[--color-text]",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  className,
  children,
  newTab,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link
          href={href}
          className={classes}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {children}
    </motion.button>
  );
}
