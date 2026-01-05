"use client"

import Image from "next/image";
import * as React from "react";
import {Calendar} from "@/components/ui/calendar";
import {ModeToggle} from "@/components/mode-toggle";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
        <ModeToggle />
    </div>
  );
}
