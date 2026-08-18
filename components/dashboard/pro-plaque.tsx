import { cn } from "@/lib/utils";

/**
 * Плашка Pro-подписки. Заглушка до итерации по пейволлу (Platega).
 * Название/копирайт юзер поменяет позже.
 */
export function ProPlaque({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass tilt-shine rounded-[var(--radius-lg)]",
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
        <div className="text-[14px] font-medium">Pro — скоро</div>
        <div className="truncate text-[12px] text-[var(--color-fg-muted)]">
          голос, фото-еда, дашборды
        </div>
      </div>
      <div
        className={cn(
          "glass-strong rounded-full px-3 py-1",
          "text-[11px] font-semibold tracking-wider",
        )}
      >
        PRO
      </div>
    </div>
  );
}
