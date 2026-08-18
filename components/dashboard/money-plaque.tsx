import Link from "next/link";
import { formatMoney } from "@/lib/date";
import { cn } from "@/lib/utils";

/**
 * Money на дашборде (ref 01). Данные-заглушка под ref: 1 000 $ / можно 77 $ в день / до 31 авг.
 */
export function MoneyPlaque({ className }: { className?: string }) {
  const balance = 1000;
  const perDay = 77;
  const deadline = "до 31 авг";

  return (
    <Link
      href="/money"
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "block px-5 py-4",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-fg-faint)]">04</span> Money
        </div>
        <div className="text-[11px] text-[var(--color-fg-muted)]">{deadline}</div>
      </div>

      <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        Свободно
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[32px] font-semibold leading-none tracking-tight">
          {formatMoney(balance)}
        </span>
        <span className="text-[16px] text-[var(--color-fg-muted)]">$</span>
      </div>
      <div className="mt-1 text-[13px] text-[var(--color-fg-muted)]">
        можно {formatMoney(perDay)} $ в день
      </div>
    </Link>
  );
}
