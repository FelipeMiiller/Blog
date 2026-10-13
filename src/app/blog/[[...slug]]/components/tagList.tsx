"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNavConfig } from "@/config"
import { getPathnameTitle } from "@/functions/getPathnameTitle"
import { type SerieCount, type TagCount } from "@/types"

interface TagListProps {
  tags: TagCount[]
  series: SerieCount[]
  /**
   * Nome exibido no lugar do slug da URL. `/blog/serie/rag` mostraria "rag";
   * o nome que o Notion tem é "RAG".
   */
  titulo?: string
}

export default function TagList({ tags, series, titulo }: TagListProps) {
  const pathname = usePathname()
  const title = titulo ?? decodeURIComponent(getPathnameTitle(pathname || "/"))
  const naSerie = pathname?.startsWith(mainNavConfig.hrefs.blog.series) ?? false
  const naTag = pathname?.startsWith(mainNavConfig.hrefs.blog.tags) ?? false

  return (
    <aside className="hidden h-fit min-w-[13rem] max-w-[13rem] rounded-2xl border border-border/80 bg-card p-5 sm:block lg:min-w-[15rem] lg:max-w-[15rem]">
      <h2 className="mb-5 font-poppins text-lg font-bold tracking-tight">{title}</h2>

      {/*
        Séries vem antes dos tópicos porque é o eixo mais grosso: a série é o
        percurso, o tópico é o assunto. Com muitas tags na lista (24 hoje), uma
        seção embaixo ficaria escondida — e é a seção que se quer achável.
      */}
      {series.length > 0 && (
        <section className="mb-6">
          <h3 className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">Séries</h3>
          <ul className="space-y-1.5">
            {series.map((serie) => {
              const isCurrent = naSerie && title === serie.name

              return (
                <li key={serie.slug}>
                  {isCurrent ? (
                    <span
                      className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
                      aria-current="page"
                    >
                      <span>{serie.name}</span>
                      <span className="text-xs text-primary/70">{serie.count}</span>
                    </span>
                  ) : (
                    <Link
                      href={`${mainNavConfig.hrefs.blog.series}${encodeURIComponent(serie.slug)}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Ver os ${serie.count} artigos da série ${serie.name}`}
                    >
                      <span>{serie.name}</span>
                      <span className="text-xs text-muted-foreground/80">{serie.count}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Browse topics
        </h3>
        <ul className="space-y-1.5">
          {tags.map(({ name, count, slug }) => {
            const isCurrent = naTag && (title === slug || title.toLowerCase() === name.toLowerCase())

            return (
              <li key={slug}>
                {isCurrent ? (
                  <span
                    className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
                    aria-current="page"
                  >
                    <span>{name}</span>
                    <span className="text-xs text-primary/70">{count}</span>
                  </span>
                ) : (
                  <Link
                    href={`${mainNavConfig.hrefs.blog.tags}${slug}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Ver posts marcados com ${name}`}
                  >
                    <span>{name}</span>
                    <span className="text-xs text-muted-foreground/80">{count}</span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}