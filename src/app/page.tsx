import { Fragment } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { envConfigs, mainNavConfig } from "@/config"
import { getMetada, getPostsInOrderForPublished } from "@/service/notion/posts"

import { ContentHeader, Preview } from "./components"

export const generateMetadata = getMetada

export default async function IndexPage() {
  const posts = await getPostsInOrderForPublished(true)

  return (
    <Fragment>
      <div className="divide-y-2 divide-tertiary">
        <ContentHeader />
        <ul className="divide-y-2 divide-tertiary">
          {posts.length > 0
            ? posts.slice(0, envConfigs.pages.posts_per_page).map((post) => {
                return <Preview post={post} key={post.slug} />
              })
            : notFound()}
        </ul>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href={mainNavConfig.hrefs.blog.index}
          className="text-primary hover:text-primary/80 "
          aria-label="All posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </Fragment>
  )
}
