import "./globals.css";
import {ThemeProvider} from "@/provider/theme-provider";
import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <>
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>
                Point Of Sales
            </title>
        </head>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </body>
        </html>
      </>
  )
}