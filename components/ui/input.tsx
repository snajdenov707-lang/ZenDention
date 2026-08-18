import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "glass h-11 w-full rounded-[var(--radius-md)] px-3 text-[15px]",
        "text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)]",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
