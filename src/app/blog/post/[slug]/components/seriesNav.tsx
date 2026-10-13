import Link from "next/link"
import { mainNavConfig } from "@/config"
import { slugify } from "@/functions/slugify"
import { type Post } from "@/types"
import { cn } from "@/utils/utils"

/**
 * Lista dos artigos da série, no topo da coluna esquerda do post.
 *
 * Só aparece quando o post pertence a uma série. Os 46 posts anteriores à
 * série RAG não têm série e continuam vendo só o sumário, como sempre.
 *
 * A ordem é a de leitura da série (prefixo numérico do slug), não a de criação
 * — ver `postsDaSerie`, em `functions/filtersPost`.
 */
export function SeriesNav({ name, posts, currentSlug }: { name: string; posts: Post[]; currentSlug: string }) {
  if (posts.length === 0) return null

  const slugDaSerie = slugify(name)

  return (
    <nav aria-label={`Artigos da série ${name}`} className="mb-8">
      <p className="mb-3 flex items-baseline justify-between gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
        <span>Série {name}</span>
        <span className="text-xs font-normal normal-case tracking-normal text-muted-foreground">
          {posts.length} artigos
        </span>
      </p>

      <ul className="space-y-1.5 border-l border-border/80 pl-3 text-sm">
        {posts.map((post) => {
          const atual = post.slug === currentSlug

          return (
            <li key={post.page}>
              <Link
                href={`${mainNavConfig.hrefs.blog.post}${encodeURIComponent(post.slug)}`}
                // O prefetch precisa ser explícito: no App Router o padrão
                // `auto` não busca rota dinâmica sem `loading.tsx`, e esta rota
                // não tem. Sem isto, passar de um artigo para outro da mesma
                // série espera o Notion inteiro.
                prefetch={true}
                aria-current={atual ? "page" : undefined}
                className={cn(
                  "line-clamp-2 block py-0.5 transition-colors",
                  atual ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {post.title}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link
        href={`${mainNavConfig.hrefs.blog.series}${encodeURIComponent(slugDaSerie)}`}
        className="mt-3 inline-block text-xs font-medium text-primary hover:text-primary/70 transition-colors"
      >
        Ver a série completa →
      </Link>
    </nav>
  )
}