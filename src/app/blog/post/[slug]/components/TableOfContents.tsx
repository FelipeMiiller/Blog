import React from "react"
import { cn, extractHeadings } from "@/utils/utils"

export default function TableOfContents({ markdown }: { markdown: string }) {
  const headings = extractHeadings(markdown)

  return (
    <nav className="sticky top-16 overflow-hidden bg-muted rounded">
      <ul className="space-y-2 text-sm px-1 py-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn("block py-1 text-primary hover:text-primary/50 transition-colors", {
                "pl-2": heading.level === 3,
                "pl-4": heading.level === 4,
              })}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
