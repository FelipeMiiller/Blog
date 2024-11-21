import { Fragment } from "react"
import { notFound } from "next/navigation"
import { filterPosts, getTags, pagePosts } from "@/functions/filtersPost"
import { getMetada, getPostsInOrderForPublished } from "@/service/notion/posts"
import { Post } from "@/types"

import { Pagination } from "@/components/pagination"

import { Footer, Header } from "../../components"
import { PostList, TagList, Title } from "./components"

export const generateMetadata = getMetada

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] | undefined }
  searchParams?: { page?: string }
}) {
  const { slug } = params
  const data = await getPostsInOrderForPublished()
  if (!slug || slug[0] === "tags") {
    const postsFiltred = filterPosts(data, slug)
    const tags = getTags(postsFiltred)
    const { totalPages, posts } = pagePosts(postsFiltred, searchParams)

    return (
      <Fragment>
        <Header />
        <div>
          <div className="pb-6 pt-6">
            <Title />
          </div>
          <div className="flex sm:space-x-24">
            <TagList tags={tags} />
            <div>
              <PostList posts={posts as Post[]} />
              {totalPages > 1 ? <Pagination totalPages={totalPages} /> : <></>}
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }

  return notFound()
}
