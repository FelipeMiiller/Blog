import React from "react"
import Link from "next/link"
import { TagCount } from "@/types"

import { siteMetadata } from "@/config/siteMetadata"

interface TagListProps {
  tags: TagCount[]
  currentTitle: string
}

const TagList: React.FC<TagListProps> = ({ tags, currentTitle }) => (
  <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-muted/80 sm:flex">
    <div className="px-6 py-4">
      <h3 className="font-bold uppercase text-primary-500">{currentTitle}</h3>
      <ul>
        {tags.map(({ name, count, slug }) => (
          <li key={slug} className="my-3">
            {currentTitle === slug ? (
              <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary/50">
                {`${name} (${count})`}
              </h3>
            ) : (
              <Link
                href={`${siteMetadata.hrefs.blog.tags}${slug}`}
                className="px-3 py-2 text-sm font-medium uppercase text-primary/80 hover:text-primary/50"
                aria-label={`Ver posts marcados com ${name}`}
              >
                {`${name} (${count})`}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

TagList.displayName = "TagList"

export default TagList
