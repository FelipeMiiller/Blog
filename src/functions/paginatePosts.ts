import { NotionPost } from "@/types"

export function paginatePosts(
  posts: NotionPost[],
  currentPage: number,
  postsPerPage: number
): {
  posts: NotionPost[]
  pagination: {
    currentPage: number
    totalPages: number
    postsPerPage: number
    totalPosts: number
  }
} {
  // Validate input parameters
  if (!Array.isArray(posts)) {
    throw new Error("Posts must be an array")
  }
  if (currentPage < 1) {
    throw new Error("Current page must be greater than 0")
  }
  if (postsPerPage < 1) {
    throw new Error("Posts per page must be greater than 0")
  }

  // Calculate pagination indexes
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = Math.min(startIndex + postsPerPage, posts.length)

  // Get posts for current page
  const displayPosts = posts.slice(startIndex, endIndex)

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Return pagination result
  return {
    posts: displayPosts,
    pagination: {
      currentPage,
      totalPages,
      postsPerPage,
      totalPosts: posts.length,
    },
  }
}
