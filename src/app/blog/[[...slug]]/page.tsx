import { Fragment } from "react"
import { Metadata } from "next"
import {
  getPostsInOrderForPublished,
  getPostWithMarkdown,
  getSParams_Posts,
} from "@/data/notion/posts"
import { ListLayoutWithTags } from "@/layouts"
import PostLayout from "@/layouts/PostLayout"

import { siteMetadata } from "@/config/site"
import NotFound from "@/app/not-found"

import { Footer, Header } from "../../components"

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.links.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s - ${siteMetadata.author}`,
  },
  authors: {
    name: siteMetadata.author,
    url: siteMetadata.links.siteUrl,
  },
  description: siteMetadata.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/static/favfavicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touc.png",
  },
}

export const generateStaticParams = getSParams_Posts
export default async function BlogPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug
  const postsData = await getPostsInOrderForPublished()
  if (postsData.posts.length > 0 && postsData.posts_per_page > 0) {
    NotFound()
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

    if (markdown === null) return NotFound()
    const postData = { post, markdown }

    return (
      <Fragment>
        <Header titlePre="Post" />
        <PostLayout postData={postData} />
        <Footer />
      </Fragment>
    )
  }

  return NotFound()
}
