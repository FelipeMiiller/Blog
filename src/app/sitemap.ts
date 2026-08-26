import { type MetadataRoute } from "next"
import { envConfigs } from "@/config"
import { getPostsInOrderForPublished } from "@/service/notion/posts"

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsInOrderForPublished()
  const baseUrl = envConfigs.site.baseUrl.replace(/\/$/, "")

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/post/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(post.updated ?? post.created),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
