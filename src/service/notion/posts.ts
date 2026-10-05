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

  // Não tenta remontar o título a partir do slug. O slug vem do github-slugger,
  // que descarta pontuação: "Entity linking em 4 estágios: a normalização que
  // salva o português" vira "entity-linking-em-4-estágios-a-normalização-que-
  // salva-o-português". Trocar os hífens por espaços devolvia o título sem os
  // dois-pontos, o `contains` não casava com nada e a página saía com os
  // metadados genéricos do site: título, OpenGraph e canonical errados. O mesmo
  // valia para hífen legítimo no título ("pt-BR" voltava como "pt BR").
  //
  // A resolução agora casa slug com slug, na mesma lista que a página usa.
  // Reaproveitar a chamada também reaproveita o `unstable_cache` dela: nenhuma
  // requisição nova ao Notion.
  const post = (await getPostsInOrderForPublished()).find(
    (item) => item.slug === decodeURIComponent(slug)
  )

  if (!post) {
    return {
      ...siteMetadata.metadata,
    }
  }

  const tags = [...new Set(getTags([post]).map((tag) => tag.name))]
  const titles = [post.title]

  const keywords =
    typeof siteMetadata.metadata.keywords === "string"
      ? [siteMetadata.metadata.keywords]
      : siteMetadata.metadata.keywords || []

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
