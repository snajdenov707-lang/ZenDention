import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function WidgetTile({ href, label, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "glass tilt-shine glass-hover rounded-[var(--radius-lg)]",
        "flex flex-col justify-between",
        "px-4 py-3 min-h-[122px]",
        className,
      )}
    >
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
        {label}
      </div>
      <div className="flex flex-1 flex-col justify-end">{children}</div>
    </Link>
  );
}

export function TileEmpty({ hint }: { hint: string }) {
  return (
    <>
      <div className="text-[36px] leading-none text-[var(--color-fg)]">+</div>
      <div className="mt-2 text-[12px] text-[var(--color-fg-muted)]">{hint}</div>
    </>
  );
}

/** Плитка с числовым состоянием (Notes «1», Meetings «1 / вс 3.04 06:07»). */
export function TileCount({ count, sub }: { count: number | string; sub: string }) {
  return (
    <>
      <div className="text-[36px] font-semibold leading-none">{count}</div>
      <div className="mt-2 text-[12px] text-[var(--color-fg-muted)]">{sub}</div>
    </>
  );
}
