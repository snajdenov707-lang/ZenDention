import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string; // "TASKS", "NOTES", ...
  children: ReactNode; // содержимое плитки (плюсик или числа)
  className?: string;
}

/**
 * Плитка-виджет из ref 02. Верх — маленький аплайн, ниже — контент.
 * Пропорция плитки задаётся аспектом контейнера в родительской сетке.
 */
export function WidgetTile({ href, label, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "flex flex-col justify-between",
        "px-4 py-3 min-h-[112px]",
        className,
      )}
    >
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        {label}
      </div>
      <div className="flex-1 flex flex-col justify-end">{children}</div>
    </Link>
  );
}

/** Пустое состояние плитки: большой + и подпись. */
export function TileEmpty({ hint }: { hint: string }) {
  return (
    <>
      <div className="text-[28px] leading-none text-[var(--color-fg)]">+</div>
      <div className="mt-2 text-[12px] text-[var(--color-fg-muted)]">{hint}</div>
    </>
  );
}
