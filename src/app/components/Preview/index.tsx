import Link from "next/link"
import { TagsLink } from "@/components"

import PostDescription from "./components/PostDescription"
import PostMeta from "./components/PostMeta"
import PostTitle from "./components/PostTitle"
import ReadMore from "./components/ReadMore"

export type PropsPreview = {
  slug: string
  page: string
  title: string
  created: string
  updated?: string
  description: string
  tags: { name: string; id: string; color: string; slug: string }[]
}

function Preview({ post, featured = false }: { post: PropsPreview; featured?: boolean }) {
  return (
    <li className={featured ? "py-8 sm:py-10" : "border-t border-border/80 py-8 sm:py-9"}>
      <article
        className={
          featured
            ? "relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-[0_16px_45px_hsl(var(--foreground)/0.07)] transition-shadow duration-200 hover:shadow-[0_20px_55px_hsl(var(--foreground)/0.11)] sm:p-8 lg:p-10"
            : "grid gap-5 lg:grid-cols-[10rem_1fr_auto] lg:items-start lg:gap-8"
        }
      >
        {featured && (
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent"
            aria-hidden="true"
          />
        )}
        <div className={featured ? "mb-5 flex items-center justify-between gap-4" : "lg:pt-1"}>
          {featured && (
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">Featured note</span>
          )}
          <PostMeta created={post.created} updated={post.updated} />
        </div>
        <div className={featured ? "max-w-3xl space-y-5" : "space-y-4"}>
          <div className="space-y-3">
            <PostTitle title={post.title} slug={post.slug} featured={featured} />
            <TagsLink tags={post.tags} />
            <PostDescription description={post.description} featured={featured} />
          </div>
          <ReadMore slug={post.slug} title={post.title} />
        </div>
        {!featured && (
          <Link
            href={`/blog/post/${post.slug}`}
            aria-label={`Abrir o artigo "${post.title}"`}
            className="hidden size-10 place-items-center rounded-full border border-border text-lg text-muted-foreground transition-all duration-150 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:grid"
          >
            ↗
          </Link>
        )}
      </article>
    </li>
  )
}

export default Preview
