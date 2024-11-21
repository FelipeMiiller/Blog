import React from "react"
import Link from "next/link"
import { TagsLink } from "@/components"
import { mainNavConfig } from "@/config"
import { Post } from "@/types"

import PostDate from "./PostDate"

interface PostListProps {
  posts: Post[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <ul>
    {posts.map((post) => {
      const { title, created, description, tags, updated, slug } = post
      return (
        <>
          <li className="py-5" key={slug}>
            <article className="flex flex-col space-y-2 xl:space-y-0">
              <PostDate created={created} updated={updated} />
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link href={`${mainNavConfig.hrefs.blog.post}${slug}`} aria-label={`Leia mais: "${title}"`}>
                      {title}
                    </Link>
                  </h2>
                  <TagsLink tags={tags} />
                </div>
                <div className="prose max-w-none text-muted-foreground marker:text-accent-foreground">
                  <p>{description}</p>
                </div>
              </div>
            </article>
          </li>
        </>
      )
    })}
  </ul>
)

PostList.displayName = "PostList"

export default PostList
