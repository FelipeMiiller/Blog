import React from "react"
import { NotionPostData } from "@/data/notion"
import { cn, extractHeadings, readingTime as ReadingTime } from "@/utils/utils"

import "katex/dist/katex.min.css"

import { Header, MarkdownContent, TableOfContents } from "./components"

export default function PostLayout({
  postData,
}: {
  postData: { post: NotionPostData; markdown: string }
}) {
  const { post, markdown } = postData
  const readingTime = ReadingTime(markdown)
  const headings = extractHeadings(markdown)

  return (
    <div className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28">
      <Header post={post} readingTime={readingTime} />
      <div className={cn("relative lg:flex lg:gap-8")}>
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-4">
            <TableOfContents headings={headings} />
          </div>
        </div>
        <article className="flex-grow prose dark:prose-invert max-w-3xl ">
          <MarkdownContent content={markdown} />
        </article>
      </div>
    </div>
  )
}
