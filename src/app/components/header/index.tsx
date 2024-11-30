import Link from "next/link"

import { siteMetadata } from "@/config/siteMetadata"

import { MainNavWrapper } from "./main-nav-wrapper"

export default function Header() {
  const { name = "Blog" } = siteMetadata?.metadata?.authors as { name: string }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b-2">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 items-center">
          <Link href="/">
            <span className="inline-block font-bold md:text-4xl sm:text-2xl text-xl font-caveat">{name}</span>
          </Link>
        </div>
        <MainNavWrapper />
      </div>
    </header>
  )
}
