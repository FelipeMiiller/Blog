"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/utils/utils"
import { useDebouncedCallback } from "use-debounce"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const searchParams = useSearchParams() || new URLSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")

    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      className={cn(
        "flex h-9 w-full rounded border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Search.displayName = "Search"

export { Search }
