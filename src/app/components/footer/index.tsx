import Link from "next/link"

import { siteMetadata } from "@/config/siteMetadata"

import { ListSocial } from "./listSocial"

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-center">
      <ListSocial links={siteMetadata.social} />

      <div className=" flex  space-x-2 text-sm text-gray-500 dark:text-gray-400 ">
        <div>{siteMetadata.metadata.creator}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
      </div>
      <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href={siteMetadata.links.siteRepo}>Tailwind Nextjs Theme</Link>
      </div>
    </footer>
  )
}
