import { Fragment, Suspense } from "react"
import { notFound } from "next/navigation"
import { envConfigs } from "@/config"
import {
  generateStaticParamsPosts,
  getMetada,
  getPostsInOrderForPublished,
  getPostWithMarkdown,
} from "@/service/notion/posts"
import { cn } from "@/utils/utils"

import { Skeleton } from "@/components/ui/skeleton"
import { MarkdownContent } from "@/components/markdown-component"

import { TableOfContents, Title } from "./components"

export const generateMetadata = getMetada
export const generateStaticParams = generateStaticParamsPosts
export const dynamicParams = true
export const revalidate = 86400

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <Fragment>
      <Suspense fallback={<PostSkeleton />}>
        <Content slug={slug} />
      </Suspense>
    </Fragment>
  )
}

async function Content({ slug }: { slug: string }) {
  const data = await getPostsInOrderForPublished()

  const post = data.find((post) => post.slug === decodeURIComponent(slug))

  if (!post) {
    return notFound()
  }

  const markdown = await getPostWithMarkdown(post.page)
  if (!markdown) {
    return notFound()
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.created,
    dateModified: post.updated ?? post.created,
    author: post.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${envConfigs.site.baseUrl.replace(/\/$/, "")}/blog/post/${encodeURIComponent(post.slug)}`,
    },
    image: [`${envConfigs.site.baseUrl.replace(/\/$/, "")}/opengraph-image`],
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <Title post={post} markdown={markdown} />
      <div className={cn("relative lg:flex lg:gap-8")}>
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-4">
            <TableOfContents markdown={markdown} />
          </div>
        </div>
        <article className="flex-grow prose dark:prose-invert max-w-3xl ">
          <MarkdownContent content={markdown} />
        </article>
      </div>
    </div>
  )
}

function PostSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-1/4 w-1/4" />
      <Skeleton className="h-1/4 w-1/3" />
      <Skeleton className="h-1/4 w-1/2" />
      <Skeleton className="h-1/4 w-1/2" />
    </div>
  )
}
