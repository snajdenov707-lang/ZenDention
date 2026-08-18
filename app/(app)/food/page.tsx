"use client";

import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { cn } from "@/lib/utils";

/**
 * Food. Вода-плашка сверху, дальше калории + список + CTA.
 * Все числа хардкод под ref 15-17.
 */
export default function FoodPage() {
  return (
    <SectionPage n="06" title="Food">
      <WaterCard />

      <KcalHeader />

      <div className="border-t border-white/8" />

      <MealRow name="борщ" kcal={100} />
      <MealRow name="1" kcal={111} />

      <button
        type="button"
        className="mt-2 h-12 rounded-[var(--radius-md)] bg-[var(--btn-solid-bg)] text-[var(--btn-solid-fg)] text-[14px] font-medium"
      >
        📷&nbsp;&nbsp;Сфотографировать еду
      </button>

      <button
        type="button"
        className={cn(
          "h-11 rounded-[var(--radius-md)] text-[13px] text-[var(--color-fg-muted)]",
          "border border-dashed border-white/22",
        )}
      >
        + Добавить вручную
      </button>

      <div className="mt-4">
        <SectionWatermark text="FOOD" />
      </div>
    </SectionPage>
  );
}

function WaterCard() {
  const now = 750;
  const goal = 2500;
  const pct = Math.min(100, (now / goal) * 100);
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4 flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-fg-faint)]">05</span> Вода
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-semibold leading-none">{now}</span>
          <span className="text-[13px] text-[var(--color-fg-muted)]">мл</span>
        </div>
      </div>

      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-white/85" style={{ width: `${pct}%` }} />
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr_36px] gap-2">
        {[250, 500, 1000].map((v) => (
          <button
            key={v}
            className="glass glass-hover h-9 rounded-[var(--radius-sm)] text-[13px] font-medium"
          >
            +{v}
          </button>
        ))}
        <button
          aria-label="Отменить последнее"
          className="glass glass-hover h-9 rounded-[var(--radius-sm)] text-[16px] text-[var(--color-fg-muted)]"
        >
          ↩
        </button>
      </div>

      <div className="text-[11px] text-[var(--color-fg-muted)]">
        Цель: {goal} мл ✎
      </div>
    </div>
  );
}

function KcalHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[32px] font-semibold leading-none">100</span>
          <span className="text-[13px] text-[var(--color-fg-muted)]">
            /2967 ккал сегодня
          </span>
        </div>
        <div className="mt-1 text-[12px] text-[var(--color-fg-muted)]">
          Цель «набор мышц»: Б 126 · Ж 63 · У 474 г
        </div>
      </div>

      <div className="relative h-14 w-14">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="16" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
          <circle
            cx="18" cy="18" r="16"
            stroke="white" strokeWidth="2" fill="none"
            strokeDasharray="100.5" strokeDashoffset={100.5 * (1 - 0.03)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-medium">
          3%
        </div>
      </div>
    </div>
  );
}

function MealRow({ name, kcal }: { name: string; kcal: number }) {
  return (
    <div className="flex items-baseline justify-between py-1">
      <span className="text-[15px]">{name}</span>
      <div className="flex items-baseline gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-medium">{kcal}</span>
          <span className="text-[11px] text-[var(--color-fg-muted)]">ккал</span>
        </div>
        <button aria-label="Удалить" className="text-[var(--color-fg-faint)]">✕</button>
      </div>
    </div>
  );
}
