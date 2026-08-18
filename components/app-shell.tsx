"use client";

import type { ReactNode } from "react";
import { LauncherBar } from "./launcher/launcher-bar";
import { useTiltShine } from "@/lib/use-tilt-shine";

/**
 * Оболочка авторизованной зоны.
 * useTiltShine — глобальный слушатель наклона; крутит --shine-angle,
 * блики на любых .tilt-shine автоматически двигаются.
 */
export function AppShell({ children }: { children: ReactNode }) {
  useTiltShine();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      {/*
        pb здесь = высота лаунчера + запас на мик, торчащий сверху,
        + safe-area снизу. Иначе последняя плашка (Pro) прячется за лаунчер.
      */}
      <main
        className="flex-1 px-3 pt-[max(0.75rem,var(--sat))] pb-[calc(11rem+var(--sab))]"
      >
        {children}
      </main>
      <LauncherBar />
    </div>
  );
}
