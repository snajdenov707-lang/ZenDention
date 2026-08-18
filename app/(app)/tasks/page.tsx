"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { TabUnderline } from "@/components/section/segmented";

export default function TasksPage() {
  const [tab, setTab] = useState("Активные");

  return (
    <SectionPage n="02" title="Tasks">
      <TabUnderline
        options={["Активные", "Готово"]}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-10">
        <SectionWatermark text={tab === "Активные" ? "TASKS" : "DONE"} />
        <p className="mt-3 text-[14px] text-[var(--color-fg-muted)]">
          {tab === "Активные"
            ? "Добавьте первую задачу выше."
            : "Выполненные задачи появятся здесь."}
        </p>
      </div>
    </SectionPage>
  );
}
