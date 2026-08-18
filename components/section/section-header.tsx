import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Верхний хедер экрана: "02 TASKS" (номер + аплайн-название) + опциональный слот справа.
 */
export function SectionHeader({
  n,
  title,
  right,
  className,
}: {
  n: string;
  title: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
        <span className="text-[var(--color-fg-faint)]">{n}</span>{" "}
        <span>{title}</span>
      </div>
      {right}
    </div>
  );
}
