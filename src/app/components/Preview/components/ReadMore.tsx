import Link from "next/link"
import { mainNavConfig } from "@/config"

interface Props {
  slug: string
  title: string
}

export default function ReadMore({ slug, title }: Props) {
  return (
    <Link
      href={`${mainNavConfig.hrefs.blog.post}${slug}`}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-150 ease-out hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Read more: "${title}"`}
    >
      Read article
      <span
        className="text-base transition-transform duration-150 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  )
}
