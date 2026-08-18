import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { cn } from "@/lib/utils";

const GROUPS = [
  { name: "Тело",     items: ["Бег", "Тренировка", "Йога", "Прогулка"] },
  { name: "Ум",       items: ["Медитация", "Чтение", "Дневник", "Учёба"] },
  { name: "Здоровье", items: ["Витамины", "Вода", "Контрастный душ", "Сон до 23:00"] },
  { name: "Привычки", items: ["Планирование дня", "Без телефона", "Благодарность"] },
];

export default function RitualsPage() {
  return (
    <SectionPage n="07" title="Rituals">
      <SectionWatermark text="RITUALS" />
      <p className="text-[14px] text-[var(--color-fg-muted)]">
        Выберите из шаблонов или добавьте свой ритуал.
      </p>

      <div className="flex flex-col gap-4 mt-2">
        {GROUPS.map((g) => (
          <div key={g.name}>
            <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
              {g.name}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <button
                  key={it}
                  className={cn(
                    "glass glass-hover h-9 rounded-full px-4 text-[13px] font-medium",
                  )}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="glass tilt-shine glass-hover h-12 rounded-[var(--radius-md)] text-[14px] font-medium mt-2">
        + Свой ритуал
      </button>
    </SectionPage>
  );
}
