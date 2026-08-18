"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { VoiceMic } from "./voice-mic";

/**
 * Фиксированный низ по ref 15: 8 плиток (4×2) + голосовой мик в центре.
 *
 * ВАЖНО: никакого внешнего «конверта» вокруг сетки — каждая плитка
 * = самостоятельная стеклянная кнопка (визуально как виджеты сверху).
 * Мик — абсолютно позиционированный круг поверх центра сетки.
 */

interface LauncherTile {
  n: string;
  label: string;
  href: string;
}

const tiles: LauncherTile[] = [
  { n: "01", label: "Digest", href: "/" },
  { n: "02", label: "Tasks", href: "/section/tasks" },
  { n: "03", label: "Notes", href: "/section/notes" },
  { n: "04", label: "Money", href: "/section/money" },
  { n: "05", label: "Meetings", href: "/section/meetings" },
  { n: "06", label: "Food", href: "/section/food" },
  { n: "07", label: "Rituals", href: "/section/rituals" },
  { n: "08", label: "Settings", href: "/section/settings" },
];

export function LauncherBar() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 px-3",
        "bottom-[max(0.75rem,var(--sab))]",
      )}
    >
      <div className="relative mx-auto max-w-md">
        <div className="grid grid-cols-4 gap-2">
          {tiles.map((t) => {
            const active =
              t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
            return (
              <Link
                key={t.n}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "glass tilt-shine glass-hover",
                  "rounded-[var(--radius-md)]",
                  "flex min-h-[58px] flex-col items-start justify-between",
                  "px-2.5 py-2",
                  active && "glass-active",
                )}
              >
                <span
                  className={cn(
                    "text-[9px] tracking-wider",
                    active
                      ? "text-[var(--color-fg-muted)]"
                      : "text-[var(--color-fg-faint)]",
                  )}
                >
                  {t.n}
                </span>
                <span
                  className={cn(
                    "text-[12px] font-medium leading-none",
                    active
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)]",
                  )}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Голосовой мик — плавает поверх центра сетки */}
        <VoiceMic className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
