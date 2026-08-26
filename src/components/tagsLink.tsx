import Link from "next/link"
import { mainNavConfig } from "@/config"
import { type Tag } from "@/types"
import { cn } from "@/utils/utils"

interface TagsProps {
  tags: Tag[]
  className?: string
}

export function TagsLink({ tags, className }: TagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-label="Tópicos do artigo">
      {tags?.map((tag) => (
        <Link
          key={tag.id}
          href={`${mainNavConfig.hrefs.blog.tags}${tag.slug}`}
          className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-primary transition-colors duration-150 ease-out hover:border-primary/50 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
