/** Единый реестр разделов. Меняется в одном месте — везде подтягивается. */

export interface Section {
  slug: string;
  n: string; // "02"
  title: string; // "Tasks"
  href: string;
  crumbTag?: string; // тэг для нижней плашки-крошки: обычно = title
}

export const SECTIONS: Section[] = [
  { slug: "tasks",     n: "02", title: "Tasks",    href: "/tasks" },
  { slug: "notes",     n: "03", title: "Notes",    href: "/notes" },
  { slug: "money",     n: "04", title: "Money",    href: "/money" },
  { slug: "meetings",  n: "05", title: "Meetings", href: "/meetings" },
  { slug: "food",      n: "06", title: "Food",     href: "/food" },
  { slug: "rituals",   n: "07", title: "Rituals",  href: "/rituals" },
  { slug: "settings",  n: "08", title: "Settings", href: "/settings" },
];

/** Вторичные разделы (доступны с главной, не в 8-плитках). */
export const EXTRA_SECTIONS: Record<string, Section> = {
  trends:  { slug: "trends",  n: "00", title: "Trends", href: "/trends", crumbTag: "Тренды" },
  qcold:   { slug: "qcold",   n: "00", title: "Q-Cold", href: "/q-cold", crumbTag: "✦ Жизнь" },
  pro:     { slug: "pro",     n: "00", title: "Pro",    href: "/pro",    crumbTag: "★ Pro" },
  archive: { slug: "archive", n: "00", title: "Archive", href: "/archive", crumbTag: "Archive" },
};

export function findSectionByPath(pathname: string): Section | null {
  const s = SECTIONS.find((x) => pathname.startsWith(x.href));
  if (s) return s;
  const key = Object.keys(EXTRA_SECTIONS).find((k) => pathname.startsWith(EXTRA_SECTIONS[k]!.href));
  return key ? EXTRA_SECTIONS[key]! : null;
}
