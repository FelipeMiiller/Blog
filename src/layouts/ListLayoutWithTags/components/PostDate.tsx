import React from "react"
import { formateDate } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"

interface PostDateProps {
  created: string
  updated: string
}

const PostDate: React.FC<PostDateProps> = React.memo(({ created, updated }) => (
  <dl>
    <dt className="sr-only">Publicado em</dt>
    <dd className="text-base font-medium leading-6 text-muted-foreground">
      <time dateTime={updated || created}>
        {formateDate(updated || created, siteMetadata.language)}
      </time>
    </dd>
  </dl>
))

PostDate.displayName = "PostDate"

export default PostDate
