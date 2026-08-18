"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { Segmented } from "@/components/section/segmented";

/** Тренды — ref 21, 22. */
export default function TrendsPage() {
  return (
    <SectionPage n="00" title="Эта неделя">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Ритуалы" big="—" sub="за 7 дней" />
        <StatCard label="Вода" big="750" sub="мл в день" />
        <StatCard label="Задачи" big="0" sub="сделано" />
        <StatCard label="Настроение" big="—" sub="в среднем" />
      </div>

      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] mt-2">
        Детали
      </div>

      <DetailCard n="01" title="Ритуалы — 12 недель">
        <p className="text-[13px] text-[var(--color-fg-muted)]">Пока нет данных</p>
      </DetailCard>

      <ChartCard n="02" title="Вода" chart="water" avg="в среднем 750 мл/день" />
      <ChartCard n="03" title="Калории" chart="kcal" avg="в среднем 211 ккал/день" />

      <DetailCard n="04" title="Задачи — 4 недели">
        <p className="text-[13px] text-[var(--color-fg-muted)]">Пока нет данных</p>
      </DetailCard>
      <DetailCard n="05" title="Настроение — 14 дней">
        <p className="text-[13px] text-[var(--color-fg-muted)]">Пока нет данных</p>
      </DetailCard>

      <div className="mt-4">
        <SectionWatermark text="TRENDS" />
      </div>
    </SectionPage>
  );
}

function StatCard({ label, big, sub }: { label: string; big: string; sub: string }) {
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4 min-h-[100px] flex flex-col justify-between">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">{label}</div>
      <div>
        <div className="text-[26px] font-semibold leading-none">{big}</div>
        <div className="mt-1 text-[11px] text-[var(--color-fg-muted)]">{sub}</div>
      </div>
    </div>
  );
}

function DetailCard({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] mb-2">
        <span className="text-[var(--color-fg-faint)]">{n}</span> {title}
      </div>
      {children}
    </div>
  );
}

function ChartCard({ n, title, avg }: { n: string; title: string; chart: string; avg: string }) {
  const [range, setRange] = useState("14д");
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-fg-faint)]">{n}</span> {title}
        </div>
        <Segmented options={["7д", "14д", "30д"]} value={range} onChange={setRange} />
      </div>

      {/* Псевдо-линейный график — placeholder */}
      <svg viewBox="0 0 200 60" className="mt-4 w-full h-16">
        <polyline
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          points="0,55 30,55 60,54 90,54 120,53 150,45 170,15 185,55"
        />
        <line x1="0" y1="55" x2="200" y2="55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      </svg>

      <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--color-fg-muted)]">
        <span>6 авг</span><span>8 авг</span><span>10 авг</span><span>12 авг</span><span>15 авг</span><span>17 авг</span><span>19 авг</span>
      </div>

      <div className="mt-2 text-[12px] text-[var(--color-fg-muted)]">{avg}</div>
    </div>
  );
}
