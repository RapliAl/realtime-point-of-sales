"use client"

import * as React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
        <h1 className="text-4xl font-semibold">Welcome to HomePage!</h1>
        <Link href="/admin">
            <Button className="bg-white text-black hover:bg-teal-500 hover:text-white">
                Access Dashboard!
            </Button>
        </Link>
    </div>
  );
}
