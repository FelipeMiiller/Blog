import { type MetadataRoute } from "next"
import { envConfigs } from "@/config"
import { getSeries, postsDaSerie } from "@/functions/filtersPost"
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
    // Uma página por série. É conteúdo indexável — uma série é um percurso de
    // leitura, não só um filtro — então entra com a data do artigo mais
    // recente dela, que é quando a página muda de fato.
    ...getSeries(posts).map((serie) => {
      const daSerie = postsDaSerie(posts, serie.name)
      const maisRecente = daSerie.reduce((maisNovo, post) => {
        const data = new Date(post.updated ?? post.created)
        return data > maisNovo ? data : maisNovo
      }, new Date(0))

      return {
        url: `${baseUrl}/blog/serie/${encodeURIComponent(serie.slug)}`,
        lastModified: maisRecente,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }
    }),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/post/${encodeURIComponent(post.slug)}`,
      lastModified: new Date(post.updated ?? post.created),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
