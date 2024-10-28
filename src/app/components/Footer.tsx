import Link from "next/link"
import { SocialIcon } from "@/components"

import { siteMetadata } from "@/config/site"

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.links.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.links.github} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.links.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.links.linkedin} size={6} />
          <SocialIcon kind="x" href={siteMetadata.links.x} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href={siteMetadata.links.siteRepo}>Tailwind Nextjs Theme</Link>
        </div>
      </div>
    </footer>
  )
}
