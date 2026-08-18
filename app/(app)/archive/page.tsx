"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { TabUnderline } from "@/components/section/segmented";

/** Archive — ref 31, 32. */
export default function ArchivePage() {
  const [tab, setTab] = useState("Tasks");
  const [range, setRange] = useState("7 дней");

  return (
    <SectionPage n="00" title="— Archive">
      <TabUnderline options={["Tasks", "Ideas"]} value={tab} onChange={setTab} />
      <TabUnderline options={["7 дней", "30 дней", "Всё"]} value={range} onChange={setRange} />

      {tab === "Tasks" ? (
        <div className="mt-4">
          <div className="text-[18px] font-medium">Архив пуст</div>
          <p className="mt-1 text-[13px] text-[var(--color-fg-muted)]">
            Архивированные задачи появятся здесь.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-center justify-between h-11">
            <span className="text-[15px] text-[var(--color-fg)]">1</span>
            <span className="text-[13px] text-[var(--color-fg-muted)]">19 авг.</span>
          </div>
        </div>
      )}
    </SectionPage>
  );
}
