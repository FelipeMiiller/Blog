import { formatDate } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"

interface PostDateProps {
  created: string
  updated?: string
}

export default function PostDate({ created, updated }: PostDateProps) {
  return (
    <dl className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:pt-1">
      <dt className="sr-only">{updated ? "Atualizado em" : "Publicado em"}</dt>
      <dd className="space-y-1">
        <time dateTime={updated ?? created}>{formatDate(updated ?? created, siteMetadata.language)}</time>
        {updated && <div className="text-[0.62rem] tracking-[0.14em] text-primary">Atualizado</div>}
      </dd>
    </dl>
  )
}
