// deno-lint-ignore-file no-explicit-any
/**
 * tg-auth — приём initData из Telegram Mini App, проверка подписи,
 * upsert пользователя, выдача Supabase-сессии (access + refresh).
 *
 * Bot token НИКОГДА не покидает сервер. Клиент шлёт только initData.
 * Ссылка: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * Env:
 *   TELEGRAM_BOT_TOKEN          — токен бота
 *   SUPABASE_URL                — supabase base url
 *   SUPABASE_SERVICE_ROLE_KEY   — service role (создаёт юзеров, выдаёт сессии)
 */

import { createClient } from "npm:@supabase/supabase-js@2";

const AUTH_MAX_AGE_SEC = 60 * 60 * 24; // 24 часа — старше не принимаем

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function j(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}

async function hmacSha256(keyBytes: BufferSource, msg: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let acc = 0;
  for (let i = 0; i < a.length; i++) acc |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return acc === 0;
}

/**
 * Проверка initData:
 *   1. Парсим query-string, забираем hash отдельно.
 *   2. data_check_string = отсортированные "k=v" через \n.
 *   3. secret_key = HMAC_SHA256(key="WebAppData", msg=bot_token)
 *   4. hash === HMAC_SHA256(key=secret_key, msg=data_check_string)
 *   5. auth_date не старше AUTH_MAX_AGE_SEC.
 */
async function verifyInitData(
  initData: string,
  botToken: string,
): Promise<{ user: any } | null> {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");

  const pairs: string[] = [];
  for (const [k, v] of params) pairs.push(`${k}=${v}`);
  pairs.sort();
  const dataCheckString = pairs.join("\n");

  const secretKey = await hmacSha256(new TextEncoder().encode("WebAppData"), botToken);
  const expected = toHex(await hmacSha256(secretKey, dataCheckString));
  if (!safeEq(expected, hash)) return null;

  const authDate = Number(params.get("auth_date") ?? 0);
  if (!authDate || Math.floor(Date.now() / 1000) - authDate > AUTH_MAX_AGE_SEC) {
    return null;
  }

  const userRaw = params.get("user");
  if (!userRaw) return null;
  try {
    return { user: JSON.parse(userRaw) };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return j(405, { error: "method" });

  let initData = "";
  try {
    const body = await req.json();
    initData = String(body?.initData ?? "");
  } catch {
    return j(400, { error: "bad_json" });
  }
  if (!initData) return j(400, { error: "no_init_data" });

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!botToken || !supabaseUrl || !serviceKey) return j(500, { error: "env" });

  const verified = await verifyInitData(initData, botToken);
  if (!verified) return j(401, { error: "bad_signature" });

  const tgUser = verified.user as {
    id: number;
    first_name?: string;
    username?: string;
    photo_url?: string;
    language_code?: string;
  };

  // Синтетический email (Supabase auth требует уникальный логин).
  // Пароль — детерминистический HMAC от bot token и tg id.
  // Он никогда не покидает сервер и нужен только чтобы вызвать signInWithPassword.
  const email = `tg-${tgUser.id}@zendention.local`;
  const passwordSeed = toHex(
    await hmacSha256(new TextEncoder().encode(botToken), `zd-user:${tgUser.id}`),
  );

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Пытаемся создать. При повторном входе будет "user_already_exists" — это норма.
  const { error: createErr } = await admin.auth.admin.createUser({
    email,
    password: passwordSeed,
    email_confirm: true,
    user_metadata: {
      tg_id: tgUser.id,
      first_name: tgUser.first_name ?? null,
      username: tgUser.username ?? null,
      photo_url: tgUser.photo_url ?? null,
      language_code: tgUser.language_code ?? null,
    },
  });
  if (createErr && !/exist|registered/i.test(createErr.message)) {
    return j(500, { error: "create_user", detail: createErr.message });
  }

  // Логин паролем → access + refresh для клиента.
  const { data: signIn, error: signErr } = await admin.auth.signInWithPassword({
    email,
    password: passwordSeed,
  });
  if (signErr || !signIn.session) {
    return j(500, { error: "sign_in", detail: signErr?.message ?? "no_session" });
  }

  return j(200, {
    access_token: signIn.session.access_token,
    refresh_token: signIn.session.refresh_token,
    tg_id: tgUser.id,
  });
});
