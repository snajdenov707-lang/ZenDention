import { DatePlaque } from "@/components/dashboard/date-plaque";
import { WidgetTile, TileEmpty } from "@/components/dashboard/widget-tile";
import { FoodTile } from "@/components/dashboard/food-tile";
import { MoneyPlaque } from "@/components/dashboard/money-plaque";
import { ProPlaque } from "@/components/dashboard/pro-plaque";

/**
 * Главный экран (Digest).
 * Вертикальный стек: дата → 4 виджета → деньги → pro.
 * Всё содержимое — заглушки; данные подключим когда доедем до
 * capture-ingest в следующих итерациях.
 */
export default function DigestPage() {
  return (
    <div className="flex flex-col gap-3">
      <DatePlaque />

      {/* 4 виджета 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        <WidgetTile href="/section/tasks" label="TASKS">
          <TileEmpty hint="добавить первую задачу" />
        </WidgetTile>

        <WidgetTile href="/section/notes" label="NOTES">
          <TileEmpty hint="мысль или запись" />
        </WidgetTile>

        <WidgetTile href="/section/meetings" label="MEETINGS">
          <TileEmpty hint="запланировать встречу" />
        </WidgetTile>

        <FoodTile />
      </div>

      <MoneyPlaque />
      <ProPlaque />
    </div>
  );
}
