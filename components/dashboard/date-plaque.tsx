"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

/**
 * Верхняя плашка: день недели, число + месяц, приветствие.
 * Обновляется если приложение висит открытым при пересечении часа/дня.
 */
export function DatePlaque({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // рисуем только после mount, чтобы не было hydration-разночтения серверного времени
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const d = now ? formatDate(now) : null;

  return (
    <div
      className={cn(
        "glass tilt-shine rounded-[var(--radius-lg)] px-5 py-4",
        "min-h-[104px]",
        className,
      )}
    >
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-fg-muted)]">
        {d ? capitalize(d.weekday) : " "}
      </div>
      <div className="mt-1 text-[32px] font-semibold leading-none tracking-tight">
        {d ? d.dayMonth : " "}
      </div>
      <div className="mt-2 text-[14px] text-[var(--color-fg-muted)]">
        {d ? d.greeting : " "}
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
