import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Карточка — стеклянный слой на любом фоне.
 * Никаких заливок кроме --glass-*.
 */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("glass rounded-[var(--radius-lg)] p-4", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";
