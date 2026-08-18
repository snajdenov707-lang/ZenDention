-- =========================================================
-- 0001_init — фундамент: одна таблица captures + строгая RLS.
-- Юзер физически не читает чужие записи. Проверено в test_rls.sql.
-- =========================================================

create extension if not exists "uuid-ossp";

-- Все пользовательские записи. Тип разбирается позже (заметка/задача/трата/...).
-- Пока что храним raw payload — иначе миграция закрывает нам маневр по схеме.
create table if not exists public.captures (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  kind        text,                    -- 'note' | 'task' | 'expense' | ... nullable до разбора
  content     text not null,
  payload     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists captures_user_created_idx
  on public.captures (user_id, created_at desc);

-- ---- RLS ------------------------------------------------
alter table public.captures enable row level security;

-- select: только свои
create policy "captures_select_own"
  on public.captures for select
  using (auth.uid() = user_id);

-- insert: только под своим user_id (нельзя записать за другого)
create policy "captures_insert_own"
  on public.captures for insert
  with check (auth.uid() = user_id);

-- update: только свои
create policy "captures_update_own"
  on public.captures for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- delete: только свои
create policy "captures_delete_own"
  on public.captures for delete
  using (auth.uid() = user_id);

-- Явно отбираем privileges у роли authenticated по умолчанию,
-- дальше даём только то что перечислено выше через RLS.
revoke all on public.captures from anon, authenticated;
grant select, insert, update, delete on public.captures to authenticated;
