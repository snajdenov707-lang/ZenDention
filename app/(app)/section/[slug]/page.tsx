import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Заглушка внутренних экранов категорий.
 * Реальное содержимое (Tasks, Notes, Meetings, Food, Money, Rituals, Settings)
 * подключаем отдельными итерациями по макетам 03–14.
 */

const SECTIONS: Record<string, { number: string; title: string }> = {
  tasks: { number: "02", title: "Tasks" },
  notes: { number: "03", title: "Notes" },
  money: { number: "04", title: "Money" },
  meetings: { number: "05", title: "Meetings" },
  food: { number: "06", title: "Food" },
  rituals: { number: "07", title: "Rituals" },
  settings: { number: "08", title: "Settings" },
};

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((slug) => ({ slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = SECTIONS[slug];
  if (!section) notFound();

  return (
    <div className="pt-2">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-fg-muted)]">
        {section.number} {section.title}
      </div>

      <div className="mt-24 flex flex-col items-center text-center">
        <div className="text-[36px] font-semibold text-[var(--color-fg-dim)]">
          {section.title.toUpperCase()}©
        </div>
        <p className="mt-4 max-w-[260px] text-[14px] text-[var(--color-fg-muted)]">
          Раздел в работе. Появится в следующих итерациях.
        </p>
        <Link
          href="/"
          className="glass tilt-shine glass-hover mt-8 inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] px-4 text-[13px]"
        >
          ← Дайджест
        </Link>
      </div>
    </div>
  );
}
