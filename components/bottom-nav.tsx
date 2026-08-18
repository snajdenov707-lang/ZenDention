"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Захват" },
  { href: "/today", label: "Сегодня" },
  { href: "/ask", label: "Спросить" },
  { href: "/me", label: "Я" },
] as const;

/**
 * Плавающая стеклянная панель внизу.
 * Не приклеена к краю экрана — отступ + safe area, как у нативных iOS-панелей.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Основная навигация"
      className={cn(
        "fixed inset-x-0 z-40 px-4",
        "bottom-[max(0.75rem,var(--sab))]",
      )}
    >
      <ul
        className={cn(
          "glass-strong mx-auto flex max-w-md items-stretch",
          "rounded-[var(--radius-lg)]",
        )}
      >
        {tabs.map((t) => {
          const active =
            t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={cn(
                  "flex h-14 items-center justify-center text-[13px]",
                  "rounded-[var(--radius-lg)]",
                  active ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]",
                )}
              >
                <span className="font-medium">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
