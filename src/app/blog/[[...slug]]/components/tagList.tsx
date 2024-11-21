"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNavConfig } from "@/config"
import { getPathnameTitle } from "@/functions/getPathnameTitle"
import { TagCount } from "@/types"

interface TagListProps {
  tags: TagCount[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const pathname = usePathname()
  const title = decodeURIComponent(getPathnameTitle(pathname || "/"))

  return (
    <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-muted/80 sm:flex">
      <div className="px-6 py-4">
        <h3 className="font-bold uppercase text-primary-500">{title}</h3>
        <ul>
          {tags.map(({ name, count, slug }) => (
            <li key={slug} className="my-3">
              {title === slug ? (
                <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary/50">{`${name} (${count})`}</h3>
              ) : (
                <Link
                  href={`${mainNavConfig.hrefs.blog.tags}${slug}`}
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
}

TagList.displayName = "TagList"

export default TagList
