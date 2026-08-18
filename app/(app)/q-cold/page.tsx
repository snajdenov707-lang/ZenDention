import { SectionPage } from "@/components/section/section-page";

/** Q-Cold — ref 23. */
const HINTS = [
  "Что я ел вчера?",
  "Сколько раз я срывал дедлайн в этом месяце?",
  "О чём я думал на этой неделе в дневнике?",
  "Сколько встреч с Андреем было?",
];

export default function QColdPage() {
  return (
    <SectionPage
      n="00"
      title="Q-Cold"
      headerRight={
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          AI-помощник · спроси свою жизнь
        </span>
      }
    >
      <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
        <div className="flex items-center gap-2 text-[15px] font-semibold">
          <span aria-hidden>✦</span> Q-COLD
        </div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] mt-1">
          AI-помощник · спроси свою жизнь
        </div>
      </div>

      <p className="text-[14px] text-[var(--color-fg-muted)]">
        Отвечаю только по твоим записям — задачам, встречам, дневнику, еде.
        Без выдумок: если ответа нет в записях, честно скажу.
      </p>

      <div className="flex flex-col gap-2">
        {HINTS.map((h) => (
          <button
            key={h}
            className="glass glass-hover tilt-shine text-left rounded-full px-4 h-11 text-[13px]"
          >
            {h}
          </button>
        ))}
      </div>

      <div className="mt-4 glass rounded-full h-12 flex items-center gap-2 px-4">
        <span aria-hidden className="text-[var(--color-fg-muted)]">🔍</span>
        <input
          type="text"
          placeholder="Спроси что угодно про свою жизнь…"
          className="flex-1 bg-transparent text-[14px] placeholder:text-[var(--color-fg-hint)] focus:outline-none"
        />
        <button aria-label="Отправить" className="glass-strong h-8 w-8 rounded-full flex items-center justify-center">↑</button>
      </div>
    </SectionPage>
  );
}
