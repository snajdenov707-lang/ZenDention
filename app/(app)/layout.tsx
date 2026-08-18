import type { ReactNode } from "react";
import { TelegramBoot } from "@/components/telegram-boot";
import { AppShell } from "@/components/app-shell";

/**
 * Все авторизованные экраны живут под этим layout.
 * Роут-группа (app) не влияет на URL.
 */
export default function AuthedLayout({ children }: { children: ReactNode }) {
  return (
    <TelegramBoot
      fallback={<OutsideTelegram />}
      failure={<AuthFailed />}
    >
      <AppShell>{children}</AppShell>
    </TelegramBoot>
  );
}

function OutsideTelegram() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-[15px] text-[var(--color-fg)]">
        Открой это приложение из Telegram.
      </p>
      <p className="mt-2 text-[13px] text-[var(--color-fg-muted)]">
        Отдельного входа нет.
      </p>
    </div>
  );
}

function AuthFailed() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="text-[15px] text-[var(--color-fg)]">Не удалось войти.</p>
      <p className="mt-2 text-[13px] text-[var(--color-fg-muted)]">
        Перезапусти приложение из Telegram.
      </p>
    </div>
  );
}
