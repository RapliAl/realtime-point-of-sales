import {createClient} from "@supabase/supabase-js";
import {environment} from "@/configs/environment";

export function createClientSupabase() {
    return createClient(
        environment.SUPABASE_URL!,
        environment.SUPABASE_ANON_KEY!
    )
}