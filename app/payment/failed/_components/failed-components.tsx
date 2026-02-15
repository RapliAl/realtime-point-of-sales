"use client"

import {X} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Failed() {

    return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <X className="size-20 text-red-500"/>
            <h1 className="text-3xl font-bold">
                Payment Failed
            </h1>
            <Link href="/order">
                <Button className="items-center ">
                    Back To Order
                </Button>
            </Link>
        </div>
    )
}