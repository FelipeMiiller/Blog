import Link from "next/link"
import { formateDate } from "@/util/formateDate"
import GithubSlugger from "github-slugger"

import Tag from "./tag"

export type PropsPreview = {
  page: string

  title: string
  created: string
  updated?: string
  description: string
  tags: { name: string; id: string }[]
}

const Preview = ({ post }: { post: PropsPreview }) => {
  const slugger = new GithubSlugger()
  const slug = slugger.slug(post.title)

  return (
    <>
      <li className="py-12 px-2">
        <article>
          <div className="space-y-2 xl:grid xl:grid-cols-5 xl:items-baseline xl:space-y-0 ">
            
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6   text-muted-foreground ">
                {post.updated ? (
                  <>
                    <time dateTime={post.updated}>{formateDate(post.updated)}</time>
                  </>
                ) : (
                  <>
                    <time dateTime={post.updated}>{formateDate(post.created)}</time>
                  </>
                )}
              </dd>
            </dl>
            <div className="space-y-5 xl:col-span-4 ">
              <div className="space-y-6">
                <div>
                  <h2
                    className="text-2xl font-bold leading-8 tracking-tight  "
                    aria-label={`Read more: "${post.title}"`}
                  >
                    <Link href={`/blog/${slug}`}>{post.title}</Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {post.tags.map((tag: any) => (
                      <Tag key={tag.id} text={tag.name} />
                    ))}
                  </div>
                </div>
                <p className="prose max-w-none text-muted-foreground marker:text-accent-foreground ">
                  {post.description}
                </p>
              </div>
              <div>
                <Link
                  href={`/blog/${slug}`}
                  className="text-base font-medium leading-6 text-primary hover:text-primary/80"
                  aria-label={`Read more: "${post.title}"`}
                >
                  Read more &rarr;
                </Link>
              </div>
            </div>
          </div>
        </article>
      </li>
    </>
  )
}

export default Preview
