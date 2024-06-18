import {  siteMetadata } from "@/config/site"

import { MainNav } from "./main-nav"
import { cn } from "@/util/utils"
import { fontCaveat } from "@/styles/fonts"
import Link from "next/link"

export function Header({ titlePre = "Home" }: { titlePre?: string }) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b-2 ">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
      <div className="flex gap-6 md:gap-10 items-center">
        <Link href="/">
          <span
            className={cn(
              "inline-block font-bold  md:text-4xl  sm:text-2xl text-xl",
              fontCaveat.className
            )}
          >
            {siteMetadata.author}
          </span>
        </Link>
      </div>
        <MainNav items={siteMetadata.mainNav} titlePre={titlePre} />
      </div>
    </header>
  )
}
