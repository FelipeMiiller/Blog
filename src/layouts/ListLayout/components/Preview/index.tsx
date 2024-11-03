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

function Preview({ post }: { post: PropsPreview }) {
  return (
    <li className="py-12 px-2">
      <article className="space-y-2 xl:grid xl:grid-cols-5 xl:items-baseline xl:space-y-0">
        <PostMeta created={post.created} updated={post.updated} />
        <div className="space-y-5 xl:col-span-4">
          <div className="space-y-6">
            <PostTitle title={post.title} slug={post.slug} />
            <TagsLink tags={post.tags} />
            <PostDescription description={post.description} />
          </div>
          <ReadMore slug={post.slug} title={post.title} />
        </div>
      </article>
    </li>
  )
}

export default Preview
