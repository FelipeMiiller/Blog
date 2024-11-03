import { Fragment } from "react"
import { getPostsInOrderForPublished } from "@/service/notion/posts"
import { ListLayout } from "@/layouts"

import { Footer, Header } from "./components"

export default async function IndexPage() {
  const { posts, posts_per_page } = await getPostsInOrderForPublished()

  return (
    <Fragment>
      <Header titlePre="Home" />
      <ListLayout posts={posts.slice(0, posts_per_page)} />
      <Footer />
    </Fragment>
  )
}
