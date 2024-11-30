import { mainNavConfig } from "@/config"
import { getPostsInOrderForPublished } from "@/service/notion/posts"

import { MainNav } from "./main-nav"

export async function MainNavWrapper() {
  const posts = await getPostsInOrderForPublished(false)
  const { mainNav } = mainNavConfig
  if (!posts) return <div className="animate-pulse h-8 w-32 bg-gray-200 rounded" />

  if (posts.length === 0 || mainNav.length === 0) {
    return null
  }

  return <MainNav items={mainNav} posts={posts} />
}
