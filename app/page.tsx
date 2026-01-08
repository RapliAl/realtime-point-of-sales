"use client"

import Image from "next/image";
import * as React from "react";
import {Calendar} from "@/components/ui/calendar";
import {DarkmodeToggle} from "@/components/common/darkmode-toggle";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm bg-amber-50 dark:bg-amber-600"
        captionLayout="dropdown"
      />
        <DarkmodeToggle />
    </div>
  );
}
