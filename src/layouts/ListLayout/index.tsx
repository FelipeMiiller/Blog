import Link from "next/link"
import { notFound } from "next/navigation"

import { siteMetadata } from "@/config/siteMetadata"

import Header from "./components/Header"
import Preview, { PropsPreview } from "./components/Preview"

interface ListLayoutProps {
  posts: PropsPreview[]
}

export default async function ListLayout({ posts }: ListLayoutProps) {
  return (
    <>
      <div className="divide-y-2 divide-tertiary">
        <Header />
        <ul className="divide-y-2 divide-tertiary">
          {posts.length > 0
            ? posts.map((post) => {
                return <Preview post={post} key={post.slug} />
              })
            : notFound()}
        </ul>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href={siteMetadata.hrefs.blog.index}
          className="text-primary hover:text-primary/80 "
          aria-label="All posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </>
  )
}
