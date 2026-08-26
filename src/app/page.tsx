import { Fragment } from "react"
import Link from "next/link"
import { envConfigs, mainNavConfig } from "@/config"
import { getMetada, getPostsInOrderForPublished } from "@/service/notion/posts"

import { ContentHeader, Preview } from "./components"

export const generateMetadata = getMetada
export const revalidate = 86400

export default async function IndexPage() {
  const posts = await getPostsInOrderForPublished(true)

  return (
    <Fragment>
      <div>
        <ContentHeader />
        <ul className="mt-2">
          {posts.length > 0 ? (
            posts.slice(0, envConfigs.pages.posts_per_page).map((post, index) => {
              return <Preview post={post} featured={index === 0} key={post.slug} />
            })
          ) : (
            <li className="py-14 text-center">
              <p className="text-lg font-medium">Nenhum artigo publicado ainda.</p>
              <p className="mt-2 text-sm text-muted-foreground">Novos conteúdos estarão disponíveis em breve.</p>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-3 flex justify-end">
        <Link
          href={mainNavConfig.hrefs.blog.index}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-150 ease-out hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="All posts"
        >
          View all posts{" "}
          <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </Fragment>
  )
}
