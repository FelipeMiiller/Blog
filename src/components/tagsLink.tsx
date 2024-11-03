import Link from "next/link"
import { Tag } from "@/types"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"

interface TagsProps {
  tags: Tag[]
  className?: string
}

export const TagsLink: React.FC<TagsProps> = ({ tags, className }) => {
  return (
    <div className={cn("flex flex-wrap ", className)}>
      {tags?.map((tag) => (
        <Link
          key={tag.id}
          href={`${siteMetadata.hrefs.blog.tags}${tag.slug}`}
          className="text-sm font-medium  text-primary px-2 py-1  hover:text-primary/50"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
