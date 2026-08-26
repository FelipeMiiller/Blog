import { formatDate } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"

interface Props {
  created: string
  updated?: string
}

export default function PostMeta({ created, updated }: Props) {
  const date = updated ?? created

  return (
    <dl className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      <dt className="sr-only">{updated ? "Updated on" : "Published on"}</dt>
      <dd>
        <time dateTime={date}>{formatDate(date, siteMetadata.language)}</time>
        {updated && (
          <span className="ml-2 text-primary" aria-label="post updated">
            Updated
          </span>
        )}
      </dd>
    </dl>
  )
}
