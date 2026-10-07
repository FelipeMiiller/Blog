/**
 * Selo da série a que o post pertence.
 *
 * A informação vem da coluna `Serie` do Notion (`select`), lida em
 * `service/notion/index.ts`. É um `select` e não um `multi_select` porque um
 * artigo entra em no máximo uma série — a série é a linha de aprendizado, e
 * misturar dois percursos no mesmo post bagunça a ordem de leitura.
 *
 * Quando a coluna vem vazia — foi assim nos 59 posts anteriores à série RAG —
 * o selo não renderiza nada, e a página fica exatamente como estava.
 */
export function SeriesBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
      Série {name}
    </span>
  )
}