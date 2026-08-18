import { DatePlaque } from "@/components/dashboard/date-plaque";
import { DigestNotif } from "@/components/dashboard/digest-notif";
import { WidgetTile, TileEmpty, TileCount } from "@/components/dashboard/widget-tile";
import { FoodTile } from "@/components/dashboard/food-tile";
import { MoneyPlaque } from "@/components/dashboard/money-plaque";
import { MiniTile } from "@/components/dashboard/mini-tile";
import { ProPlaque } from "@/components/dashboard/pro-plaque";

/**
 * Главный (Digest). Композиция по ref 01, 02.
 * Все числа — заглушки под референс.
 */
export default function DigestPage() {
  return (
    <div className="flex flex-col gap-3">
      <DatePlaque />
      <DigestNotif />

      <div className="grid grid-cols-2 gap-3">
        <WidgetTile href="/tasks" label="TASKS">
          <TileEmpty hint="добавить первую задачу" />
        </WidgetTile>

        <WidgetTile href="/notes" label="NOTES">
          <TileCount count={1} sub="идеи · дневник" />
        </WidgetTile>

        <WidgetTile href="/meetings" label="MEETINGS">
          <TileCount count={1} sub="вс 3.04 · 06:07" />
        </WidgetTile>

        <FoodTile />
      </div>

      <MoneyPlaque />

      <div className="grid grid-cols-2 gap-3">
        <MiniTile
          href="/trends"
          label="Тренды"
          hint="твоя статистика"
        />
        <MiniTile
          href="/q-cold"
          label="✦ Q-Cold Agent"
          hint="спроси свою жизнь"
        />
      </div>

      <ProPlaque />
    </div>
  );
}
