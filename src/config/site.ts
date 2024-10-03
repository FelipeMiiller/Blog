export type siteMetadata = typeof siteMetadata
export type siteConfigs = typeof siteConfigs

export const siteMetadata = {
  author: "Felipe Miiller",
  title: "Blog - Felipe Miiller",
  description: "Um Blog sobre desenvolvimento e análise",
  language: "pt-br",
  theme: "system", // system, dark or light
  siteLogo: "/static/images/logo.png",
  socialBanner: "/static/images/twitter-card.png",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touc.png",
  },
  hrefs: {
    blog: {
      post: "/blog/post/",
      tags: "/blog/tags/",
      index: "/blog/",
    },
  },
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
}
export const siteConfigs = {
  pages: {
    posts_per_page: 5,
    revalidate: 60 * 60 * 24 * 2,
  },
  notion: {
    dataBasePosts: process.env.NOTION_DATABASE_POSTS_ID,
    apiKey: process.env.NOTION_API_KEY,
  },

  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: "giscus", // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname", // supported options: pathname, url, title
      reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: "0",
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: "light",
      // theme when dark mode
      darkTheme: "transparent_dark",
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: "",
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: "pt",
    },
  },
}
