/**
 * Большой затекстованный знак раздела: "TASKS©", "INBOX©", "MEETINGS©", "FOOD©", ...
 * Абсолютно ничего не хардкодит — принимает готовую строку.
 */
export function SectionWatermark({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="select-none text-[44px] font-semibold leading-none tracking-tight text-[var(--color-fg-dim)]"
    >
      {text}©
    </div>
  );
}
