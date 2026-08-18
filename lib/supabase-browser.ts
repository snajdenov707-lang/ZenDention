import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PUBLIC_ENV } from "./env";

let client: SupabaseClient | null = null;

/**
 * Один клиент на вкладку. Auth хранится в localStorage,
 * сессию мы получим от edge-функции tg-auth в виде access+refresh токенов.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  client = createClient(PUBLIC_ENV.supabaseUrl, PUBLIC_ENV.supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: "zd-auth",
    },
  });
  return client;
}
