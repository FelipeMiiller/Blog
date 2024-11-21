import React from "react"
import Link from "next/link"
import { mainNavConfig } from "@/config"
import { Tag } from "@/types"
import { cn } from "@/utils/utils"

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
          href={`${mainNavConfig.hrefs.blog.tags}${tag.slug}`}
          className="text-sm font-medium  text-primary px-1 hover:text-primary/50"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
