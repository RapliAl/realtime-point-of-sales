"use client"

import {ReactNode, useEffect} from "react";
import {Profile} from "@/types/auth";
import {useAuthStore} from "@/stores/auth-stores";
import {createClient} from "@/lib/supabase/client";

export default function AuthStoreProvider({children, profile}: {children: ReactNode; profile: Profile;}) {
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({data: {user}}) =>{
            useAuthStore.getState().setUser(user);
            useAuthStore.getState().setProfile(profile);
        });
    });

    return <>{children}</>
}