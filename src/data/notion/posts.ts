import { siteMetadata } from "@/config/site"

import Notion from "."

const POSTS_PER_PAGE = siteMetadata.posts_per_page as number
export async function getSProps_PostsInOrderForPublished() {
  const revalidate = 60 * 60 * 24
  let posts = await new Notion().query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
      {
        property: "Updated",
        direction: "descending",
      },
    ],
  })

  return {
    props: {
      posts,
      posts_per_page: POSTS_PER_PAGE,
    },
    revalidate,
  }
}

export async function getSParams_PostsInOrderForPublished() {
  const revalidate = 60 * 60 * 24
  let titles = await new Notion().query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    filter_properties: ["Page", "Authors"],
  })
  titles

  return {
    props: {
      titles,
    },
    revalidate,
  }
}

export async function getSParams_Posts() {
  const revalidate = 60 * 60 * 24
  let titles = await new Notion().query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  })
  titles

  const totalPages = Math.ceil(titles.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}
