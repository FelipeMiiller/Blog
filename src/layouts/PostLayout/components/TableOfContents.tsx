import React from "react"
import { cn } from "@/utils/utils"

export default function TableOfContents({
  headings,
}: {
  headings: Array<{
    level: number
    text: string
    id: string
  }>
}) {
  return (
    <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto">
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-muted-foreground hover:text-foreground transition-colors",
                {
                  "pl-4": heading.level === 3,
                  "pl-8": heading.level === 4,
                }
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
