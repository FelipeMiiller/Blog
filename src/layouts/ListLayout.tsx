import Link from "next/link"
import Preview, { PropsPreview } from "./components/preview"
import { cn } from "@/util/utils"
import { fontCaveat } from "@/styles/fonts"




interface ListLayoutProps {
  posts: PropsPreview[]


}




export default async function ListLayoutt({ posts }: ListLayoutProps) {

  return (
    <>
      <div className="divide-y-2 divide-tertiary">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className={cn(
              "text-3xl font-extrabold leading-9 tracking-tight  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14",
              fontCaveat.className
            )}
          >
            Latest posts
          </h1>
        </div>
        <ul className="divide-y-2 divide-tertiary">
          {!posts.length && "No posts found."}
          {posts.map((post) => {

            return <Preview post={post} key={post.slug} />
          })}
        </ul>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
    
        <Link
          href="/blog"
          className="text-primary hover:text-primary/80 "
          aria-label="All posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </>


  )
}
