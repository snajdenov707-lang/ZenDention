"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { Segmented } from "@/components/section/segmented";
import { formatMoney } from "@/lib/date";
import { cn } from "@/lib/utils";

/** Money — ref 18-20. Расход/Доход + категории + график + список + разбивка. */
export default function MoneyPage() {
  const [type, setType] = useState("Расход");

  return (
    <SectionPage
      n="04"
      title="Money"
      headerRight={<button aria-label="Настройки" className="text-[var(--color-fg-muted)]">⚙</button>}
    >
      <FreePlaque />

      <Segmented options={["Расход", "Доход"]} value={type} onChange={setType} />

      <AmountRow />

      <CategoryPills />

      <input
        type="text"
        placeholder="Заметка"
        className="glass rounded-[var(--radius-md)] px-3 h-11 text-[14px] placeholder:text-[var(--color-fg-hint)] focus:outline-none"
      />

      <button className="glass-strong glass-hover h-12 rounded-[var(--radius-md)] text-[14px] font-medium">
        + Добавить {type.toLowerCase()}
      </button>

      <WeekChart />

      <button className="glass tilt-shine glass-hover h-12 rounded-[var(--radius-md)] px-4 flex items-center gap-2 text-[13px]">
        <span aria-hidden>🎯</span>
        <span>Поставить цель накопления</span>
        <span aria-hidden className="ml-auto">→</span>
      </button>

      <OperationList />
      <CategorySummary />

      <div className="mt-4">
        <SectionWatermark text="MONEY" />
      </div>
    </SectionPage>
  );
}

function FreePlaque() {
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
        Свободно
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[32px] font-semibold leading-none">1 000</span>
        <span className="text-[16px] text-[var(--color-fg-muted)]">$</span>
      </div>
      <div className="mt-1 text-[13px] text-[var(--color-fg-muted)]">
        можно 77 $ в день
      </div>
    </div>
  );
}

function AmountRow() {
  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        defaultValue="0"
        className="flex-1 bg-transparent text-[32px] font-medium focus:outline-none"
      />
      <span className="text-[20px] text-[var(--color-fg-muted)]">$</span>
      <button className="glass h-10 w-10 rounded-full flex items-center justify-center text-[var(--color-fg-muted)]">
        🎤
      </button>
    </div>
  );
}

function CategoryPills() {
  const cats = [
    { icon: "🍽", name: "Еда", active: true },
    { icon: "🚗", name: "Транспорт" },
    { icon: "🏠", name: "Дом" },
    { icon: "🎉", name: "Развлечения" },
  ];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3">
      {cats.map((c) => (
        <button
          key={c.name}
          className={cn(
            "glass glass-hover h-9 shrink-0 rounded-full px-3 text-[12px] font-medium",
            "flex items-center gap-1.5",
            c.active && "glass-active",
          )}
        >
          <span aria-hidden>{c.icon}</span>
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  );
}

function WeekChart() {
  const days = [
    { d: "Чт", v: 0 },
    { d: "Пт", v: 0 },
    { d: "Сб", v: 0 },
    { d: "Вс", v: 0 },
    { d: "Пн", v: 0 },
    { d: "Вт", v: 0.55 },
    { d: "Ср", v: 1, current: true },
  ];
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
            Расходы за 7 дней
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[26px] font-semibold leading-none">
              {formatMoney(477613)}
            </span>
            <span className="text-[14px] text-[var(--color-fg-muted)]">$</span>
          </div>
          <div className="text-[12px] text-[var(--color-fg-muted)]">
            {formatMoney(68230)} $/день
          </div>
        </div>
        <button aria-label="Развернуть" className="glass h-8 w-8 rounded-full flex items-center justify-center text-[var(--color-fg-muted)]">▾</button>
      </div>

      <div className="mt-4 grid grid-cols-7 items-end gap-2 h-24">
        {days.map((d) => (
          <div key={d.d} className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-full rounded-sm",
                d.current ? "bg-white" : "bg-white/30",
              )}
              style={{ height: `${Math.max(4, d.v * 100)}%` }}
            />
            <span
              className={cn(
                "text-[10px]",
                d.current ? "font-medium" : "text-[var(--color-fg-muted)]",
              )}
            >
              {d.d}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationList() {
  const ops = [
    { icon: "🏠", cat: "Дом", date: "19 авг", v: -306613 },
    { icon: "🎉", cat: "Развлечения", date: "18 авг", v: -25047 },
    { icon: "🏠", cat: "Дом", date: "18 авг", v: -80000 },
    { icon: "🚗", cat: "Транспорт", date: "18 авг", v: -42411 },
    { icon: "🍽", cat: "Еда", date: "18 авг", v: -23542 },
    { icon: "💼", cat: "Зарплата", date: "18 авг", v: 478613 },
  ];
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] mb-2">
        Операции периода <span className="text-[var(--color-fg-faint)]">{ops.length}</span>
      </div>
      <ul className="divide-y divide-white/8">
        {ops.map((o, i) => (
          <li key={i} className="flex items-center gap-3 py-2.5">
            <span aria-hidden className="text-[16px]">{o.icon}</span>
            <div className="flex-1">
              <div className="text-[14px]">{o.cat}</div>
              <div className="text-[11px] text-[var(--color-fg-muted)]">{o.date}</div>
            </div>
            <div
              className={cn(
                "text-[15px] font-medium",
                o.v > 0 ? "text-emerald-300" : "text-[var(--color-fg)]",
              )}
            >
              {o.v > 0 ? "+" : ""}{formatMoney(o.v)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategorySummary() {
  const cats = [
    { icon: "🏠", name: "Дом", v: 386613, pct: 0.85 },
    { icon: "🚗", name: "Транспорт", v: 42411, pct: 0.15 },
    { icon: "🎉", name: "Развлечения", v: 25047, pct: 0.10 },
    { icon: "🍽", name: "Еда", v: 23542, pct: 0.09 },
  ];
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          По категориям
        </div>
        <div className="text-[11px] text-[var(--color-fg-muted)]">сбережения 0%</div>
      </div>
      <ul className="space-y-3">
        {cats.map((c) => (
          <li key={c.name}>
            <div className="flex items-baseline justify-between text-[14px]">
              <span className="flex items-center gap-2">
                <span aria-hidden>{c.icon}</span>
                <span>{c.name}</span>
              </span>
              <span className="font-medium">{formatMoney(c.v)} $</span>
            </div>
            <div className="mt-1 h-[3px] w-full bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-white/70" style={{ width: `${c.pct * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
