import { createClient,type SupabaseClient } from "@supabase/supabase-js";
let supab : SupabaseClient | null = null

export async function supabase(): Promise <SupabaseClient> {
    supab = createClient(String(process.env.DBURL), String(process.env.ANON))
    return supab
}
