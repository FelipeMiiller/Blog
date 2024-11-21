import { Fragment } from "react"
import { notFound } from "next/navigation"
import {
  generateStaticParamsPosts,
  getMetada,
  getPostsInOrderForPublished,
  getPostWithMarkdown,
} from "@/service/notion/posts"
import { cn } from "@/utils/utils"

import { Footer, Header } from "@/app/components"

import { MarkdownContent, TableOfContents, Title } from "./components"

export const generateMetadata = getMetada
export const generateStaticParams = generateStaticParamsPosts

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const data = await getPostsInOrderForPublished()

  const post = data.find((post) => post.slug === decodeURIComponent(slug))

  if (!post) {
    return notFound()
  }

  const markdown = await getPostWithMarkdown(post.page)
  if (!markdown) {
    return notFound()
  }

  return (
    <Fragment>
      <Header />
      <div className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28">
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
      <Footer />
    </Fragment>
  )
}
