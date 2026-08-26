import Link from "next/link"

import { siteMetadata } from "@/config/siteMetadata"

import { ListSocial } from "./listSocial"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/80 py-8 sm:mt-20 sm:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="font-caveat text-2xl font-semibold text-foreground">Keep building.</p>
          <p className="text-sm text-muted-foreground">
            {siteMetadata.metadata.creator} <span aria-hidden="true">·</span> © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <ListSocial links={siteMetadata.social} />
          <Link
            href={siteMetadata.links.siteRepo}
            className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View source on GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
