import Link from "next/link"
import { TagsLink } from "@/components"
import { mainNavConfig } from "@/config"
import { type Post } from "@/types"

import PostDate from "./PostDate"

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="divide-y divide-border/80">
      {posts.map((post) => {
        const { title, created, description, tags, updated, slug } = post

        return (
          <li className="py-8 first:pt-2 last:pb-2" key={slug}>
            <article className="grid gap-5 sm:grid-cols-[9rem_1fr] sm:gap-7">
              <PostDate created={created} updated={updated} />
              <div className="space-y-4">
                <div className="space-y-3">
                  <h2 className="font-poppins text-2xl font-bold leading-tight tracking-[-0.025em] transition-colors duration-150 ease-out hover:text-primary sm:text-3xl">
                    <Link
                      href={`${mainNavConfig.hrefs.blog.post}${slug}`}
                      aria-label={`Leia mais: "${title}"`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {title}
                    </Link>
                  </h2>
                  <TagsLink tags={tags} />
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
                <Link
                  href={`${mainNavConfig.hrefs.blog.post}${slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-150 ease-out hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Abrir o artigo "${title}"`}
                >
                  Read article
                  <span
                    className="text-base transition-transform duration-150 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
