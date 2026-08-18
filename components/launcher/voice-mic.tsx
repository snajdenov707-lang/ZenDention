"use client";

import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Круглая кнопка голосового ввода — центр лаунчера.
 * В этой итерации записи ещё нет: тап показывает шит-заглушку.
 * Реальный record→transcribe→ingest подключим отдельной итерацией.
 */
export function VoiceMic({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Голосовой захват"
        onClick={() => setOpen(true)}
        className={cn(
          "glass-strong tilt-shine",
          "flex h-[64px] w-[64px] items-center justify-center rounded-full",
          "active:scale-95 transition-transform",
          className,
        )}
      >
        <ApertureIcon />
      </button>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="py-4 text-center">
          <div className="text-[18px] font-semibold">Голос — скоро</div>
          <p className="mt-2 text-[13px] text-[var(--color-fg-muted)]">
            Здесь появится запись голоса.
            Нейронка сама разложит по разделам.
          </p>
        </div>
      </Sheet>
    </>
  );
}

/** Иконка «диафрагма» — как в ref 15. Абстрактная, не микрофон. */
function ApertureIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.31 8 20.05 17.94" />
      <path d="M9.69 8h11.48" />
      <path d="M7.38 12l5.74-9.94" />
      <path d="M9.69 16 3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="M16.62 12l-5.74 9.94" />
    </svg>
  );
}
