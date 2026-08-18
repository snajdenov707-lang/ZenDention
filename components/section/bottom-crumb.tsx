"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Нижняя плавающая крошка внутри раздела:
 *   [ ← Дайджест      ]                 [ n Section ]
 * Показывается вместо лаунчера.
 *
 * `fab` — опциональная плавающая круглая кнопка (белая "+"), появляется ВЫШЕ section-pill.
 */
export function BottomCrumb({
  n,
  tag,
  fab,
}: {
  n?: string;
  tag: string;
  fab?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 px-3",
        "bottom-[max(0.75rem,var(--sab))]",
      )}
    >
      <div className="relative mx-auto flex max-w-md items-center gap-2">
        {/* «← Дайджест» — широкая стеклянная плашка */}
        <Link
          href="/"
          className={cn(
            "glass tilt-shine glass-hover",
            "flex-1 flex items-center gap-2",
            "h-14 rounded-[var(--radius-md)] px-4",
            "text-[14px] font-medium",
          )}
        >
          <span aria-hidden>←</span>
          <span>Дайджест</span>
        </Link>

        {/* Активная плашка раздела справа — квадратная */}
        <div
          className={cn(
            "glass-active tilt-shine",
            "flex h-14 w-[72px] flex-col items-start justify-between",
            "rounded-[var(--radius-md)] px-3 py-2",
          )}
        >
          {n && (
            <span className="text-[9px] tracking-wider text-[var(--color-fg-muted)]">
              {n}
            </span>
          )}
          <span className="text-[12px] font-medium leading-none text-[var(--color-fg)]">
            {tag}
          </span>
        </div>

        {/* FAB (если нужен) — над section-pill */}
        {fab && (
          <div className="absolute right-2 -top-16">
            {fab}
          </div>
        )}
      </div>
    </div>
  );
}
