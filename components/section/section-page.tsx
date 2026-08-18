import type { ReactNode } from "react";
import { SectionHeader } from "./section-header";

/**
 * Стандартная обёртка внутренней страницы раздела:
 *   - шапка с номером + название
 *   - контент (кладёт вызывающий)
 * Крошки-навигация НЕ сюда — они рендерятся в BottomChrome по route.
 */
export function SectionPage({
  n,
  title,
  headerRight,
  children,
}: {
  n: string;
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <SectionHeader n={n} title={title.toUpperCase()} right={headerRight} />
      {children}
    </div>
  );
}
