import Link from "next/link"
import { mainNavConfig } from "@/config"

interface Props {
  title: string
  slug: string
  featured?: boolean
}

export default function PostTitle({ title, slug, featured = false }: Props) {
  return (
    <h2
      className={
        featured
          ? "font-poppins text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          : "font-poppins text-2xl font-bold leading-tight tracking-[-0.025em] transition-colors duration-150 ease-out hover:text-primary sm:text-3xl"
      }
    >
      <Link href={`${mainNavConfig.hrefs.blog.post}${slug}`} aria-label={`Leia mais: "${title}"`}>
        {title}
      </Link>
    </h2>
  )
}
