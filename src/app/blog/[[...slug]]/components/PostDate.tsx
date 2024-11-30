import React from "react"
import { formateDate } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"

interface PostDateProps {
  created: string
  updated?: string
}

const PostDate: React.FC<PostDateProps> = React.memo(({ created, updated }) => (
  <dl className="flex items-center gap-2 text-sm">
    <dt className="sr-only">Publicado em</dt>
    <dd className="flex items-center gap-2 text-muted-foreground">
      <time dateTime={created} className="font-medium">
        {formateDate(created, siteMetadata.language)}
      </time>
      {updated && (
        <>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-xs">Atualizado:</span>
          <time dateTime={updated} className="font-medium">
            {formateDate(updated, siteMetadata.language)}
          </time>
        </>
      )}
    </dd>
  </dl>
))

PostDate.displayName = "PostDate"

export default PostDate
