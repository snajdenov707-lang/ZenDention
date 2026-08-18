/**
 * Тонкая обёртка над Telegram WebApp SDK.
 * Никаких проверок пользователя тут — только чтение initData и хук готовности.
 * Проверка подписи всегда на сервере (edge tg-auth).
 */

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: { id: number; first_name?: string; username?: string };
  };
  ready: () => void;
  expand: () => void;
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function getWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return window.Telegram?.WebApp ?? null;
}

/**
 * initData — строка формата key=value&…&hash=…&auth_date=…
 * Клиент никогда не парсит и не доверяет — просто передаёт как есть.
 * Пустая строка = мы открыты вне телеги.
 */
export function getInitData(): string {
  return getWebApp()?.initData ?? "";
}
