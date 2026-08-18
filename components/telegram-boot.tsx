"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getInitData, getWebApp } from "@/lib/telegram";
import { getSupabase } from "@/lib/supabase-browser";
import { PUBLIC_ENV } from "@/lib/env";

type BootState = "loading" | "outside" | "ready" | "failed";

interface Props {
  fallback: ReactNode; // экран "открой из мессенджера"
  failure: ReactNode; // спокойная ошибка авторизации
  children: ReactNode;
}

/**
 * Невидимый вход. При маунте:
 *   1. Ждём Telegram.WebApp (скрипт загружается в layout).
 *   2. Берём initData, отправляем в edge tg-auth.
 *   3. Получаем { access_token, refresh_token } — ставим в Supabase.
 *   4. Отдаём children.
 *
 * Если сессия уже валидна — пропускаем шаги 2-3 (после перезапуска мини-аппы).
 */
export function TelegramBoot({ fallback, failure, children }: Props) {
  const [state, setState] = useState<BootState>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Даём time.js Telegram-скрипту инициализироваться (он ставит window.Telegram синхронно, но перестрахуемся)
      await new Promise((r) => setTimeout(r, 0));

      // Dev-режим: ?dev=1 в URL — пропускаем проверку initData и рендерим UI.
      // Безопасно: сессии нет, Supabase-запросы без токена отсекаются RLS.
      // Нужно для визуального тестирования вне Telegram (свой браузер).
      if (typeof window !== "undefined" && window.location.search.includes("dev=1")) {
        if (!cancelled) setState("ready");
        return;
      }

      const supabase = getSupabase();

      // Быстрый путь: уже есть валидная сессия
      const { data: existing } = await supabase.auth.getSession();
      if (existing.session) {
        if (!cancelled) setState("ready");
        return;
      }

      const initData = getInitData();
      if (!initData) {
        if (!cancelled) setState("outside");
        return;
      }

      // Сообщаем телеге что мы готовы отрисоваться в полный рост
      getWebApp()?.ready();
      getWebApp()?.expand();

      try {
        const resp = await fetch(`${PUBLIC_ENV.supabaseUrl}/functions/v1/tg-auth`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // publishable key нужен чтобы дойти до функции; проверка initData внутри
            apikey: PUBLIC_ENV.supabasePublishableKey,
          },
          body: JSON.stringify({ initData }),
        });

        if (!resp.ok) throw new Error(`tg-auth ${resp.status}`);
        const { access_token, refresh_token } = (await resp.json()) as {
          access_token: string;
          refresh_token: string;
        };

        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) throw error;

        if (!cancelled) setState("ready");
      } catch {
        if (!cancelled) setState("failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "loading") return null; // ничего не мигаем — тон спокойный
  if (state === "outside") return <>{fallback}</>;
  if (state === "failed") return <>{failure}</>;
  return <>{children}</>;
}
