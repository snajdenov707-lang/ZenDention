"use client";

import { usePathname } from "next/navigation";
import { LauncherBar } from "./launcher/launcher-bar";
import { BottomCrumb } from "./section/bottom-crumb";
import { PlusFab } from "./section/plus-fab";
import { findSectionByPath, SECTIONS, EXTRA_SECTIONS } from "@/lib/sections";

/**
 * Единый низ: решает что рисовать по URL.
 *   /        → LauncherBar
 *   /:slug   → BottomCrumb (+ FAB для tasks/notes)
 */
export function BottomChrome() {
  const pathname = usePathname();

  if (pathname === "/") return <LauncherBar />;

  const section = findSectionByPath(pathname);
  if (!section) return <LauncherBar />; // страховка

  // Секция из основной 8-ки — используем номер + название; экстра — тэг из EXTRA_SECTIONS
  const inMain = SECTIONS.find((s) => s.href === section.href);
  const inExtra = Object.values(EXTRA_SECTIONS).find((s) => s.href === section.href);
  const tag = inMain?.title ?? inExtra?.crumbTag ?? section.title;
  const n = inMain?.n;

  const showFab = section.href === "/tasks" || section.href === "/notes";

  return <BottomCrumb n={n} tag={tag} fab={showFab ? <PlusFab /> : undefined} />;
}
