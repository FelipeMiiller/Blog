import { siteMetadataType } from "@/types"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const siteMetadata: siteMetadataType = {
  language: "pt-br",
  theme: "system",
  links: {
    siteRepo: "https://github.com/FelipeMiiller/blog",
  },
  social: {
    mail: "mailto:felipemiillerr@gmail.com",
    github: "https://github.com/FelipeMiiller",
    linkedin: "https://www.linkedin.com/in/felipe-miiller-45b1a891/",
  },
  metadata: {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Blog - Felipe Miiller",
      template: "%s | Blog - Felipe Miiller",
    },
    description: "Um Blog sobre desenvolvimento e análise",
    creator: "Felipe Miiller",
    applicationName: "Blog - Felipe Miiller ",
    keywords: ["blog", "developer", "notion", "analysis", "analitics", "development", "dev"],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: baseUrl,
      title: "Blog - Felipe Miiller",
      description: "Um Blog sobre desenvolvimento e análise",
      siteName: " Felipe Miiller -Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: "Felipe Miiller - Blog",
      description: "",
    },
    authors: {
      name: "Felipe Miiller",
      url: "https://github.com/FelipeMiiller",
    },
  },
  viewport: {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
  },
}
