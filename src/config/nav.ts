import { MainNavType } from "@/types"

interface MainNavConfigType extends MainNavType {
  hrefs: {
    blog: {
      post: string
      tags: string
      series: string
      index: string
    }
  }
}

export const mainNavConfig: MainNavConfigType = {
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
      title: "About",
      href: "/about",
    },
  ],
  hrefs: {
    blog: {
      post: "/blog/post/",
      tags: "/blog/tags/",
      // Sem acento: é o mesmo nome da coluna `Serie` no Notion, e URL com
      // acento vira `%C3%A9` — nada ganha com isso.
      series: "/blog/serie/",
      index: "/blog/",
    },
  },
}
