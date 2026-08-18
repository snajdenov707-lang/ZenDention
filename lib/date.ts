/**
 * Русская дата и приветствие.
 * Формат по макету: "18 августа" + сверху день недели + снизу "Добрый вечер".
 */

const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
] as const;

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

export function formatDate(d: Date = new Date()) {
  return {
    weekday: WEEKDAYS[d.getDay()],
    dayMonth: `${d.getDate()} ${MONTHS_GENITIVE[d.getMonth()]}`,
    greeting: greetingByHour(d.getHours()),
  };
}

function greetingByHour(h: number): string {
  if (h >= 5 && h < 12) return "Доброе утро";
  if (h >= 12 && h < 18) return "Добрый день";
  if (h >= 18 && h < 23) return "Добрый вечер";
  return "Доброй ночи";
}

/** "307 613" (русские разряды через тонкий пробел). */
export function formatMoney(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n).replace(/,/g, " ");
}
