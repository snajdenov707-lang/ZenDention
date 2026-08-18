"use client";

import type { ReactNode } from "react";
import { BottomChrome } from "./bottom-chrome";
import { useTiltShine } from "@/lib/use-tilt-shine";

export function AppShell({ children }: { children: ReactNode }) {
  useTiltShine();

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <main className="flex-1 px-3 pt-[max(0.75rem,var(--sat))] pb-[calc(6.5rem+var(--sab))]">
        {children}
      </main>
      <BottomChrome />
    </div>
  );
}
