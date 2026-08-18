"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { TabUnderline } from "@/components/section/segmented";

export default function NotesPage() {
  const [tab, setTab] = useState("Идеи");

  return (
    <SectionPage n="03" title="Notes">
      <TabUnderline options={["Идеи", "Дневник"]} value={tab} onChange={setTab} />

      {tab === "Идеи" ? <IdeasTab /> : <DiaryTab />}
    </SectionPage>
  );
}

function IdeasTab() {
  return (
    <>
      <div className="glass rounded-[var(--radius-lg)] flex items-center gap-2 px-4 h-12">
        <input
          type="text"
          placeholder="Мысль, заметка, идея…  #тег"
          className="flex-1 bg-transparent text-[14px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-hint)] focus:outline-none"
        />
        <button aria-label="Найти" className="text-[var(--color-fg-muted)]">🔍</button>
        <button aria-label="Голос" className="text-[var(--color-fg-muted)]">🎤</button>
      </div>

      <div className="mt-8">
        <SectionWatermark text="INBOX" />
        <p className="mt-3 max-w-[280px] text-[14px] text-[var(--color-fg-muted)]">
          Напишите мысль выше — она сохранится мгновенно. Потом одним тапом
          превратите в задачу, встречу или запись.
        </p>
      </div>
    </>
  );
}

function DiaryTab() {
  return (
    <>
      <div className="glass rounded-full flex items-center justify-between px-3 py-2">
        <button aria-label="Пред" className="px-2 text-[var(--color-fg-muted)]">◀</button>
        <span className="text-[14px] font-medium">Сегодня</span>
        <button aria-label="След" className="px-2 text-[var(--color-fg-muted)]">▶</button>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          Настроение
        </div>
        <div className="mt-2 flex gap-4 text-[22px]">
          <button aria-label="Плохо" className="opacity-70">☹</button>
          <button aria-label="Ок" className="opacity-70">😐</button>
          <button aria-label="Хорошо" className="opacity-90">🙂</button>
        </div>
      </div>

      <textarea
        rows={10}
        placeholder="За что благодарен сегодня?"
        className="glass rounded-[var(--radius-lg)] px-4 py-3 text-[14px] resize-none placeholder:text-[var(--color-fg-hint)] focus:outline-none"
      />

      <div className="mt-4">
        <SectionWatermark text="JOURNAL" />
      </div>
    </>
  );
}
