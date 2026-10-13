import Link from "next/link"
import { mainNavConfig } from "@/config"
import { slugify } from "@/functions/slugify"

/**
 * Selo da série a que o post pertence.
 *
 * A informação vem da coluna `Serie` do Notion (`select`), lida em
 * `service/notion/index.ts`. É um `select` e não um `multi_select` porque um
 * artigo entra em no máximo uma série — a série é a linha de aprendizado, e
 * misturar dois percursos no mesmo post bagunça a ordem de leitura.
 *
 * É um link para `/blog/serie/<slug>`: selo que não leva a lugar nenhum é só
 * decoração, e a página da série é o que transforma o rótulo em navegação.
 *
 * Quando a coluna vem vazia — foi assim nos 59 posts anteriores à série RAG —
 * o selo não renderiza nada, e a página fica exatamente como estava.
 */
export function SeriesBadge({ name }: { name: string }) {
  const slug = slugify(name)

  if (!slug) return null

  return (
    <Link
      href={`${mainNavConfig.hrefs.blog.series}${encodeURIComponent(slug)}`}
      className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary transition-colors duration-150 ease-out hover:border-primary/60 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Ver todos os artigos da série ${name}`}
    >
      Série {name}
    </Link>
  )
}