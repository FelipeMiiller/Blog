export type HomeConfig = typeof homeConfig
export type SiteConfig = typeof siteConfig

export const homeConfig = {
  name: "Felipe Miiller",
  description: "Blog pessoal de Felipe Miiller",
  language: "pt-br",
  limitePreviews: 5,
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Sobre",
      href: "/sobre",
    },
  ],
  links: {
    github: "https://github.com/FelipeMiiller",
  },
}

export const siteConfig = {
  dataBasePosts: process.env.NOTION_DATABASE_POSTS_ID,
}
