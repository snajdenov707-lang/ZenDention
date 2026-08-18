import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import Link from "next/link";

/** Settings — ref 27, 28, 30, 29 (темы). */
const THEMES = [
  { id: "dark",    name: "Тёмная", swatch: "#0a0a0a" },
  { id: "light",   name: "Божественно белый", swatch: "#f5f5f2" },
  { id: "red",     name: "Дарк-ред", swatch: "#3a0e0e" },
  { id: "blue",    name: "Океанически голубой", swatch: "#0b2a44" },
  { id: "green",   name: "Природный зелёный", swatch: "#0f2a1c" },
];

export default function SettingsPage() {
  return (
    <SectionPage n="08" title="Settings">
      <ProfileBlock />

      <Block title="Кнопка действия (iPhone)">
        <p className="text-[13px] text-[var(--color-fg-muted)]">
          Надиктуй с кнопки действия — разберу на задачи/встречи/еду/идеи.
          Полный гайд по установке — команда <b>/actionbutton</b> боту.
        </p>
        <FieldCopy label="URL" value="https://dijuzcwjgtheqmfct..." />
        <FieldCopy label="TOKEN" value="d27c188c-4fb3-495e..." />
        <div className="flex gap-2">
          <button className="glass glass-hover flex-1 h-11 rounded-[var(--radius-md)] text-[13px]">
            Обновить токен
          </button>
          <button className="bg-[var(--btn-solid-bg)] text-[var(--btn-solid-fg)] flex-1 h-11 rounded-[var(--radius-md)] text-[13px] font-medium">
            Готовая команда →
          </button>
        </div>
      </Block>

      <Block title="Быстрая трата (двойной тап)">
        <p className="text-[13px] text-[var(--color-fg-muted)]">
          Двойной тап по задней крышке — запишет трату без открытия приложения.
          Полный гайд — команда <b>/backtap</b> боту.
        </p>
        <FieldCopy label="URL" value="https://dijuzcwjgthe..." />
        <FieldCopy label="TOKEN" value="d27c188c-4fb3-4..." />
        <button className="bg-[var(--btn-solid-bg)] text-[var(--btn-solid-fg)] h-11 rounded-[var(--radius-md)] text-[13px] font-medium">
          Готовая команда →
        </button>
      </Block>

      <Link
        href="/pro"
        className="glass tilt-shine glass-hover rounded-[var(--radius-md)] px-4 h-14 flex items-center gap-3"
      >
        <div className="glass-strong h-8 w-8 rounded-full flex items-center justify-center">✦</div>
        <div className="flex-1">
          <div className="text-[14px] font-medium">Перейти на Pro</div>
          <div className="text-[12px] text-[var(--color-fg-muted)]">без лимитов на AI</div>
        </div>
        <span aria-hidden>›</span>
      </Link>

      <Block title="Оформление и уведомления">
        <ThemeRow />
        <ToggleRow
          label="Брифинг и итоги недели"
          sub="утром в 8:00 · ретро по воскресеньям"
          on
        />
        <div className="flex items-center justify-between h-11">
          <span className="text-[14px]">Часовой пояс</span>
          <span className="text-[13px] text-[var(--color-fg-muted)]">Москва · UTC+3 ▾</span>
        </div>
        <div className="flex gap-2">
          <button className="glass glass-hover flex-1 h-11 rounded-[var(--radius-md)] text-[13px]">
            Брифинг сейчас
          </button>
          <button className="glass glass-hover flex-1 h-11 rounded-[var(--radius-md)] text-[13px]">
            Итоги сейчас
          </button>
        </div>
      </Block>

      <Block title="Данные">
        <Link
          href="/archive"
          className="flex items-center justify-between h-11 rounded-[var(--radius-md)]"
        >
          <span className="text-[14px]">Архив</span>
          <span aria-hidden>›</span>
        </Link>
        <p className="text-[12px] text-[var(--color-fg-muted)]">
          Данные привязаны к Telegram-аккаунту и хранятся в защищённой базе.
        </p>
      </Block>

      <Block title="Документы">
        {["Тарифы", "Пользовательское соглашение", "Политика конфиденциальности", "Поддержка"].map((it) => (
          <div key={it} className="flex items-center justify-between h-11">
            <span className="text-[14px]">{it}</span>
            <span aria-hidden>›</span>
          </div>
        ))}
      </Block>

      <div className="text-[11px] text-[var(--color-fg-muted)] text-center">
        Версия 0.1.0 · Telegram Mini App
      </div>

      <div className="mt-4">
        <SectionWatermark text="ZENDENTION" />
      </div>
    </SectionPage>
  );
}

function ProfileBlock() {
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-white/12" aria-hidden />
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium truncate">khrustiks</div>
          <div className="text-[11px] text-[var(--color-fg-muted)] truncate">
            @khrustiks42 · с нами с август 2026 г.
          </div>
        </div>
      </div>
      <button className="glass glass-hover h-11 rounded-[var(--radius-md)] px-3 text-[13px] flex items-center justify-between">
        <span>Пол, вес, цель, норма КБЖУ</span>
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4 flex flex-col gap-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        {title}
      </div>
      {children}
    </div>
  );
}

function FieldCopy({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-[var(--radius-sm)] flex items-center h-11 px-3 gap-3">
      <span className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)] w-14">
        {label}
      </span>
      <span className="flex-1 truncate text-[12px] text-[var(--color-fg-muted)] font-mono">
        {value}
      </span>
      <button className="text-[11px] text-[var(--color-fg-muted)]">копировать</button>
    </div>
  );
}

function ToggleRow({ label, sub, on }: { label: string; sub?: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between h-14">
      <div>
        <div className="text-[14px]">{label}</div>
        {sub && <div className="text-[11px] text-[var(--color-fg-muted)]">{sub}</div>}
      </div>
      <div
        aria-checked={on}
        role="switch"
        className={"h-6 w-10 rounded-full p-0.5 transition-colors " + (on ? "bg-white" : "bg-white/20")}
      >
        <div className={"h-5 w-5 rounded-full transition-transform " + (on ? "translate-x-4 bg-black" : "bg-white")} />
      </div>
    </div>
  );
}

function ThemeRow() {
  return (
    <div>
      <div className="flex items-center justify-between h-11">
        <span className="text-[14px]">Тема</span>
        <span className="text-[13px] text-[var(--color-fg-muted)]">Тёмная ▾</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {THEMES.map((t) => (
          <button
            key={t.id}
            title={t.name}
            className="glass glass-hover shrink-0 h-14 rounded-[var(--radius-md)] px-3 flex items-center gap-2"
          >
            <span
              aria-hidden
              className="h-7 w-7 rounded-full border border-white/24"
              style={{ background: t.swatch }}
            />
            <span className="text-[12px] whitespace-nowrap">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
