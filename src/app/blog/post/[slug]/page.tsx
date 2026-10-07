import { Fragment, Suspense } from "react"
import { notFound } from "next/navigation"
import { envConfigs } from "@/config"
import {
  generateStaticParamsPosts,
  getMetada,
  getPostsInOrderForPublished,
  getPostWithMarkdown,
} from "@/service/notion/posts"
import { cn } from "@/utils/utils"
import { type Post } from "@/types"

import { MarkdownContent } from "@/components/markdown-component"

import { PostSkeleton, TableOfContents, Title } from "./components"

export const generateMetadata = getMetada
export const generateStaticParams = generateStaticParamsPosts
export const dynamicParams = true
export const revalidate = 86400

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // A busca pelo post acontece AQUI, fora do Suspense, e não dentro dele. Com o
  // `notFound()` atrás da fronteira, o shell já tinha sido enviado com 200
  // antes do throw, e o status não tinha mais como virar 404: a resposta saía
  // com 200 e a página de erro embutida no fluxo — um soft-404. Resolvendo o
  // post antes de qualquer HTML, o `notFound()` roda enquanto o status ainda é
  // ajustável.
  //
  // Por isso esta rota NÃO tem `loading.tsx`. Medido com `next start`: com o
  // arquivo, o Next lava o esqueleto com 200 no primeiro flush, o slug
  // inexistente passava a responder 200 com skeleton eterno, e jogar o
  // `notFound()` no `generateMetadata` para consertar congelava a página de erro
  // nas 20 rotas pré-geradas. O estado de carregamento fica no `<Suspense>`
  // abaixo, que cobre a espera de verdade — o `notion-to-md` percorrendo o post.
  const data = await getPostsInOrderForPublished()
  const post = data.find((item) => item.slug === decodeURIComponent(slug))

  if (!post) {
    return notFound()
  }

  return (
    <Fragment>
      <Suspense fallback={<PostSkeleton />}>
        <Content post={post} />
      </Suspense>
    </Fragment>
  )
}

async function Content({ post }: { post: Post }) {
  const markdown = await getPostWithMarkdown(post.page)
  if (!markdown) {
    return notFound()
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.created,
    dateModified: post.updated ?? post.created,
    author: post.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${envConfigs.site.baseUrl.replace(/\/$/, "")}/blog/post/${encodeURIComponent(post.slug)}`,
    },
    image: [`${envConfigs.site.baseUrl.replace(/\/$/, "")}/opengraph-image`],
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <Title post={post} markdown={markdown} />
      <div className={cn("relative lg:flex lg:gap-8")}>
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-4">
            <TableOfContents markdown={markdown} />
          </div>
        </div>
        <article className="flex-grow prose dark:prose-invert max-w-3xl ">
          <MarkdownContent content={markdown} />
        </article>
      </div>
    </div>
  )
}
