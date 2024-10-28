import Link from "next/link"

import { siteMetadata } from "@/config/site"

interface Props {
  tags: { name: string; id: string; color: string; slug: string }[]
}

const PostTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`${siteMetadata.hrefs.blog.tags}${tag.slug}`}
          className="mr-3 text-base font-medium text-primary hover:text-primary/80"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}

export default PostTags
