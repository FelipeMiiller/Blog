"use client"

import { usePathname } from "next/navigation"
import { getPathnameTitle } from "@/functions/getPathnameTitle"

const Title = () => {
  const pathname = usePathname()
  const title = decodeURIComponent(getPathnameTitle(pathname || "/"))
  return (
    <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
      {title}
    </h1>
  )
}

export default Title
