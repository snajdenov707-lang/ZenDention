import { SectionPage } from "@/components/section/section-page";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/date";

/**
 * Экран продажи Pro (ref 24, 25).
 * Тарифы — по твоей формуле (маржа ×2.5): 490 ₽/мес, 4990 ₽/год.
 * Lifetime — 9900 ₽ (произвольная цена «навсегда», ~20 месяцев подписки).
 */
const PLANS = [
  { id: "year",     title: "Pro · год",       sub: "≈416 ₽/мес · −15%",    price: 4990, unit: "₽", primary: true },
  { id: "month",    title: "Pro · месяц",     sub: "в месяц",              price: 490,  unit: "₽" },
  { id: "lifetime", title: "Founder Lifetime", sub: "разово · навсегда",   price: 9900, unit: "₽" },
];

export default function ProPage() {
  return (
    <SectionPage n="00" title="Pro">
      <div className="glass tilt-shine rounded-[var(--radius-lg)] p-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] flex items-center gap-1">
          <span aria-hidden>✦</span> ZenDention Pro
        </div>
        <h2 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight">
          Вся жизнь —<br />без лимитов
        </h2>
        <p className="mt-3 text-[14px] text-[var(--color-fg-muted)]">
          Голос, фото-еда, дашборды и «Спроси свою жизнь» — без ограничений.
        </p>
      </div>

      <div className="glass tilt-shine rounded-[var(--radius-lg)] p-4">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] mb-3">
          Что открывает Pro
        </div>
        <ul className="flex flex-col gap-2 text-[14px]">
          <Bullet>Безлимит AI: голос, текст, фото-еда, «Спроси свою жизнь»</Bullet>
          <Bullet>Дашборд расходов и AI-итоги недели</Bullet>
          <Bullet>Голосовой и тап-захват с iPhone</Bullet>
          <Bullet>Ранний доступ к новым фичам</Bullet>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={cn(
              "tilt-shine rounded-[var(--radius-md)] p-4 flex items-center justify-between",
              p.primary
                ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-fg)]"
                : "glass glass-hover",
            )}
          >
            <div>
              <div className="text-[15px] font-semibold">{p.title}</div>
              <div
                className={cn(
                  "text-[12px]",
                  p.primary ? "text-black/60" : "text-[var(--color-fg-muted)]",
                )}
              >
                {p.sub}
              </div>
            </div>
            <div className="text-[20px] font-semibold">
              {formatMoney(p.price)} {p.unit}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-[var(--color-fg-muted)]">
        Оплата откроется в браузере (СБП / крипто), доступ — сразу. Если страница
        оплаты не грузится — отключите VPN на момент оплаты (СБП работает по РФ
        без VPN).
      </p>
    </SectionPage>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden className="mt-0.5 text-[var(--color-fg-muted)]">✓</span>
      <span>{children}</span>
    </li>
  );
}
