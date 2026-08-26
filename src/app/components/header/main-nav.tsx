"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components"
import { type NavItem, type Post } from "@/types"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"
import Search from "@/components/search"
import { SocialIcon } from "@/components/social-icons"

interface MainNavProps {
  items: NavItem[]
  posts: Post[]
}

export function MainNav({ items, posts }: MainNavProps) {
  const pathname = usePathname() || "/"

  return (
    <nav
      className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Navegação principal"
    >
      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        {items.map(
          (item) =>
            item.href && (
              <Link
                key={item.title}
                href={item.href}
                aria-current={
                  (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "page" : undefined
                }
                className={cn(
                  "group relative rounded-full px-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 ease-out hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-xs",
                  item.disabled && "pointer-events-none opacity-50",
                  (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) &&
                    "bg-secondary text-foreground"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </div>
      <div className="ml-1 flex shrink-0 items-center gap-0.5 border-l border-border/80 pl-1 sm:ml-2 sm:pl-2">
        <Search posts={posts} />
        <SocialIcon kind="github" href={siteMetadata.social.github} size={5} />
        <ThemeToggle />
      </div>
    </nav>
  )
}
