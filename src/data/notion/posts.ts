import { siteConfigs } from "@/config/site"

import Notion, { NotionPostData } from "."

const POSTS_PER_PAGE = siteConfigs.pages.posts_per_page as number
const REVALIDATE = siteConfigs.pages.revalidate as number

export async function getPostsInOrderForPublished(): Promise<{
  posts: NotionPostData[]
  posts_per_page: number
}> {
  const posts = await new Notion().query({
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
    posts,
    posts_per_page: POSTS_PER_PAGE,
  }
}

export async function getSParams_PostsInOrderForPublished() {
  const titles = await new Notion().query({
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
    REVALIDATE,
  }
}

export async function getSParams_Posts() {
  const titles = await new Notion().query({
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

export async function getPostWithMarkdown(id: string): Promise<string | null> {
  const notion = new Notion()

  const markdown = await notion.getPageMarkdown(id)

  return markdown
}
