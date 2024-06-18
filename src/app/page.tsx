import { getSProps_PostsInOrderForPublished } from "@/data/notion/posts"
import { ListLayout } from "@/layouts"

import { Footer, Header } from "./components"

export default async function IndexPage() {
  let {
    props: { posts, posts_per_page },
  } = await getSProps_PostsInOrderForPublished()
  posts = posts.slice(0, posts_per_page)

  return (
    <>
      <Header titlePre="Home" />
      <ListLayout posts={posts} />
      <Footer />
    </>
  )
}
