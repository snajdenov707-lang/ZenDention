/**
 * Тонкая полоса-нотификация под датой (ref 01):
 *   ●  РАСХОД                                          только что
 * Кликабельно — ведёт в Money. Данные-заглушка.
 */
import Link from "next/link";

export function DigestNotif() {
  return (
    <Link
      href="/money"
      className="flex h-8 items-center justify-between rounded-full glass tilt-shine glass-hover px-3"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/60" />
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
          Расход
        </span>
      </div>
      <span className="text-[10px] text-[var(--color-fg-faint)]">только что</span>
    </Link>
  );
}
