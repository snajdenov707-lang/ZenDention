import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Плашка апсейла Pro (ref 01, 02).
 * По тексту — 1:1 из референса. Ведёт на /pro.
 */
export function ProPlaque({ className }: { className?: string }) {
  return (
    <Link
      href="/pro"
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "flex items-center gap-3 px-4 py-3",
        className,
      )}
    >
      <div
        aria-hidden
        className="glass-strong flex h-9 w-9 items-center justify-center rounded-full text-[16px]"
      >
        ✦
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium">
          Pro <span className="text-[var(--color-fg-muted)]">— без лимитов на AI</span>
        </div>
        <div className="truncate text-[12px] text-[var(--color-fg-muted)]">
          голос, фото-еда, дашборды, «Спроси свою жизнь»
        </div>
      </div>
      <div className="glass-strong rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider">
        PRO
      </div>
    </Link>
  );
}
