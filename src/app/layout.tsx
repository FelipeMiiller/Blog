import "@/styles/globals.css"

import { Metadata } from "next"
import { TailwindIndicator, ThemeProvider } from "@/components"
import { cn } from "@/util/utils"
import { siteMetadata } from "@/config/site"
import { fontSans } from "@/styles/fonts"



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
    <>
      <html lang={siteMetadata.language} suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen  flex bg-background  antialiased", fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-screen flex-col  font-sans flex-1  container px-2 max-w-6xl">
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
