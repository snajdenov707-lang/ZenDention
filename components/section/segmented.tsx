"use client";

import { cn } from "@/lib/utils";

/**
 * Пилл-сегмент. Использую для Активные/Готово, Расход/Доход, 7д/14д/30д.
 * Локальное состояние; в этой итерации без бизнес-логики — просто визуальный тумблер.
 */
export function Segmented({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-full glass p-1",
        className,
      )}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={cn(
              "h-8 rounded-full px-3 text-[12px] font-medium transition-colors",
              active
                ? "bg-white text-black"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Простой underlined-tab вариант (как «Активные / Готово» на Tasks). */
export function TabUnderline({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div role="tablist" className={cn("flex items-center gap-5", className)}>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={cn(
              "relative pb-1 text-[14px] transition-colors",
              active
                ? "font-medium text-[var(--color-fg)]"
                : "text-[var(--color-fg-muted)]",
            )}
          >
            {o}
            {active && (
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px bg-white"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
