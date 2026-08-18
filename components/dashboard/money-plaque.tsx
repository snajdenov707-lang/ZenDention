import Link from "next/link";
import { formatMoney } from "@/lib/date";
import { cn } from "@/lib/utils";

/**
 * Полноширинная плашка по шаблону из ref 13.
 * Данные пока хардкод — до итерации ручного ввода / банковской интеграции.
 */
export function MoneyPlaque({ className }: { className?: string }) {
  const balance = 307613;
  const perDay = 21972;
  const deadline = "до 31 авг";

  return (
    <Link
      href="/section/money"
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "block px-5 py-4",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          Свободно
        </div>
        <div className="text-[11px] text-[var(--color-fg-muted)]">{deadline}</div>
      </div>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-[30px] font-semibold leading-none tracking-tight">
          {formatMoney(balance)}
        </span>
        <span className="text-[16px] text-[var(--color-fg-muted)]">$</span>
      </div>

      <div className="mt-2 text-[13px] text-[var(--color-fg-muted)]">
        можно {formatMoney(perDay)} $ в день
      </div>
    </Link>
  );
}
