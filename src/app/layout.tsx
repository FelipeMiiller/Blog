import "@/styles/globals.css"

import React, { Fragment } from "react"
import { type Metadata, type Viewport } from "next"
import { TailwindIndicator, ThemeProvider } from "@/components"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"
import { Toaster } from "@/components/ui/sonner"
import { caveat, poppins, roboto } from "@/styles/fonts"

import { Footer, Header } from "./components"

interface RootLayoutProps {
  children: React.ReactNode
}
export const metadata: Metadata = siteMetadata.metadata
export const viewport: Viewport = siteMetadata.viewport

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felipe Miiller",
  url: siteMetadata.metadata.metadataBase?.toString(),
  sameAs: [siteMetadata.social.github, siteMetadata.social.linkedin],
  jobTitle: "Desenvolvedor de software",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Fragment>
      <html
        lang={siteMetadata.language}
        className={cn(roboto.variable, caveat.variable, poppins.variable)}
        suppressHydrationWarning
      >
        <body className={"min-h-screen  flex bg-background font-roboto  antialiased"}>
          <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
            <div className="flex h-screen flex-col   flex-1  container px-2 max-w-6xl">
              <Header />
              {children}
              <Footer />
            </div>
            <TailwindIndicator />
            <Toaster />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
          </ThemeProvider>
        </body>
      </html>
    </Fragment>
  )
}
