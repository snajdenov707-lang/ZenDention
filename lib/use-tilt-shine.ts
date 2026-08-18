"use client";

import { useEffect } from "react";

/**
 * Крутит --shine-angle на :root в зависимости от наклона устройства.
 * Компоненты с классом .tilt-shine ловят это автоматически (см. globals.css).
 *
 * Деградация:
 *   - iOS 13+ Safari требует явный запрос permission (жестом).
 *     Пытаемся один раз на первом тапе; если отказали — молча, статичный highlight.
 *   - Android/desktop — навешиваемся сразу.
 *   - Устройства без датчика (ноут) — блик остаётся в стартовой позиции.
 *
 * Хук ставить один раз на верхнем уровне layout.
 */
export function useTiltShine() {
  useEffect(() => {
    let attached = false;

    const onOrient = (e: DeviceOrientationEvent) => {
      // gamma: -90..90 (лево-право), beta: -180..180 (вверх-вниз)
      const g = e.gamma ?? 0;
      const b = e.beta ?? 0;
      // Переводим наклон в градусы блика 0..360.
      // Формула эмпирическая: угол = atan2(gamma, beta) + смещение.
      const angle = (Math.atan2(g, b) * 180) / Math.PI + 180;
      document.documentElement.style.setProperty("--shine-angle", `${angle.toFixed(1)}deg`);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("deviceorientation", onOrient, true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyEvt = DeviceOrientationEvent as any;
    if (typeof anyEvt?.requestPermission === "function") {
      // iOS: ждём первый тап, спрашиваем разрешение
      const askOnce = async () => {
        try {
          const state = await anyEvt.requestPermission();
          if (state === "granted") attach();
        } catch {
          /* пользователь отказал — оставляем статичный блик */
        } finally {
          window.removeEventListener("touchend", askOnce);
          window.removeEventListener("click", askOnce);
        }
      };
      window.addEventListener("touchend", askOnce, { once: true });
      window.addEventListener("click", askOnce, { once: true });
    } else if ("DeviceOrientationEvent" in window) {
      attach();
    }

    return () => {
      if (attached) window.removeEventListener("deviceorientation", onOrient, true);
    };
  }, []);
}
