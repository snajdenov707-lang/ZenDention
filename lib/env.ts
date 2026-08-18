/**
 * Публичные env — то, что уходит в бандл. Всё что секретно живёт в edge-функциях.
 * publishable key = не секрет, специально помечен так вендором.
 */
export const PUBLIC_ENV = {
  supabaseUrl: "https://sexrlsgmibzxajqekemy.supabase.co",
  supabasePublishableKey: "sb_publishable_KJVs9700LAvmXCFvdfaPRA_UiXnlpUQ",
} as const;
