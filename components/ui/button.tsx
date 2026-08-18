"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center font-medium select-none " +
  "transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 " +
  "disabled:opacity-40 disabled:pointer-events-none";

/**
 * primary — плотное стекло, читается как основной CTA.
 * ghost   — тонкое стекло, для второстепенных действий.
 */
const variants: Record<Variant, string> = {
  primary: "glass-strong glass-hover text-[var(--color-fg)] rounded-[var(--radius-md)]",
  ghost: "glass glass-hover text-[var(--color-fg)] rounded-[var(--radius-md)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4 text-[15px]",
  sm: "h-9 px-3 text-[14px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
