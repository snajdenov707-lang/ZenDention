import { WidgetTile } from "./widget-tile";

/**
 * Плитка Food по ref 02: калории + прогресс + вода в одной ячейке.
 * Значения — заглушки; реальные придут из captures в следующих итерациях.
 */
export function FoodTile() {
  const kcalNow = 100;
  const kcalGoal = 2967;
  const waterNow = 750;
  const waterGoal = 2500;
  const kcalPct = Math.min(100, Math.round((kcalNow / kcalGoal) * 100));

  return (
    <WidgetTile href="/section/food" label="FOOD">
      <div className="flex items-baseline gap-1">
        <span className="text-[26px] font-semibold leading-none">{kcalNow}</span>
        <span className="text-[12px] text-[var(--color-fg-muted)]">/{kcalGoal} ккал</span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-white/70"
          style={{ width: `${kcalPct}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-2 text-[11px] text-[var(--color-fg-muted)]">
        {waterNow} / {waterGoal} мл
      </div>
    </WidgetTile>
  );
}
