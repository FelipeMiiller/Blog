import { siteMetadataType } from "@/models"

export const siteMetadata: siteMetadataType = {
  language: "pt-br",
  theme: "system",

  links: {
    siteUrl: "https://felipemiiller.com",
    siteRepo: "https://github.com/FelipeMiiller/Blog",
    email: "felipemiillerr@gmail.com",
    github: "https://github.com/FelipeMiiller",
    x: "https://twitter.com/x",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    linkedin: "https://www.linkedin.com/in/felipe-miiller-45b1a891/",
    threads: "https://www.threads.net",
    instagram: "https://www.instagram.com",
  },
  metadata: {
    metadataBase: new URL("https://github.com/FelipeMiiller/nextjs-template"),
    title: {
      default: "Blog - Felipe Miiller",
      template: "%s | Blog - Felipe Miiller",
    },
    description: "Um Blog sobre desenvolvimento e análise",
    creator: "Felipe Miiller",
    applicationName: "Blog - Felipe Miiller ",
    keywords: [
      "blog",
      "developer",
      "nextjs",
      "notion",
      "typescript",
      "node",
      "nestjs",
      "tailwind",

      "javascript",
      "api",
      "react",
      "css",
      "docker",
      "github",
      "devto",
      "dev",
      "felipemiiller",
      "felipe",
      "miiller",
      "python",
    ],
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "https://felipemiiller.com",
      title: "Blog - Felipe Miiller",
      description: "Um Blog sobre desenvolvimento e análise",
      siteName: " Felipe Miiller -Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: "Felipe Miiller - Blog",
      description: "",
    },
    authors: [
      {
        name: "Felipe Miiller",
        url: "https://github.com/FelipeMiiller",
      },
    ],

    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
  },
}
