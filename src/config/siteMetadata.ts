import { siteMetadataType } from "@/types"

import { envConfigs } from "@/config/envs"

const baseUrl = envConfigs.site.baseUrl

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
    description: "Um blog sobre desenvolvimento, análise e ideias práticas de Felipe Miiller.",
    creator: "Felipe Miiller",
    publisher: "Felipe Miiller",
    alternates: {
      canonical: baseUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
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
      description: "Um blog sobre desenvolvimento, análise e ideias práticas de Felipe Miiller.",
      siteName: "Blog - Felipe Miiller",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Blog de Felipe Miiller",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Felipe Miiller - Blog",
      description: "Um blog sobre desenvolvimento, análise e ideias práticas.",
      images: ["/opengraph-image"],
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
