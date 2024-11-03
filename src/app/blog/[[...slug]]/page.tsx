import { Fragment } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ListLayoutWithTags } from "@/layouts"
import PostLayout from "@/layouts/PostLayout"
import {
  getPostsInOrderForPublished,
  getPostWithMarkdown,
  getSParams_Posts,
} from "@/service/notion/posts"

import { siteMetadata } from "@/config/siteMetadata"

import { Footer, Header } from "../../components"

type GenerateMetadataProps = {
  params: { slug?: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const slug = params.slug

  return {
    ...siteMetadata.metadata,
  }
}

export const generateStaticParams = getSParams_Posts
export default async function BlogPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug
  const postsData = await getPostsInOrderForPublished()
  if (postsData.posts.length > 0 && postsData.posts_per_page > 0) {
    notFound()
  }

  if (!slug || slug[0] !== "post") {
    return (
      <Fragment>
        <Header titlePre="Blog" />
        <ListLayoutWithTags slug={params.slug} postsData={postsData} />
        <Footer />
      </Fragment>
    )
  }

  if (slug && slug[0] === "post" && slug[1] !== undefined) {
    const post = postsData.posts.filter((post) => post.slug === decodeURIComponent(slug[1]))[0]

    const markdown = await getPostWithMarkdown(post.page)

    if (markdown === null) return notFound()
    const postData = { post, markdown }

    return (
      <Fragment>
        <Header titlePre="Post" />
        <PostLayout postData={postData} />
        <Footer />
      </Fragment>
    )
  }

  return notFound()
}
