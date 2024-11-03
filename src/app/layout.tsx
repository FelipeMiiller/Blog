import "@/styles/globals.css"

import { Fragment } from "react"
import { Metadata } from "next"
import { TailwindIndicator, ThemeProvider } from "@/components"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"
import { caveat, poppins, roboto } from "@/styles/fonts"

export const metadata: Metadata = siteMetadata.metadata

interface RootLayoutProps {
  children: React.ReactNode
}

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
            <div className="flex h-screen flex-col   flex-1  container px-2 max-w-6xl">
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </Fragment>
  )
}
