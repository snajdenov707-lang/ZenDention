"use client";

/**
 * Идеи (Notes → таб Идеи). Хранятся в captures с kind='idea'.
 * user_id проставляется из текущей сессии; RLS отсекает чужие записи.
 */

import { getSupabase } from "@/lib/supabase-browser";

export interface Idea {
  id: string;
  content: string;
  created_at: string;
}

export async function listIdeas(): Promise<Idea[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("captures")
    .select("id, content, created_at")
    .eq("kind", "idea")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addIdea(content: string): Promise<Idea> {
  const supabase = getSupabase();
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) throw userErr ?? new Error("no session");

  const { data, error } = await supabase
    .from("captures")
    .insert({ user_id: userData.user.id, kind: "idea", content })
    .select("id, content, created_at")
    .single();
  if (error) throw error;
  return data!;
}

export async function deleteIdea(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("captures").delete().eq("id", id);
  if (error) throw error;
}
