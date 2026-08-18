"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Нижний шит на стекле. Бэкдроп затемняет фон, шит сам полупрозрачный.
 */
export function Sheet({ open, onClose, children, className }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "glass-strong absolute inset-x-0 bottom-0",
          "rounded-t-[var(--radius-lg)]",
          "pb-[max(1rem,var(--sab))] pt-2 px-4",
          "max-h-[85dvh] overflow-y-auto",
          className,
        )}
      >
        <div
          aria-hidden
          className="mx-auto mb-3 h-1 w-9 rounded-full bg-white/24"
        />
        {children}
      </div>
    </div>
  );
}
