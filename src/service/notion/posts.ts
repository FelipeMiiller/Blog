import { type Metadata } from "next"
import { envConfigs, siteMetadata } from "@/config"
import { getTags } from "@/functions/filtersPost"
import { type Post } from "@/types"

import Notion from "./index"

const REVALIDATE = envConfigs.pages.revalidate

export async function getPostsInOrderForPublished(priorityTrue = false): Promise<Post[]> {
  return Notion.query({
    filter:
      priorityTrue === false
        ? { property: "Published", checkbox: { equals: true } }
        : {
            property: "Priority",
            checkbox: {
              equals: true,
            },
          },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  })
}

export async function getSParams_PostsInOrderForPublished() {
  const titles = await Notion.query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    filter_properties: ["Page", "Authors"],
  })

  return {
    props: {
      titles,
    },
    REVALIDATE,
  }
}

type MetadataProps = {
  params?: Promise<{ slug?: string | string[] }>
}

export async function getMetada({ params }: MetadataProps = {}): Promise<Metadata> {
  const rawSlug = (await params)?.slug
  const slug = typeof rawSlug === "string" ? rawSlug : undefined

  if (slug === undefined) {
    const posts = await Notion.query({
      filter: {
        property: "Priority",
        checkbox: {
          equals: true,
        },
      },
    })

    const tags = [...new Set(getTags(posts).map((tag) => tag.name))]
    const titles = posts.map((post) => post.title)

    const keywords =
      typeof siteMetadata.metadata.keywords === "string"
        ? [siteMetadata.metadata.keywords]
        : siteMetadata.metadata.keywords || []

    return {
      ...siteMetadata.metadata,
      keywords: [...keywords, ...tags, ...titles],
    }
  }

  const title = decodeURIComponent(slug).split("-").join(" ")

  const posts = await Notion.query({
    filter: {
      property: "Page",
      type: "title",
      title: {
        contains: decodeURIComponent(title),
      },
    },
  })

  if (posts.length === 0) {
    return {
      ...siteMetadata.metadata,
    }
  }

  const tags = [...new Set(getTags(posts).map((tag) => tag.name))]
  const titles = posts.map((post) => post.title)

  const keywords =
    typeof siteMetadata.metadata.keywords === "string"
      ? [siteMetadata.metadata.keywords]
      : siteMetadata.metadata.keywords || []

  const post = posts[0]
  const postUrl = `${envConfigs.site.baseUrl.replace(/\/$/, "")}/blog/post/${encodeURIComponent(post.slug)}`
  const authors = post.authors.map((author) => author.name).filter(Boolean)

  return {
    ...siteMetadata.metadata,
    title: post.title,
    description: post.description,
    alternates: {
      ...siteMetadata.metadata.alternates,
      canonical: postUrl,
    },
    openGraph: {
      ...siteMetadata.metadata.openGraph,
      type: "article" as const,
      url: postUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.created,
      modifiedTime: post.updated ?? post.created,
      authors,
    },
    twitter: {
      ...siteMetadata.metadata.twitter,
      title: post.title,
      description: post.description,
    },
    keywords: [...keywords, ...tags, ...titles],
  }
}

export async function generateStaticParamsPosts(): Promise<{ slug: string }[]> {
  const titles = await Notion.query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  })

  const postsPaths = titles.map((post) => ({
    slug: post.slug,
  }))

  return postsPaths
}

export async function getPostWithMarkdown(id: string): Promise<string | null> {
  const markdown = await Notion.getPageMarkdown(id)

  return markdown
}
