import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Мини-плитка под Money-плашкой: Тренды / Q-Cold Agent (ref 01, 02).
 * Просто: маленький аплайн-лейбл + короткий подзаголовок.
 */
export function MiniTile({
  href,
  label,
  hint,
  icon,
  className,
}: {
  href: string;
  label: string;
  hint: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "flex flex-col justify-between px-4 py-3 min-h-[74px]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-[13px] text-[var(--color-fg)]">{hint}</div>
    </Link>
  );
}
