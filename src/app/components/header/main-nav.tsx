import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components"
import { cn } from "@/utils/utils"

import { siteMetadata } from "@/config/siteMetadata"
import Search from "@/components/search"
import { SocialIcon } from "@/components/social-icons"

import { NavItem } from "../../../types"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname() || "/"

  const title = pathname !== "/" ? pathname.split("/")[1][0].toUpperCase() + pathname.split("/")[1].slice(1) : "Home"

  return (
    <nav className="flex items-center space-x-1">
      <div className="px-2">
        {items?.length ? (
          <div className="flex gap-4">
            {items?.map(
              (item) =>
                item.href && (
                  <Link key={item.title} href={item.href}>
                    <span
                      className={cn(
                        "flex  text-sm font-medium hover:opacity-80 ",
                        item.disabled && "cursor-not-allowed opacity-80",
                        title === item.title && "uppercase"
                      )}
                      aria-label={item.title}
                    >
                      {item.title}
                    </span>
                  </Link>
                )
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Search />
      <SocialIcon kind="github" href={siteMetadata.social.github} size={5} />
      <ThemeToggle />
    </nav>
  )
}
