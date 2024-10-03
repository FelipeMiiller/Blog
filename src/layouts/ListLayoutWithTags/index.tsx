import React from "react"
import { Metadata } from "next"
import { NotionPostData } from "@/data/notion"
import { Post } from "@/types"
import { isStringOnlyNumbers } from "@/utils/utils"

import { siteMetadata } from "@/config/site"

import { Pagination } from "../components/pagination"
import PostList from "./components/postList"
import TagList from "./components/tagList"

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.links.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s - ${siteMetadata.author}`,
  },
  description: siteMetadata.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touc.png",
  },
}

const ListLayoutWithTags = async ({
  slug,
  postsData,
}: {
  slug?: string[]
  postsData: {
    posts: NotionPostData[]
    posts_per_page: number
  }
}) => {
  const { posts, posts_per_page } = postsData

  const title = slug === undefined || slug[0] === "page" ? "All Posts" : decodeURIComponent(slug[1])
  const pageNumber =
    slug?.[slug.length - 2] === "page" && isStringOnlyNumbers(slug?.[slug.length - 1])
      ? Number(slug?.[slug.length - 1])
      : 1

  const filterposts = posts.filter((post) => {
    if (!slug?.[1] || slug[0] === "page") {
      return true
    }
    return post.tags.some((tag) => (tag.slug ? tag.slug === decodeURIComponent(slug[1]) : true))
  })

  const tagCounts = posts.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag.name] = {
          count: (acc[tag.name]?.count || 0) + 1,
          slug: tag.slug,
        }
      })
      return acc
    },
    {} as Record<string, { count: number; slug: string }>
  )

  const initialDisplayPosts = filterposts.slice(
    posts_per_page * (pageNumber - 1),
    posts_per_page * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filterposts.length / posts_per_page),
  }

  const basePath = title !== "All Posts" ? `blog/tags/${slug?.[1]}` : "blog"

  const sortedTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b].count - tagCounts[a].count)
    .map((t) => ({ name: t, ...tagCounts[t] }))

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : filterposts

  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <TagList tags={sortedTags} currentTitle={title} />
        <div>
          <PostList posts={displayPosts as Post[]} />
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              basePath={basePath}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ListLayoutWithTags
