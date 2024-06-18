"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Pagination } from "@/components"
import { NormalizeResponseQuery } from "@/data/notion"
import { formateDate } from "@/util/utils"

import { siteMetadata } from "@/config/site"

interface ListLayoutProps {
  posts: NormalizeResponseQuery[]
  title: string
  initialDisplayPosts?: NormalizeResponseQuery[]
  pagination?: {
    currentPage: number
    totalPages: number
  }
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = posts.reduce(
    (acc: { [key: string]: { count: number; slug: string } }, post) => {
      post.tags.forEach((tag) => {
        acc[tag.name] = {
          count: (acc[tag.name]?.count || 0) + 1,
          slug: tag.slug,
        }
      })
      return acc
    },
    {}
  )

  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b].count - tagCounts[a].count)
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight  sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-muted/80  sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith("/blog") ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link href={`/blog`} className="font-bold uppercase  hover:text-primary/80  ">
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={tagCounts[t].slug} className="my-3">
                      {pathname.split("/tags/")[1] === tagCounts[t].slug ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase  text-primary/50 ">
                          {`${t} (${tagCounts[t].count})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${tagCounts[t].slug}`}
                          className="px-3 py-2 text-sm font-medium uppercase  text-primary/80 hover:text-primary/50"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t].count})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { title, created, description, page, tags, updated, slug } = post

                return (
                  <li key={slug} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6   text-muted-foreground ">
                          {updated ? (
                            <>
                              <time dateTime={post.updated}>
                                {formateDate(updated, siteMetadata.language)}
                              </time>
                            </>
                          ) : (
                            <>
                              <time dateTime={post.updated}>
                                {formateDate(created, siteMetadata.language)}
                              </time>
                            </>
                          )}
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} aria-label={`Read more: "${title}"`}>
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Link
                                key={tag.id}
                                href={`/tags/${tag.slug}`}
                                className="mr-3 text-base font-medium  text-primary hover:text-primary/80"
                              >
                                {tag.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-muted-foreground marker:text-accent-foreground ">
                          <p>{description}</p>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
