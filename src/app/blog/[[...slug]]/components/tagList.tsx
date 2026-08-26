"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNavConfig } from "@/config"
import { getPathnameTitle } from "@/functions/getPathnameTitle"
import { type TagCount } from "@/types"

interface TagListProps {
  tags: TagCount[]
}

export default function TagList({ tags }: TagListProps) {
  const pathname = usePathname()
  const title = decodeURIComponent(getPathnameTitle(pathname || "/"))

  return (
    <aside className="hidden h-fit min-w-[13rem] max-w-[13rem] rounded-2xl border border-border/80 bg-card p-5 sm:block lg:min-w-[15rem] lg:max-w-[15rem]">
      <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">Browse topics</p>
      <h2 className="mb-4 font-poppins text-lg font-bold tracking-tight">{title}</h2>
      <ul className="space-y-1.5">
        {tags.map(({ name, count, slug }) => {
          const isCurrent = title === slug || title.toLowerCase() === name.toLowerCase()

          return (
            <li key={slug}>
              {isCurrent ? (
                <span
                  className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
                  aria-current="page"
                >
                  <span>{name}</span>
                  <span className="text-xs text-primary/70">{count}</span>
                </span>
              ) : (
                <Link
                  href={`${mainNavConfig.hrefs.blog.tags}${slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Ver posts marcados com ${name}`}
                >
                  <span>{name}</span>
                  <span className="text-xs text-muted-foreground/80">{count}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
