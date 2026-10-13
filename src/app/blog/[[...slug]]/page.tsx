import { Fragment } from "react"
import { notFound } from "next/navigation"
import { filterPosts, getSeries, getTags, ordemDaSerie, pagePosts } from "@/functions/filtersPost"
import { getMetada, getPostsInOrderForPublished } from "@/service/notion/posts"
import { type Post } from "@/types"

import { Pagination } from "@/components/pagination"

import { PostList, TagList, Title } from "./components"

export const generateMetadata = getMetada
export const revalidate = 86400

const SECOES_DA_LISTAGEM = ["tags", "serie"]

type PageProps = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ page?: string }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const data = await getPostsInOrderForPublished()

  // `/blog` → sem seção. `/blog/tags/python` → seção "tags", alvo "python".
  // `/blog/serie/rag` → seção "serie", alvo "rag".
  const secao = slug?.[0]
  const alvo = slug?.[1]

  if (!slug || (secao !== undefined && SECOES_DA_LISTAGEM.includes(secao))) {
    const ehSerie = secao === "serie"
    const filtrados = filterPosts(data, slug)
    // Numa página de série a ordem é a de leitura (prefixo numérico do slug),
    // não "mais novo primeiro": a série existe para ser percorrida na ordem,
    // e o artigo-hub é a entrada. Fora de uma série, nada muda.
    const postsFiltred = ehSerie
      ? [...filtrados].sort((a, b) => ordemDaSerie(a) - ordemDaSerie(b) || a.created.localeCompare(b.created))
      : filtrados
    const tags = getTags(postsFiltred)
    // As séries saem da lista inteira: a lateral precisa oferecer as outras
    // séries como destino, não só a que está em tela.
    const series = getSeries(data)
    const serieAtual = ehSerie ? series.find((serie) => decodeURIComponent(alvo ?? "") === serie.slug) : undefined
    const { totalPages, posts } = pagePosts(postsFiltred, resolvedSearchParams)

    return (
      <Fragment>
        <div>
          <div className="pb-6 pt-6">
            {/* `/blog/serie/rag` mostraria "rag" como título, vindo do slug da
                URL. O nome da série vem do Notion e é "RAG". */}
            <Title titulo={serieAtual?.name} />
          </div>
          <div className="flex sm:space-x-24">
            <TagList tags={tags} series={series} titulo={serieAtual?.name} />
            <div>
              <PostList posts={posts as Post[]} />
              {totalPages > 1 ? <Pagination totalPages={totalPages} /> : <></>}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  return notFound()
}
