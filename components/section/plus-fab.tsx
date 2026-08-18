import { cn } from "@/lib/utils";

/**
 * Белая круглая кнопка «+» (Tasks, Notes). Заглушка без onClick — визуал.
 */
export function PlusFab({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Добавить"
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-fg)] shadow-lg",
        "active:scale-95 transition-transform",
        className,
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </button>
  );
}
