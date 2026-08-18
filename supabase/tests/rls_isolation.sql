-- =========================================================
-- Ручная проверка изоляции. Гоняется через psql на remote:
--   psql "$SUPABASE_DB_URL" -f supabase/tests/rls_isolation.sql
--
-- Скрипт:
--   1. Создаёт двух юзеров (A, B) через auth.admin.create_user эмуляцию.
--   2. Пишет запись от A и запись от B.
--   3. Пытается прочитать всё под ролью A — должен увидеть только свою.
--   4. Пытается прочитать всё под ролью B — должен увидеть только свою.
--   5. Пытается A прочитать чужую по id — 0 строк.
--   6. Пытается A вставить запись с user_id = B — RLS ловит и отшивает.
-- =========================================================

begin;

-- Создаём двух юзеров напрямую в auth.users (эмуляция service-role вставки).
insert into auth.users (id, aud, role, email, encrypted_password, email_confirmed_at)
values
  ('00000000-0000-0000-0000-000000000a01', 'authenticated', 'authenticated', 'a@test.local', '', now()),
  ('00000000-0000-0000-0000-000000000b02', 'authenticated', 'authenticated', 'b@test.local', '', now())
on conflict (id) do nothing;

-- Пишем через service role (RLS выключен для этой роли по умолчанию только у нас, если явно).
-- Тут просто снимаем RLS локально ради вставки тестовых данных.
alter table public.captures disable row level security;

insert into public.captures (user_id, content) values
  ('00000000-0000-0000-0000-000000000a01', 'секрет A'),
  ('00000000-0000-0000-0000-000000000b02', 'секрет B');

alter table public.captures enable row level security;

-- 3. Под ролью A — только свою
set local role authenticated;
set local "request.jwt.claim.sub" to '00000000-0000-0000-0000-000000000a01';

select 'A sees own:' as label, count(*) as n from public.captures;
-- ожидание: n = 1

-- 5. Не видит B по id
select 'A tries B by id:' as label, count(*) as n
from public.captures
where user_id = '00000000-0000-0000-0000-000000000b02';
-- ожидание: n = 0

-- 6. Не может вставить запись с чужим user_id
do $$
begin
  begin
    insert into public.captures (user_id, content)
    values ('00000000-0000-0000-0000-000000000b02', 'подделка');
    raise notice 'FAIL: insert-as-other succeeded';
  exception when others then
    raise notice 'OK: insert-as-other blocked (%)', sqlerrm;
  end;
end $$;

-- 4. Переключаемся на B
set local "request.jwt.claim.sub" to '00000000-0000-0000-0000-000000000b02';
select 'B sees own:' as label, count(*) as n from public.captures;
-- ожидание: n = 1

rollback;
