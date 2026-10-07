import { Skeleton } from "@/components/ui/skeleton"

/**
 * Esqueleton da página de post.
 *
 * Serve a dois lugares: o `loading.tsx` da rota (enquanto o Next resolve o
 * componente da página) e o `<Suspense>` dentro de `page.tsx` (enquanto o
 * markdown do post é buscado). São as duas esperas que o leitor percebe, e as
 * duas precisam ter a mesma forma — se o loading sumisse e o esqueleto
 * aparecesse no meio da leitura, a página daria um salto visível.
 *
 * O desenho espelha o layout real: cabeçalho, título, linha de metadados,
 * sumiço e, na parte de baixo, a coluna do sumário ao lado do artigo. Se o
 * esqueleto tiver outra proporção, o texto "pula" quando ele é trocado pelo
 * conteúdo de verdade.
 */
export function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando o artigo…</span>

      <Skeleton className="h-9 w-36 rounded-md" />

      <div className="mb-8 mt-6">
        <Skeleton className="mb-3 h-10 w-4/5" />
        <Skeleton className="h-10 w-2/5" />
        <div className="mt-6 flex items-center space-x-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      <div className="relative lg:flex lg:gap-8">
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-4 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="flex-grow max-w-3xl space-y-3">
          {Array.from({ length: 14 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4"
              // A última linha é curta de propósito: um bloco todo de largura
              // uniforme denuncia que é um esqueleto.
              style={{ width: index % 5 === 4 ? "62%" : index % 3 === 0 ? "96%" : "100%" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}