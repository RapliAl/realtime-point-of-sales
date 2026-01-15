import "./globals.css";
import {ThemeProvider} from "@/provider/theme-provider";
import React from "react";
import {Toaster} from "@/components/ui/sonner";
import AuthStoreProvider from "@/provider/auth-store-provider";
import {cookies} from "next/headers";

type RootLayoutProps = {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const cookiesStore = await cookies()
    const profile = JSON.parse(cookiesStore.get("user_profile")?.value ?? "{}");
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <head>
                <title>
                    Point Of Sales
                </title>
            </head>
            <body>
            <AuthStoreProvider profile={profile}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster />
            </AuthStoreProvider>
            </body>
            </html>
        </>
    )
}