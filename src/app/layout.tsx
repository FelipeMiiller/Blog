import "@/styles/globals.css"

import React, { Fragment } from "react"
import { Viewport } from "next"
import { TailwindIndicator, ThemeProvider } from "@/components"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"
import { Toaster } from "@/components/ui/sonner"
import { caveat, poppins, roboto } from "@/styles/fonts"

interface RootLayoutProps {
  children: React.ReactNode
}
export const viewport: Viewport = siteMetadata.viewport
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Fragment>
      <html
        lang={siteMetadata.language}
        className={cn(roboto.variable, caveat.variable, poppins.variable)}
        suppressHydrationWarning
      >
        <head />
        <body className={"min-h-screen  flex bg-background font-roboto  antialiased"}>
          <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
            <div className="flex h-screen flex-col   flex-1  container px-2 max-w-6xl">{children}</div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </Fragment>
  )
}
