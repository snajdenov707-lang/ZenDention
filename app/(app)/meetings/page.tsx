"use client";

import { useState } from "react";
import { SectionPage } from "@/components/section/section-page";
import { SectionWatermark } from "@/components/section/section-watermark";
import { TabUnderline } from "@/components/section/segmented";

export default function MeetingsPage() {
  const [tab, setTab] = useState("Предстоящие");

  return (
    <SectionPage n="05" title="Meetings">
      <div className="glass rounded-full h-12 flex items-center px-4">
        <input
          type="text"
          placeholder="Новая встреча…"
          className="flex-1 bg-transparent text-[14px] placeholder:text-[var(--color-fg-hint)] focus:outline-none"
        />
      </div>

      <TabUnderline
        options={["Предстоящие", "Прошедшие"]}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-6">
        <SectionWatermark text="MEETINGS" />
        <p className="mt-3 text-[14px] text-[var(--color-fg-muted)]">
          {tab === "Предстоящие"
            ? "Запланируйте встречу выше."
            : "Прошедшие встречи появятся здесь."}
        </p>
      </div>
    </SectionPage>
  );
}
