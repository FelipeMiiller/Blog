import Link from "next/link"

import { siteMetadata } from "@/config/siteMetadata"

import { MainNavWrapper } from "./main-nav-wrapper"

export default function Header() {
  const { name = "Felipe Miiller" } = siteMetadata?.metadata?.authors as { name: string }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="container flex min-h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Ir para a página inicial">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[0_8px_24px_hsl(var(--primary)/0.24)] transition-transform duration-150 ease-out group-hover:-rotate-6 group-active:scale-[0.97]">
            FM
          </span>
          <span className="min-w-0">
            <span className="block truncate font-poppins text-base font-bold tracking-tight sm:text-lg">{name}</span>
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:block">
              Notes on software &amp; systems
            </span>
          </span>
        </Link>
        <MainNavWrapper />
      </div>
    </header>
  )
}
