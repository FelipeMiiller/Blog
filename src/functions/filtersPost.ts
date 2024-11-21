import { envConfigs } from "@/config"
import { NotionPost, Tag, TagCount } from "@/types"

function getTags(posts: NotionPost[]): TagCount[] {
  const tags = Object.entries(
    posts.reduce(
      (acc, post) => {
        post.tags.forEach((tag: Tag) => {
          acc[tag.name] = {
            count: (acc[tag.name]?.count || 0) + 1,
            slug: tag.slug,
          }
        })
        return acc
      },
      {} as Record<string, { count: number; slug: string }>
    )
  )
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([name, { count, slug }]) => ({ name, count, slug }))

  return tags
}

function filterPostsBySlug(posts: NotionPost[], slug: string[] | undefined): NotionPost[] {
  if (!slug) return posts
  const param = decodeURIComponent(slug[1])

  return posts.filter((post) => post.tags.some((tag: Tag) => tag.slug === param))
}

function filterPosts(posts: NotionPost[], slug: string[] | undefined): NotionPost[] {
  const filteredPosts = filterPostsBySlug(posts, slug)

  return filteredPosts
}

function pagePosts(posts: NotionPost[], searchParams?: { page?: string }): { posts: NotionPost[]; totalPages: number } {
  const postsPerPage = envConfigs.pages.posts_per_page
  const page = searchParams?.page ? Number(searchParams.page) : 1

  const startIndex = (page - 1) * postsPerPage
  const endIndex = Math.min(startIndex + postsPerPage, posts.length)

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / postsPerPage),
  }
}

export { filterPosts, getTags, pagePosts }
