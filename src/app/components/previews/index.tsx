import Link from "next/link"

import { homeConfig } from "@/config/site"
import Notion from "@/lib/notion"

import Preview, { PropsPreview } from "./preview"

async function getPosts() {
  const notion = new Notion()
  const data = await notion.query({
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
      {
        property: "Updated",
        direction: "descending",
      },
    ],
  })

  return {
    props: {
      posts: data,
    },
  }
}

export default async function Previews() {
  const {
    props: { posts },
  } = await getPosts()
  return (
    <>
      <ul className="divide-y-2 divide-tertiary">
        {!posts.length && "No posts found."}
        {posts.slice(0, homeConfig.limitePreviews).map((post) => {
          return <Preview post={post} key={post.page} />
        })}
      </ul>
      {posts.length > homeConfig.limitePreviews && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-secondary-foreground hover:text-secondary "
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
