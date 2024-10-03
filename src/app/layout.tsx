import "@/styles/globals.css"

import { Fragment } from "react"
import { Metadata } from "next"
import { TailwindIndicator, ThemeProvider } from "@/components"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/site"
import { baskervville, caveat, roboto } from "@/styles/fonts"

export const metadata: Metadata = {
  title: {
    default: siteMetadata.author,
    template: `%s - ${siteMetadata.author}`,
  },
  description: siteMetadata.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touc.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Fragment>
      <html
        lang={siteMetadata.language}
        className={cn(roboto.variable, caveat.variable, baskervville.variable)}
        suppressHydrationWarning
      >
        <head />
        <body className={"min-h-screen  flex bg-background font-roboto  antialiased"}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
