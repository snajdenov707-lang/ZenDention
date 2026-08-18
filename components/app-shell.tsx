import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

/**
 * Оболочка внутри авторизованной зоны.
 * Отступ снизу под фиксированный BottomNav + safe area.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <main
        className="flex-1 px-4 pt-[max(1rem,var(--sat))] pb-[calc(3.5rem+var(--sab)+1rem)]"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
