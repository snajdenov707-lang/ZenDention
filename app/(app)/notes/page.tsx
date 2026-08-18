"use client";

import { useEffect, useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { TabUnderline } from "@/components/section/segmented";
import { listIdeas, addIdea, deleteIdea, type Idea } from "@/lib/data/ideas";

export default function NotesPage() {
  const [tab, setTab] = useState("Идеи");

  return (
    <SectionPage n="03" title="Notes">
      <TabUnderline options={["Идеи", "Дневник"]} value={tab} onChange={setTab} />
      {tab === "Идеи" ? <IdeasTab /> : <DiaryTab />}
    </SectionPage>
  );
}

/* ============================ Идеи ============================ */

function IdeasTab() {
  const [text, setText] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingErr, setSavingErr] = useState<string | null>(null);

  useEffect(() => {
    listIdeas()
      .then(setIdeas)
      .catch((e) => setSavingErr(dev(e)))
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    const val = text.trim();
    if (!val) return;
    setText("");

    // оптимистично добавляем во главу списка
    const tempId = `temp-${Date.now()}`;
    const optimistic: Idea = { id: tempId, content: val, created_at: new Date().toISOString() };
    setIdeas((xs) => [optimistic, ...xs]);

    try {
      const real = await addIdea(val);
      setIdeas((xs) => xs.map((x) => (x.id === tempId ? real : x)));
      setSavingErr(null);
    } catch (e) {
      // откатываем
      setIdeas((xs) => xs.filter((x) => x.id !== tempId));
      setSavingErr(dev(e));
    }
  };

  const remove = async (id: string) => {
    const prev = ideas;
    setIdeas((xs) => xs.filter((x) => x.id !== id));
    try {
      await deleteIdea(id);
    } catch (e) {
      setIdeas(prev);
      setSavingErr(dev(e));
    }
  };

  return (
    <>
      <div className="glass rounded-[var(--radius-lg)] flex items-center gap-2 px-4 h-12">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Мысль, заметка, идея…  #тег"
          className="flex-1 bg-transparent text-[14px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-hint)] focus:outline-none"
        />
        {text.trim() ? (
          <button
            onClick={submit}
            className="text-[13px] font-medium text-[var(--color-fg)]"
          >
            Добавить
          </button>
        ) : (
          <>
            <button aria-label="Найти" className="text-[var(--color-fg-muted)]">🔍</button>
            <button aria-label="Голос" className="text-[var(--color-fg-muted)]">🎤</button>
          </>
        )}
      </div>

      {savingErr && (
        <p className="text-[12px] text-[var(--color-fg-muted)] mt-2">{savingErr}</p>
      )}

      {loading ? null : ideas.length === 0 ? (
        <div className="mt-8">
          <SectionWatermark text="INBOX" />
          <p className="mt-3 max-w-[280px] text-[14px] text-[var(--color-fg-muted)]">
            Напишите мысль выше — она сохранится мгновенно. Потом одним тапом
            превратите в задачу, встречу или запись.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2 mt-2">
          {ideas.map((it) => (
            <li
              key={it.id}
              className="glass tilt-shine rounded-[var(--radius-md)] px-4 h-11 flex items-center justify-between"
            >
              <span className="truncate text-[14px]">{it.content}</span>
              <button
                aria-label="Удалить"
                onClick={() => remove(it.id)}
                className="text-[var(--color-fg-faint)]"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ============================ Дневник (заглушка) ============================ */

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

      <p className="text-[11px] text-[var(--color-fg-muted)]">
        Автосохранение дневника подключу в следующей итерации.
      </p>

      <div className="mt-4">
        <SectionWatermark text="JOURNAL" />
      </div>
    </>
  );
}

/** Дружелюбное сообщение об ошибке — в dev-режиме без сессии выдаём подсказку. */
function dev(e: unknown): string {
  const msg = String((e as Error)?.message ?? e ?? "");
  if (/no session|jwt|permission|policy/i.test(msg)) {
    return "Открой мини-аппу из Telegram — там сохранение работает. В dev-браузере сессии нет.";
  }
  return `Не удалось сохранить: ${msg}`;
}
