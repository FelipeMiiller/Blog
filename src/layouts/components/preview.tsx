import Link from "next/link"
import { Tag } from "@/components"
import { formateDate } from "@/util/utils"
import { siteMetadata } from "@/config/site"


export type PropsPreview = {
  slug: string
  page: string
  title: string
  created: string
  updated?: string
  description: string
  tags: { name: string; id: string, color: string, slug: string }[]
}

const Preview = ({ post }: { post: PropsPreview }) => {

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
                    <time dateTime={post.updated}>{formateDate(post.updated,siteMetadata.language)}</time>
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
                    className="text-2xl font-bold leading-8 tracking-tight"
                   
                  >
                    <Link href={`/blog/${post.slug}`}  aria-label={`Read more: "${post.title}"`}>{post.title}</Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {post.tags.map((tag) => (
                       <Link
                       href={`/tags/${tag.slug}`}
                       className="mr-3 text-base font-medium  text-primary hover:text-primary/80"
                     >
                       {tag.name}
                     </Link>
                    ))}
                  </div>
                </div>
               <div className="prose max-w-none text-muted-foreground marker:text-accent-foreground ">
                <p>
                  {post.description}
                </p>
                </div>
              </div>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
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
