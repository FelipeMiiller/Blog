import React from "react"
import Link from "next/link"
import { mainNavConfig } from "@/config"

interface Props {
  slug: string
  title: string
}

const ReadMore: React.FC<Props> = ({ slug, title }) => {
  return (
    <div>
      <Link
        href={`${mainNavConfig.hrefs.blog.post}${slug}`}
        className="text-base font-medium leading-6 text-primary hover:text-primary/80"
        aria-label={`Read more: "${title}"`}
      >
        Read more &rarr;
      </Link>
    </div>
  )
}

export default ReadMore
