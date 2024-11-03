import Link from "next/link"

import { siteMetadata } from "@/config/siteMetadata"

interface Props {
  title: string
  slug: string
}

const PostTitle: React.FC<Props> = ({ title, slug }) => {
  return (
    <h2 className="text-2xl font-bold leading-8 tracking-tight">
      <Link href={`${siteMetadata.hrefs.blog.post}${slug}`} aria-label={`Read more: "${title}"`}>
        {title}
      </Link>
    </h2>
  )
}

export default PostTitle
