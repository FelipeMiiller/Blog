import React from "react"
import Link from "next/link"
import { Tag } from "@/types"

import { siteMetadata } from "@/config/site"

interface PostTagsProps {
  tags: Tag[]
}

const PostTags: React.FC<PostTagsProps> = ({ tags }) => (
  <div className="flex flex-wrap">
    {tags?.map((tag) => (
      <Link
        key={tag.id}
        href={`${siteMetadata.hrefs.blog.tags}${tag.slug}`}
        className="mr-3 text-base font-medium text-primary hover:text-primary/80"
      >
        {tag.name}
      </Link>
    ))}
  </div>
)

PostTags.displayName = "PostTags"

export default PostTags
