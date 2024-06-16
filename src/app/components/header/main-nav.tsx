import * as React from "react"
import Link from "next/link"
import { Icons, ThemeToggle } from "@/components"
import { cn } from "@/util/utils"

import { homeConfig } from "@/config/site"
import { ButtonUi } from "@/components/ui"
import { fontCaveat } from "@/styles/fonts"

import { NavItem } from "../../../types/nav"

interface MainNavProps {
  items?: NavItem[]
  titlePre?: string
}

export function MainNav({ items, titlePre }: MainNavProps) {
  return (
    <>
      <div className="flex gap-6 md:gap-10 items-center">
        <Link href="/">
          <span className={cn("inline-block font-bold  md:text-4xl  sm:text-2xl text-xl   ", fontCaveat.className)}>
            {homeConfig.name}
          </span>
        </Link>

      </div>

      <nav className="flex items-center space-x-2">
        {items?.length ? (
          <div className="flex gap-6">
            {items?.map(
              (item) =>
                item.href && (
                  <Link key={item.title} href={item.href}  >

                    <span
                      className={cn(
                        "flex  text-sm font-medium hover:opacity-80 ",
                        item.disabled && "cursor-not-allowed opacity-80",
                        titlePre === item.title && "uppercase"
                      )} aria-label={item.title}
                    >

                      {item.title}
                    </span>
                  </Link>
                )
            )}
          </div>
        ) : <></>}
        <Link href={homeConfig.links.github} target="_blank" rel="noreferrer">
          <div
            className={ButtonUi.Variants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <ThemeToggle />
      </nav>
    </>
  )
}
