import { envConfigs } from "@/config"
import { slugify } from "@/functions/slugify"
import { Post, SerieCount, Tag, TagCount } from "@/types"

function getTags(posts: Post[]): TagCount[] {
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

/**
 * Séries que existem nos posts dados, com a contagem de cada uma.
 *
 * Sai sempre da lista INTEIRA de posts, nunca da lista já filtrada: a lateral
 * é navegação entre séries, e mostrar só a série que está em tela deixaria um
 * item só na própria página, sem para onde trocar.
 */
function getSeries(posts: Post[]): SerieCount[] {
  const porSlug = new Map<string, SerieCount>()

  for (const post of posts) {
    const nome = post.serie?.name
    if (!nome) continue

    const slug = slugify(nome)
    const atual = porSlug.get(slug)

    if (atual) {
      atual.count += 1
    } else {
      porSlug.set(slug, { name: nome, count: 1, slug })
    }
  }

  return [...porSlug.values()].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
}

const PREFIXO_DA_ORDEM = /^(\d+)-/

/**
 * Ordem de leitura dentro de uma série.
 *
 * Não é a data de criação: os artigos da série RAG foram criados em bloco e os
 * títulos ganharam prefixo numérico justamente para marcar a ordem
 * ("1-RAG na prática", "2-Chunking"...). O prefixo do slug é essa ordem.
 *
 * O artigo 13 é o único sem prefixo — o título dele nunca ganhou número. Ele
 * vai para o fim, e entre posts sem número a desempata a data de criação, que
 * é a ordem em que foram escritos.
 */
function ordemDaSerie(post: Post): number {
  const encontrado = PREFIXO_DA_ORDEM.exec(post.slug)
  return encontrado ? Number(encontrado[1]) : Number.MAX_SAFE_INTEGER
}

function postsDaSerie(posts: Post[], nome: string): Post[] {
  return posts
    .filter((post) => post.serie?.name === nome)
    .sort((a, b) => ordemDaSerie(a) - ordemDaSerie(b) || a.created.localeCompare(b.created))
}

/**
 * Filtra a listagem pela seção da URL: `/blog/tags/<slug>` ou
 * `/blog/serie/<slug>`.
 *
 * A seção é o primeiro segmento (`slug[0]`) e o alvo é o segundo. Sem alvo
 * (`/blog`), devolve tudo — o que a rota já tratava antes deste filtro existir.
 */
function filterPosts(posts: Post[], slug: string[] | undefined): Post[] {
  const alvo = slug?.[1]
  if (alvo === undefined) return posts

  const param = decodeURIComponent(alvo)
  const secao = slug?.[0]

  if (secao === "serie") {
    return posts.filter((post) => post.serie?.name && slugify(post.serie.name) === param)
  }

  return posts.filter((post) => post.tags.some((tag: Tag) => tag.slug === param))
}

function pagePosts(posts: Post[], searchParams?: { page?: string }): { posts: Post[]; totalPages: number } {
  const postsPerPage = envConfigs.pages.posts_per_page
  const page = searchParams?.page ? Number(searchParams.page) : 1

  const startIndex = (page - 1) * postsPerPage
  const endIndex = Math.min(startIndex + postsPerPage, posts.length)

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / postsPerPage),
  }
}

export { filterPosts, getSeries, getTags, ordemDaSerie, pagePosts, postsDaSerie }
