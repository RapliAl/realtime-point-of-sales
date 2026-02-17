"use client"

import * as React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAuthStore} from "@/stores/auth-stores";

export default function Home() {
    const profile = useAuthStore((state) => state.profile);
    return (
        <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
            <h1 className="text-4xl font-semibold">Welcome {profile.name}!</h1>
            <Link href={profile.role === "admin" ? "/admin" : "/order"}>
                <Button className="text-white-500 bg-teal-500 hover:bg-teal-600 hover:text-white-600">
                    Access Dashboard!
                </Button>
            </Link>
        </div>
    );
}
